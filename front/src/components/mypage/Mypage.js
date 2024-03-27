import React from 'react'
import './Mypage.css'

import { useNavigate } from 'react-router-dom';

function Mypage() {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate('/profile')
  }

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
          <h3 className='mynameFontSize'>호날두</h3>
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
      <div className='background-orange mypage-box'>
        로그아웃
      </div>
    </div>
  );
}

export default Mypage;