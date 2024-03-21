import requests
import xml.etree.ElementTree as ET
from openpyxl import Workbook
 
# 전국 초등학교 수 
TOTAL_COUNT = 6327
 
# 커리어넷 초등학교 정보 URL
# 커리어넷 API를 신청해서 URL 생성하기
URL = 'https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=00b3e8e584f416870e308719ab83f954&svcType=api&svcCode=SCHOOL&contentType=xml&gubun=elem_list&thisPage=1&perPage=10000'
 
# API 요청하기
response = requests.get(URL) 
status = response.status_code 
text = response.text        # XML 형태
root = ET.fromstring(response.text)
 
# 데이터 개수를 세는 코드
# data_count = len(root.findall('.//content'))
# print("데이터 개수:", data_count)
 
# root[i][0].text -> <link>        # 링크 link : 상세페이지 링크
# root[i][1].text -> <adres>       # 주소
# root[i][2].text -> <schoolName>  # 학교명
# root[i][3].text -> <region>      # 지역
# root[i][4].text -> <totalCount>  # 전체 검색 결과수 // 사용할 필요x
# root[i][5].text -> <estType>     # 설립유형
# root[i][6].text -> <seq>         # 뭔지 모르겠는데? 일련번호? // 사용할 필요x
 
# OpenPyXL 이용해서 전국  초등학교 정보 엑셀에 담기 위한 초기 작업
ABC = ["A1", "B1", "C1", "D1", "E1"]
columns = ["지역", "학교명", "설립유형", "주소", "링크"]
 
# 엑셀파일 쓰기
write_wb = Workbook()
 
# Sheet1에 입력
write_ws = write_wb.active
 
# Head Column 만들기
for (alphabet, col) in zip(ABC, columns): 
  write_ws[alphabet] = col
 
#행 단위로 추가
for i in range(TOTAL_COUNT):
  write_ws.append([root[i][3].text, # <region>      # 지역
                   root[i][2].text, # <schoolName>  # 학교명
                   root[i][5].text, # <estType>     # 설립유형
                   root[i][1].text, # <adres>       # 주소
                   root[i][0].text, # <link>        # 링크 link : 상세페이지 링크
                 ]) 
 
# 파일 저장하기
write_wb.save("ElemSchool_Info.csv")
