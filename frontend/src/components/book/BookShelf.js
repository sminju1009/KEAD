import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookShelf() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // axios를 사용하여 데이터를 가져옵니다.
        const id = 3;
        //const page = 4;
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjU3Iiwicm9sZSI6WyJVU0VSIl0sImlhdCI6MTcxMTY5Nzk2MSwiZXhwIjoxNzExNzQxMTYxfQ.sZIHAJz9qRLRjp5zsOtWtt6ltTq_GkrS1gZmC0xBhZ8'; // 여기에 토큰을 설정하세요
        const response = await axios.get(`http://localhost:8080/users/${id}/mybookshelf`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });

        // 서버로부터 받은 데이터를 상태에 설정합니다.
        setBookData(response.data);
        setLoading(false);
        console.log(response.data[0].imgUrl)
        //console.log(bookData,loading)
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        setLoading(false);
      }
    };
    

    fetchData(); // fetchData 함수 호출

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  return (
    <div>
      <h2>나의책장 상세 정보</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>

            {/* 첫 번째 이미지 */}
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
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {bookData.map((item, index) => (
      <img
        key={index}
        className="bookShelfImage"
        alt=""
        src={item.imgUrl}
        style={{
          display: 'block',
          width: 'calc(20% - 20px)', // 6개씩 나열하므로 전체 너비를 20%로 설정한 후 간격 제외
          marginLeft: '10px',
          marginRight: '10px',
          marginBottom: '20px', // 아래로 내려가는 간격
          height: 'auto',
          borderRadius: '20px',
        }}
      />
    ))}
  </div>
</div>

          {bookData && (
            <div>
              {/* 서버로부터 받은 데이터를 표시합니다. */}
              <h3>{bookData[0].imgUrl}</h3>
              <p>{bookData.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookShelf;
