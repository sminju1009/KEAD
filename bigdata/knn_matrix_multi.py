import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
import mysql.connector
import operator
import json

# 입력값 유사도 구할 개수
K = 3

#MySQL 연결 설정 자신sql정보 삽입
db_connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="0000",
    database="book_test"
)
# 커서 생성
cursor = db_connection.cursor()

# 독후감 테이블 안의 모든 파일 목록 가져오기
query = "select book_id,member_id,book_member_rate from book_test.Book_report" #선택쿼리문
cursor.execute(query)
Book_report_data = cursor.fetchall() # 모두 가져오는옵션


def Similarity(R,start_member_id,start_book_id):
    origin_array = R.toarray() # 희소행렬을 원래 배열로 만드는거 같은데 어차피 전체 배열로 계산해서 필요없는 과정인듯

    user_cnt = min(origin_array.shape) # 평점 행렬의 유저 개수 추출 // 유저가 책보다 작다고 가정하므로 가능
    book_cnt = max(origin_array.shape) # 평점 행렬의 책 개수 추출

    # 유사도 행렬 구하기 // 원래 R * R.transposse.toarray(), 즉 평점행렬 * 전치평점행렬 하면 끝나는데 그럼 nan(빈값)인거 컨트롤 못해서 직접 구함
    user_sim_array = np.zeros((user_cnt, user_cnt)) # 유사도 행렬 만들기 크기는 유저 * 유저 / 각 칸은 행유저와 열유저의 유사도 값
    for now_user_row in range(start_member_id,user_cnt): # 행렬 곱 을 모든 row에 대해서 해야함
        for now_user_col in range(start_member_id,user_cnt): # 각 row에 대해서 col 개수만큼 계산해야함 / 한번 돌때마다 row 값 유저와 col유저의 유사도 구함

            # 만약 row==col인 경우 자기 자신과의 유사도이므로 무쓸모 그래서 0으로 하고 다음으로 넘김
            if(now_user_row == now_user_col):
                user_sim_array[now_user_row][now_user_col] = 0
                continue # 바로 다음 루프로

            #  지금 칸의 row의 user랑 col의 user의 유사도 구하기
            now_index_value = 0 # 지금 칸의 유사도 값 선언
            flag =0 # 모두 none인 경우 none값 삽입 위한 플래그
            # 유사도 구하는건 책 개수 만큼 함 / 행렬곱 원리임
            for now_book_index in range(start_book_id,book_cnt): # 최소 책 번호부터 시작
                origin_value = origin_array[now_user_row][now_book_index] # 내가 now_book_index책에 준 평점
                transpose_value = origin_array[now_user_col][now_book_index] # 나랑 유사한지 검사할 애가 now_book_index책에 준 평점
                if(np.isnan(origin_value) or np.isnan(transpose_value)):continue # 만약 nan이 1개라도 있으면 계산시 모두 nan되므로 제외
                flag=1 #여기 까지 오면 무조건 값을 가짐( 즉 none아님 )
                now_index_value += origin_value*transpose_value # 지금 책에 대해서 구한값 계속 더함

            if flag==0: now_index_value = None  # 모두 nan인 경우 none로 설정
            user_sim_array[now_user_row][now_user_col] = now_index_value # nan아닌 경우 계산한 유사도 삽입

    # 대각행렬 특정값으로 채우기 만약 R*R(tra)했을때 사용
    #np.fill_diagonal(UbyU, 0)

    # 계산된 모든 유저간 유사도 행렬 파일로 저장
    sim_array = pd.DataFrame(user_sim_array)
    sim_array.to_csv('sissm.csv', encoding="utf-8")

    # 유사도 구한 다음에 예상평점 계산하기 위해 유사도 행렬 리턴
    return user_sim_array


