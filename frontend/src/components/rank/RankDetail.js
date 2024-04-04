import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RankDetail() {
  const [bookInfo, setBookInfo] = useState({ bookId: '', wordList: [] });
  const [inputWord, setInputWord] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://j10c106.p.ssafy.io:8082/users/quiz/1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookInfo({ ...response.data, wordList: JSON.parse(response.data[0].wordList) });
      } catch (error) {
        console.error('Error fetching book info:', error);
      }
    };
    fetchBookInfo();
  }, []);

  const handleInputChange = (e) => {
    setInputWord(e.target.value);
    setErrorMessage(''); // 사용자가 입력을 시작하면 에러 메시지를 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const foundWord = bookInfo.wordList.find((word) => word.word === inputWord);
  
    if (foundWord) {
      // 유사도 정보가 있는 단어를 결과 배열에 추가하고 에러 메시지는 초기화
      const newResults = [...results, { word: inputWord, value: foundWord.value, message: `의 중요도: ${foundWord.value}` }];
      setResults(newResults.sort((a, b) => b.value - a.value)); // 결과 배열을 유사도에 따라 정렬하여 저장
      setErrorMessage(''); // 중요한 단어를 찾았으므로 에러 메시지는 표시하지 않음
    } else {
      // 입력한 단어를 포함한 에러 메시지를 설정
      setErrorMessage(`${inputWord}은(는) 중요하지 않은 단어입니다.`);
    }
  
    setInputWord(''); // 입력 필드 초기화
  };
  

  return (
    <div>
      <h1>단어 중요도 게임</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputWord}
          onChange={handleInputChange}
          placeholder="단어를 입력하세요"
        />
        <button type="submit">제출</button>
      </form>
      <ul>
        {/* 결과 목록 렌더링 */}
        {results.map((result, index) => (
          <li key={index}>{result.word}{result.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default RankDetail;
