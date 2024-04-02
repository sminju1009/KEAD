import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import axios from 'axios';

function BookShelf() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
        const response = await axios.get('https://j10c106.p.ssafy.io:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
          }
        });
  
        setUserInfo(response.data);
 
        //console.log(response.data)
        // 두 번째 요청 시작
        const response2 = await axios.get(`http://j10c106.p.ssafy.io:8082/users/${response.data.memberId}/mybookshelf`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });
  
        // 서버로부터 받은 데이터를 상태에 설정합니다.
        setBookData(response2.data);
        //console.log(response2.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info or book data:', error);
        setLoading(false);
      }
    };
  
    fetchUserInfo();
  }, []);




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
          <div style={{ position: 'absolute', top: 70, left: 20, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 'minmax(28%, auto)', gap: '-60%', gridAutoColumns: '2%', }}>
            {bookData.slice(0, 24).map((item, index) => (
              <Link
                to={{
                  pathname: `/mybook-shelf/${item.bookId}`
                }}
                key={item.bookId}
              >
                <img
                  className="bookShelfImage"
                  alt=""
                  src={item.imgUrl}
                  style={{
                    display: 'block',
                    width: 'calc(70% + 10px)', // 현재의 70% 크기로 설정
                    height: 'auto',
                    borderRadius: '20px',
                    marginLeft: '-10px', // 왼쪽으로 10px만큼 이동하여 겹치도록 설정
                    cursor: 'pointer', // 포인터 모양으로 변경하여 클릭 가능함을 나타냄
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookShelf;