# 유사도 행렬을 입력받고 평점이 NULL인 영화 평점계산
def predicted_rating(R, K, start_member_id, start_book_id):
    UbyU = Similarity(R,start_member_id,start_book_id) # 계산된 유사도 행렬 받음
    renew_list=[]

    only_recommand_array = R.toarray() # 희소행렬이므로 기존 배열로 변환
    user_size = min(only_recommand_array.shape) # 평점 행렬의 유저 개수 추출 // 유저가 책보다 작다고 가정하므로 가능
    item_size = max(only_recommand_array.shape) # 평점 행렬의 책 개수 추출

    R_predicted = np.full((user_size, item_size),-1.2) # NULL인 부분만 계산하는데 이부분만 보기위한 행렬 / only_recommand_array하면 원래거에 최신화함 /

    sort_UbyU = np.argsort(UbyU, axis=1)[::-1] # 유사도 내림차순으로 정렬 (인덱스값)

    # 정렬된 유사도 인덱스 값 저장
    # sort_sim = pd.DataFrame(sort_UbyU)
    # sort_sim.to_csv("sim.csv",encoding="utf=8")

    user_recommend_dict ={}

    # 기존 평점 행렬에서 NULL(nan)인 애들만 추천 평점 계산 할 수 있음(당연히 본 애들은 추천 필요x) / 모두 탐색
    for user in range(user_size):  # i번쨰 사람
        for book in range(item_size):  # j번째 영화
            # 지금 유저의 영화 1개(j++) 씩 보면서 안본 영화(평점이 NULL) 만 계산 시작
            if (~np.isnan(only_recommand_array[user][book])): continue# 만약 준 평점 이면  == (nan) 이면 다음 루프로

            you = 0 # you번째 유사도 선택위한 값 / 제일 낮은 애부터 시작 이거 보다 낮은 애들은 어차피 0 이나 null 이겟지?
            sum_sim = 0 # 평점 계산과정중 분모에 들어갈 값
            sum_sim_score = 0 # 평점 계산과정중 분자에 들어갈 값

            # 유사도 높은 k면 검사할 거임
            while (you < K): #유사도 높은애들 1명씩 뽑아서 계산 k번 하면 끝
                you += 1  # 1명 계산 끝났으므로 증가
                if (you == user): continue # 만약 자기자신의 유사도인 경우는 무시해야함
                # 친구 선정 및 계산
                target = sort_UbyU[user][you + start_member_id] # 유사도 제일 높은애(you 를 1씩 증가시키면 유사도 내림차순으로 애들선정) # 최소값 start_member_id부터 시작
                sum_sim += UbyU[user][target]  # 분모 = 나와 다른애들 k명 각각의 유사도의 합
                sum_sim_score += UbyU[user][target] * only_recommand_array[target][book] # 분자 각각의(유사도 * 평점)의합

            if (sum_sim == 0): # 분모가 0인 경우 = k명의 모든 사람과 유사도가 0
                now_book_recommend = 0 # 평점 0 - 제일 낮은 값
            else: # 분모 0 아닌 모든 경우
                now_book_recommend = sum_sim_score / sum_sim # 계산된 평점 값

                # 유저별 추천영화 dict로 저장
                if ~np.isnan(now_book_recommend): # nan이 아닌 경우만 저장
                    if user in user_recommend_dict: # dict에 한번 저장한 경우
                        user_recommend_dict[user].append({"book_id":book,"score":now_book_recommend})
                    else: # dict가 처음인 경우
                        user_recommend_dict[user] = []
                        user_recommend_dict[user].append({"book":book,"score":now_book_recommend})

            R_predicted[user][book] = now_book_recommend # 전체 추천 평점 행렬의 user,book 칸에 계산 평점 추가
            renew_list.append(now_book_recommend) # 계산된 모든 평점:개수 관계를 보기 위해 리스트에 저장



    count_recommend_book=0 # 계산된 영화 수
    # 계산된 추천 평점별 개수 계산
    count_dict = {} # 평점:개수 저장할 딕셔너리
    for now in renew_list:
        # 만약 계산값이 nan인거는 개수 안구함
        if np.isnan(now):
            continue
        # nan 아닌 경우
        count_recommend_book += 1
        if now in count_dict: # 만약 now란 값이 이미 딕셔러니에 저장되어 있으면
            count_dict[now] += 1 # num값 개수 증가
        else: # 딕셔너리에 처음 삽입하는 경우
            count_dict[now] = 1 # num값 1개로 선언

    # 평점:개수 개수 오름차순 정렬
    score_count_sort = sorted(count_dict.items(), key=operator.itemgetter(1))

    print("계산된 영화 수",count_recommend_book)

    # 유저별 추천된 책 내림차순 정리
    score_count_sort = sorted(user_recommend_dict.items()) # 유저번호 오름차순 정렬
    with open("user_rcm.json", 'w', encoding='utf-8') as f:
        for users in score_count_sort: # 각 유저 추천영화정보
            data = sorted(users[1],key=operator.itemgetter("score"), reverse=True) # 추천영화정보 내림차순 정렬
            now_dict = {"member_id":users[0],"book_list":data}
            json.dump(now_dict, f, ensure_ascii=False, indent=4)
            #print(users[0],data)





    return R_predicted


