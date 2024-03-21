import os
import json
import mysql.connector
from math import sqrt
import numpy as np
from openpyxl import Workbook
import time 

#MySQL 연결 설정 // 사용할 sql 정보로 커스텀 필요!!
db_connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="lute1020!",
    database="kead_db"
)
# 커서 생성
cursor = db_connection.cursor()

# 50 by 200 크기의 null 값으로 채워진 행렬 생성
base_matrix = matrix = np.full((51, 251), np.nan)

# KNN 함수 컨설턴트님거 뜯어옴
def euclidean_distance(user, neighbor):
	distance = 0.0
	for i in range(len(user)-1):
		if not np.isnan(user[i]) and not np.isnan(neighbor[i]):
		    distance += (user[i] - neighbor[i])**2
	return sqrt(distance)


def get_neighbors(user, neighbor_list, k):
	distances = list()
	for neighbor in neighbor_list:
		dist = euclidean_distance(user, neighbor)
		distances.append((neighbor, dist))
	distances.sort(key=lambda tup: tup[1])

	# print('neighbors distances : ', distances)

	near_neighbors = list()
	for i in range(k):
		near_neighbors.append(distances[i][0])

	# print('near neighbors : ', near_neighbors)

	return near_neighbors


def predict_classification(user, neighbor_list, k, idx):
    neighbors = get_neighbors(user, neighbor_list, k)

    predict_candidate = [row[idx] for row in neighbors if not np.isnan(row[idx])]
    print('predict_candidate : ', predict_candidate)
    prediction = np.average(predict_candidate)
    return prediction



# member_id, book_id, book_member_rate 열을 가져오는 SQL 쿼리를 실행합니다.
cursor.execute("SELECT member_id, book_id, book_member_rate FROM book_report")


# 결과를 가져옵니다.
rows = cursor.fetchall()


# 변경사항 저장 및 연결 종료
db_connection.commit()
cursor.close()
db_connection.close()
print('작업 종료')

# 결과를 행렬 형태로 변환합니다 (리스트의 리스트).
bookreport_matrix = [list(row) for row in rows]

# 결과를 출력합니다.
for row in bookreport_matrix:
	# print(row)
	# print(row[0], row[1], row[2])
	base_matrix[row[0]][row[1]] = row[2]

# 알고리즘을 테스트해봅시다.
k = 5

start = time.time()

for user in base_matrix:
    neighbor_list = []
    for row in base_matrix:
        if np.array_equal(user, row):
            continue  # 자기 자신은 이웃이 아니므로 건너뜁니다.
        neighbor_list.append(row)
    # 여기서부터 neighbor_list를 사용하여 작업을 수행합니다.
    
    for idx in range(len(user)):
        if np.isnan(user[idx]):
            user[idx] = predict_classification(user, neighbor_list, k, idx)
            print(idx, '번째 원소 수정함' )





# prediction = predict_classification(user, neighbor_list, k)

# print('Predict %f.' % (prediction))

















# 엑셀 워크북을 생성합니다.
wb = Workbook()
ws = wb.active

# 행렬의 값을 엑셀 워크시트에 기록합니다.
for i, row in enumerate(base_matrix, start=1):
    for j, value in enumerate(row, start=1):
        ws.cell(row=i, column=j).value = value

# 엑셀 파일을 저장합니다.
wb.save("book_report2.xlsx")
print('엑셀 파일이 생성되었습니다.')

end = time.time()
print(end - start)




