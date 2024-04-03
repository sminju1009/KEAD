import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';

//import './carouselstyles.css';
import './BookRecommList.css';


import { FreeMode } from 'swiper/modules';

function LowerGradesBookPick() {

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: '' });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data)
        console.log(response.data)
        const response2 = await axios.get(`http://localhost:8082/users/${response.data.memberId}/recommends`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(response2.data==""){
          alert("둑후감을 작성하세요");
          window.location.href = '/';
        }
        setBookData(response2.data);
        console.log(response2);
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
      <h3> {userInfo.nickname} 추천도서</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper 
        slidesPerView={1.0}
        spaceBetween={10}
        freeMode={true}
        >
        {bookData.slice(0, 10).map((book, index) => (
            <SwiperSlide key={book.book_id} >
            <div className="bookWrapper">
                
                <h2>{index + 1} 순위 추천 도서</h2>
                <h2>추천률 : {(book.score * 100).toFixed(0)}% </h2>
                <img
                alt={`Book ${book.book_id}`}
                src={book.img_url}
                onClick={() => goToDetailPage(book.book_id)}
                style={{ width: '100%', height: 'auto' }}
                />
            </div>
            </SwiperSlide>
        ))}
        </Swiper>
      )}
    </div>
  );
}

export default LowerGradesBookPick;
