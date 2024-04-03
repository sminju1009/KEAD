import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './carouselstyles.css';
import './LowerGradesBookPick.css';


import { FreeMode } from 'swiper/modules';

function LowerGradesBookPick() {

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const response2 = await axios.get(`http://localhost:8082/users/booklist`,{//${response.data.memberId}/mybookshelf`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setBookData(response2.data);
        console.log(response2)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book data:', error);
        setLoading(false);
      }
    };
  
    fetchBookData();
  }, []);

  const navigate = useNavigate();

  const goToDetailPage = (bookId) => {
    navigate(`/book-detail/${bookId}`);
  };

  return (
    <div className='bookPick'>
      <h3>1,2학년 추천도서</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={3.3}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {bookData.slice(80, 100).map((book) => ( // 예시로 5번째부터 10번째까지의 요소를 추출
            <SwiperSlide key={book.bookId}>
              <img
                className="bookImage"
                alt={`Book ${book.bookId}`}
                src={book.imgUrl}
                onClick={() => goToDetailPage(book.bookId)} // 클릭 시 bookId를 인자로 전달
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

<h3>3,4학년 추천도서</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={3.3}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {bookData.slice(45, 65).map((book) => ( // 예시로 5번째부터 10번째까지의 요소를 추출
            <SwiperSlide key={book.bookId}>
              <img
                className="bookImage"
                alt={`Book ${book.bookId}`}
                src={book.imgUrl}
                onClick={() => goToDetailPage(book.bookId)} // 클릭 시 bookId를 인자로 전달
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}


<h3>5,6학년 추천도서</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          slidesPerView={3.3}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {bookData.slice(0, 20).map((book) => ( // 예시로 5번째부터 10번째까지의 요소를 추출
            <SwiperSlide key={book.bookId}>
              <img
                className="bookImage"
                alt={`Book ${book.bookId}`}
                src={book.imgUrl}
                onClick={() => goToDetailPage(book.bookId)} // 클릭 시 bookId를 인자로 전달
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default LowerGradesBookPick;
