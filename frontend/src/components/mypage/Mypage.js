import React from 'react'
import { useState, useEffect } from 'react';
import './Mypage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';


function Mypage() {
  const { isAuthenticated, user, logout: logoutFromStore } = useAuthStore();
  const [userInfo, setUserInfo] = useState({ nickname: '' })
  const navigate = useNavigate();

 // 페이지 로드 시 사용자 정보를 가져오는 함수
 useEffect(() => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
      // console.log(token) 토큰있음
      const response = await axios.get('http://j10c106.p.ssafy.io:8082/users/me', {
        headers: {
          Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
        }
      });
      setUserInfo(response.data);
      // console.log(response.data); // 응답 데이터를 콘솔에 출력
    } catch (error) {
      console.error('Error fetching user info:', error);
      // 인증 실패 시 로그인 페이지로 리다이렉트 등의 처리를 할 수 있음
    }
  };

  fetchUserInfo();
}, []); // 의존성 배열을 비워서 컴포넌트 마운트 시 1회만 호출되도록 함

  const goToEditProfile = () => {
    navigate('/profile')
  }

  const logout = async () => { // async 함수로 수정
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) { // 토큰이 존재하는 경우에만 요청 보내도록 수정
        await axios.get('http://j10c106.p.ssafy.io:8082/users/deleteflask', { // DELETE 요청을 보내기 위해 axios.delete 사용
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error fetching user info or book data:', error);
      // 에러 처리
    }
    localStorage.removeItem('jwtToken'); // 로컬 스토리지에서 토큰 삭제
    navigate('/login'); // 로그인 페이지로 리다이렉트
  };

  return (
    <div>
      <h2 className="pageTitle">
        <span style={{ color: '#EB9F4A' }}>M</span>
        <span style={{ color: '#77B29F' }}>Y</span>
        <span> </span>
        <span style={{ color: '#AB70DF' }}>P</span>
        <span style={{ color: '#6884F6' }}>A</span>
        <span style={{ color: '#AB70DF' }}>G</span>
        <span style={{ color: '#6884F6' }}>E</span>
      </h2>
      <div className='mypageTop'>
        <div> {/* 이름과 Joined 정보를 하나의 div로 묶습니다. */}
          <h3 className='mynameFontSize'>{ userInfo.nickname }</h3>
          <div className="flex-container">
            <div className="flex-item">
              <img alt="" src="img/Vector.png" />
            </div>
            <div className="flex-item">
              <h4>Joined March 2024</h4>
            </div>
          </div>
        </div>
        {/* 프로필사진을 mypageTop 안으로 이동하고, 오른쪽 정렬을 위한 스타일 적용 */}
        <img 
          className="profileImage"
          alt="profileImage" 
          src="img/ronaldo.jpg" 
        />
      </div>
      <div className="horizontalLine"></div>
      <div className="image-grid">
        <div className="image-container">
          <img src="img/reading_king.png" alt="reading_king" />
          <p>독서왕</p>
        </div>
        <div className="image-container">
          <img src="img/quiz_king.png" alt="quiz_king" />
          <p>퀴즈왕</p>
        </div>
        <div className="image-container">
          <img src="img/genre_king.png" alt="genre_king" />
          <p>장르왕</p>
        </div>
        <div className="image-container">
          <img src="img/bookreview_king.png" alt="bookreview_king" />
          <p>독후감왕</p>
        </div>
        <div className="image-container">
          <img src="img/collection_king.png" alt="collection_king" />
          <p>수집왕</p>
        </div>
        <div className="image-container">
          <img src="img/like_king.png" alt="like_king" />
          <p>좋아요왕</p>
        </div>
      </div>
      <div className='background-orange mypage-box' onClick={goToEditProfile}>
        회원정보수정
      </div>
      <div className='background-orange mypage-box' onClick={logout}>
        로그아웃
      </div>
    </div>
  );
}

export default Mypage;
