import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import axios from 'axios';

function BookShelf() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: '' });
  const { detail } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
        const response = await axios.get('http://localhost:8080/users/me', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
          }
        });

        setUserInfo(response.data);

        const response2 = await axios.get(`http://localhost:8080/users/${response.data.memberId}/mybookshelf/${detail}`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });

        setBookData(response2.data);
        console.log(response2.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info or book data:', error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const firstObject = bookData && bookData.length > 0 ? bookData[0] : null;
  const reportContent = firstObject ? firstObject.reportContent : null;
  const reportTime = firstObject ? firstObject.reportTime : null;

  return (
    <div style={{ position: 'relative' }}>
      <h2>나의책장 상세 정보</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* 첫 번째 이미지 */}
          <img
            className="bookShelfImage"
            alt=""
            src="img/bookshelf.jpg"
            style={{
              display: 'block',
              width: 'calc(100% - 20px)',
              marginLeft: '10px',
              marginRight: '10px',
              height: 'auto',
              borderRadius: '20px',
              position: 'relative', // 상대 위치 설정
            }}
          />
          {/* 두 번째 이미지 */}
          <h2>책 이름: {bookData[1].bookName}</h2>
          <h2>작가 : {bookData[1].author}</h2>
          <h2>평점 : {bookData[1].score}</h2>

          <h1>독후감</h1>
          <h2>{reportContent}</h2>
          <h2>작성일자 : {reportTime}</h2>

        </div>
      )}
    </div>
  );
}

export default BookShelf;
