import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import "./BookDetail.css"

function BookDetail() {
  const [userInfo, setUserInfo] = useState({ nickname: '' });
  const [book, setBook] = useState(null);
  const [bookId, setBookId] = useState(null); 
  const [like, setLike] = useState(null)
  const [liked, setLiked] = useState(false); // 좋아요 상태를 저장하는 state 추가

  useEffect(() => {
    const getBook = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const bookId = window.location.pathname.split("/").pop();
        const response = await axios.get(
          `http://j10c106.p.ssafy.io:8082/book/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(response.data);
        setBookId(bookId);

        const response2 = await axios.get('http://j10c106.p.ssafy.io:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response2.data);
        // console.log(response2.data);

        const memberId = response2.data.memberId; // memberId 추출
        // X-UserId 헤더에 memberId 추가하여 요청 보내기
        const response3 = await axios.get(
          `http://j10c106.p.ssafy.io:8082/book/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-UserId": memberId // X-UserId 헤더에 memberId 추가
            },
          }
        );

        const response4 = await axios.get(`http://j10c106.p.ssafy.io:8082/users/${response2.data.memberId}/likes`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
          }
        });
  
        // 서버로부터 받은 데이터를 상태에 설정합니다.
        setLike(response4.data);
        // console.log(response4.data);
        const bookIds = response4.data.map(item => item.bookId); // bookId만 추출하여 배열 생성
        // console.log(bookIds)
        // console.log(bookId)

        // bookIds 배열에 현재 bookId가 포함되어 있는지 여부 확인
        const isLiked = bookIds.includes(parseInt(bookId));
        // 현재 좋아요 상태 설정
        setLiked(isLiked);
        // console.log(isLiked)

      } catch (error) {
        console.error("Catch Error", error);
      }
    };

    getBook();
  }, []);

  const handleGoBack = () => {
    window.location.href = '/';
  };

  const handleWriteReview = () => {
    if (bookId) {
      window.location.href = `/insert_book_report/${bookId}`;
    }
  };

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      // 좋아요 toggle 요청
      await axios.post(
        `http://j10c106.p.ssafy.io:8082/book/${bookId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-UserId": userInfo.memberId // X-UserId 헤더에 memberId 추가
          },
        }
      );
      // 현재 좋아요 상태를 업데이트하기 위해 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 다시 서버로부터 좋아요 목록을 받아옴
      const response4 = await axios.get(`http://j10c106.p.ssafy.io:8082/users/${userInfo.memberId}/likes`, {
        headers: {
          Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
        }
      });
      // 서버로부터 받은 데이터를 상태에 설정합니다.
      setLike(response4.data);
      // console.log(response4.data);
      const updatedBookIds = response4.data.map(item => item.bookId); // bookId만 추출하여 배열 생성
      // console.log(updatedBookIds);

      // 업데이트된 bookIds 배열에 현재 bookId가 포함되어 있는지 여부 확인
      const isLiked = updatedBookIds.includes(parseInt(bookId));
      // 현재 좋아요 상태 설정
      setLiked(isLiked);
      // console.log(isLiked);

    } catch (error) {
      console.error("Catch Error", error);
    }
  };
  

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button className="button button1" onClick={handleGoBack}>뒤로가기</button>
      <h2>책 상세 정보</h2>
      <h2>{book.book_name}</h2>
      <img src={book.imgUrl} alt={book.book_name} style={{ maxWidth: '50%' }} />
      <p>
        <strong>저자:</strong> {book.author}
      </p>
      <p>
        <strong>출판사:</strong> {book.publisher}
      </p>
      <p>
        <strong>장르:</strong> {book.genre}
      </p>
      <p>
        <strong>책 소개:</strong> {book.description}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      {/* 좋아요 버튼 */}
      <button className="button button2" onClick={toggleLike}>
        {liked ? <FcLike /> : <FcLikePlaceholder />}
        좋아요
      </button>
      {/* 독후감 작성 버튼 */}
      <button className="container button button3" onClick={handleWriteReview}>독후감 작성</button>
    </div>
  );
}

export default BookDetail;
