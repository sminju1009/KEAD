import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const [book, setBook] = useState(null);
  const [bookId, setBookId] = useState(null); // 책의 ID를 저장하는 state 추가
  //const history = useHistory();

  useEffect(() => {
    const getBook = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const bookId = window.location.pathname.split("/").pop();
        const response = await axios.get(
          `http://localhost:8082/book/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBook(response.data);
        setBookId(bookId); // 책의 ID 설정
        console.log(response.data);
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
    console.log("독후감 작성 버튼 클릭");
    if (bookId) {
      window.location.href = `/insert_book_report/${bookId}`; // 책의 ID를 동적으로 전달
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  // back-front 연결 통신

  return (
    <div>
      <button onClick={handleGoBack}>뒤로가기</button>
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
      {/* 독후감 작성 버튼 */}
      <button onClick={handleWriteReview}>독후감 작성</button>
    </div>
  );
}
export default BookDetail;