member_set_list = set() # 중복제거된 유저 번호 보기위한 리스트
book_set_list = set() # 중복제거된 책 번호 보기위한 리스트

replace_array = np.full((200,5000),np.nan) # 평점 행렬 만들기 위한 행렬 생성 임의의 크기로 잡음 실제 사용할 배열은 계산 끝나고 크기맞춰서축소

member_book_list = {}
# 중복되지 않는 모든 개수 = set
# 유저당 - 책 리스트 필요
for report_data in Book_report_data:
    # 책 행의 유저 열에 평점 삽입
    replace_array[report_data[1]][report_data[0]] = report_data[2]

    # 위에서 선언한 set에 지금 책번호,유저번호 추가하기 - 보기용
    book_set_list.add(report_data[0])
    member_set_list.add(report_data[1])

    # 한 아이디에 한 북아이디 되고 중복 한유저-북id 중복 없음
    # 유저 당 책 리스트 구하기 위한 코드 - 계산에는 필요 없음
    try:
        flag = member_book_list[str(report_data[1])]
        flag.append(report_data[0]-1)
    except KeyError:
        member_book_list[str(report_data[1])] = []
        member_book_list[str(report_data[1])].append(report_data[0])

start_member_id = min(member_set_list) # 제일작은 회원 아이디
end_member_id = max(member_set_list) # 제일마지막 회원 아이디
start_book_id = min(book_set_list) # 제일 작은 책 id
end_book_id = max(book_set_list) # 제일 마지막 책 id

# 입력데이터 사이즈에 맞게 배열 변경하기
origin_list = [] # 변경된 평점배열 만들 리스트
for i in range(end_member_id): # 회원 수(row)만큼 반복
    now_col = list(replace_array[i][0:end_book_id]) # 지금 row 추출
    origin_list.append(now_col) # row 삽입

origin_array = np.array(origin_list)# 2차원 리스트 2차원 배열로 변경

R = csr_matrix(origin_array) # 입력 매트릭스 희소행렬로 변환
R_result = predicted_rating(R, K, start_member_id, start_book_id) # 평점 계산하는 함수 // 파라미터 { 행렬, 유사도 구할려는 친구 개수, 시작 회원 id, 시작 책 id}
df_origin = pd.DataFrame(origin_array) # 인풋되는 값으로 이루어진 평점 행렬
df_result = pd.DataFrame(R_result) # 최종 계산된 평점 행렬
df_origin.to_csv('origin.csv',encoding="utf-8") # 기본 평점 행렬 저장
df_result.to_csv('result.csv',encoding="utf-8") # 계산된 평점 행렬 저장
