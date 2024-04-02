import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import './BookRecommendation.css';

function BookRecommendation() {
  return (
    <Link to="/book_recomm" className='background-orange mypage-box'>
      호날두님을 위한 추천도서
    </Link>
  );
}

export default BookRecommendation;