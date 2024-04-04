import os
import numpy as np
import math
from pprint import pprint
from docx import Document
import pandas as pd

def tfIdf(dataList):
    tfMapList = []
    wordMap = {}
    wordCount = 0

    for data in dataList:
        tfMap = {}
        for word in data.split():
            if word in tfMap.keys():
                tfMap[word] += 1
            else:
                tfMap[word] = 1

            if word not in wordMap.keys():
                wordMap[word] = wordCount
                wordCount += 1

        tfMapList.append(tfMap)

    table = [[0] * len(wordMap) for _ in range(len(tfMapList))]
    row = 0

    for tfMap in tfMapList:
        for word, tf in tfMap.items():
            word_count = 0
            for map in tfMapList:
                if word in map.keys():
                    word_count += 1

            idf = math.log10(len(tfMapList) / word_count)
            tf_idf = tf * idf
            column = wordMap[word]
            table[row][column] = tf_idf

        row += 1

    return wordMap, table

# 같은 폴더에 있는 docx 파일 경로
docx_files = ['어린왕자.docx', '타임머신.docx', '감자.docx', '동백꽃_봄봄.docx', '심청전.docx', '홍길동전.docx']

# 데이터 리스트 초기화
dataList = []

# 각 파일의 내용을 문자열로 변환하여 dataList에 추가
for file_path in docx_files:
    if os.path.exists(file_path):
        doc = Document(file_path)
        text = ''
        for paragraph in doc.paragraphs:
            text += paragraph.text + '\n'
        dataList.append(text)
    else:
        print(f"{file_path} 파일을 찾을 수 없습니다.")

# TF-IDF 계산
wordMap, table = tfIdf(dataList)

# TF-IDF 테이블을 DataFrame으로 변환
df = pd.DataFrame(table, columns=wordMap.keys())

# DataFrame을 엑셀 파일로 저장
excel_file_path = 'TF-IDF_Table.xlsx'
df.to_excel(excel_file_path, index=False)

print(f"TF-IDF 테이블이 {excel_file_path}에 저장되었습니다.")
