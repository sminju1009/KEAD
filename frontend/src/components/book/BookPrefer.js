import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import axios from 'axios';


function BookPrefer() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
        const response = await axios.get('http://localhost:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
          }
        });
  
        setUserInfo(response.data);
        console.log(response.data)

        // 두 번째 요청 시작
        const response2 = await axios.get(`http://localhost:8082/users/${response.data.memberId}/likes`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });
  
        // 서버로부터 받은 데이터를 상태에 설정합니다.
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


  return (
    <div>
      <h2 className="pageTitle">
        <span style={{ color: '#EB9F4A' }}>K</span>
        <span style={{ color: '#77B29F' }}>E</span>
        <span style={{ color: '#AB70DF' }}>A</span>
        <span style={{ color: '#6884F6' }}>D</span>
      </h2>
      <div className='background-orange rank-box'>
      {userInfo.nickname}님의 KEAD
      </div>
      <div className="image-grid">
        <div className="image-container">
          <img src="img/reading_king.png" alt="reading_king" />
          
        </div>
        <div className="image-container">
          <img src="img/quiz_king.png" alt="quiz_king" />
          
        </div>
        <div className="image-container">
          <img src="img/genre_king.png" alt="genre_king" />
          
        </div>
        <div className="image-container">
          <img src="img/bookreview_king.png" alt="bookreview_king" />
          
        </div>
        <div className="image-container">
          <img src="img/collection_king.png" alt="collection_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          
        </div>
      </div>
    </div>
  );
}

export default BookPrefer;
