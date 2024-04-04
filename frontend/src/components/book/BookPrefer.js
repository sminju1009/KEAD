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
        const response = await axios.get('http://j10c106.p.ssafy.io:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
          }
        });
  
        setUserInfo(response.data);
        // console.log(response.data)

        // 두 번째 요청 시작
        const response2 = await axios.get(`http://j10c106.p.ssafy.io:8082/users/${response.data.memberId}/likes`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });
  
        // 서버로부터 받은 데이터를 상태에 설정합니다.
        setBookData(response2.data);
        // console.log(response2.data);

        const bookIds = response2.data.map(item => item.bookId); // bookId만 추출하여 배열 생성
        // console.log(bookIds)

        // 각 bookId에 대해 요청을 보내고 결과를 배열로 저장
        const bookResponses = await Promise.all(bookIds.map(bookId =>
          axios.get(`http://j10c106.p.ssafy.io:8082/book/${bookId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ));

        // 각 response에서 data를 추출하여 배열로 만듦
        const booksData = bookResponses.map(response => ({
          imgUrl: response.data.imgUrl,
          bookId: response.data.bookId
        }));
        // console.log(booksData)
        // 상태에 설정
        setBookData(booksData);
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
        <div>
          {bookData && bookData.map((item, index) => (
            <Link
              to={{
                pathname: `/book-detail/${item.bookId}`
              }}
              key={item.bookId}
            >
              <img
                src={item.imgUrl}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookPrefer;
