import React, { useState, useEffect } from 'react'; // React와 useEffect를 임포트합니다.
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookRecommendation.css';

function BookRecommendation() {
  const [userInfo, setUserInfo] = useState({ nickname: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://j10c106.p.ssafy.io:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info or book data:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Link to="/book_recomm" className='background-orange mypage-box'>
      {userInfo.nickname}을 위한 추천도서
    </Link>
  );
}

export default BookRecommendation;