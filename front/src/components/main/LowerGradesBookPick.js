import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './carouselstyles.css';

import { FreeMode, Pagination } from 'swiper/modules';

function LowerGradesBookPick() {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate('/book-detail'); // 상세 페이지 경로
  };

  return (
    <div className='bookPick'>
      <h3>1,2학년 추천도서</h3>
       <>
      <Swiper
        slidesPerView={3.3}
        spaceBetween={10}
        freeMode={true}
        
        modules={[FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide><img 
        className="bookImage"
        alt="iPhone_01" 
        src="img/아리스토텔레스.jpg" 
        onClick={goToDetailPage}
  
        /></SwiperSlide>
        <SwiperSlide><img 
        className="bookImage"
        alt="iPhone_01" 
        src="img/아리스토텔레스.jpg" 
        onClick={goToDetailPage}
        
        /></SwiperSlide>
        <SwiperSlide><img 
        className="bookImage"
        alt="iPhone_01" 
        src="img/아리스토텔레스.jpg" 
        onClick={goToDetailPage}
  
        /></SwiperSlide>
        <SwiperSlide><img 
        className="bookImage"
        alt="iPhone_01" 
        src="img/플라톤.jpg" 
        onClick={goToDetailPage}
  
        /></SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
    </div>
  );
}

export default LowerGradesBookPick;
