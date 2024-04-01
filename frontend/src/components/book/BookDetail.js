
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const [book, setBook] = useState([]);

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
        console.log(response.data);
      } catch (error) {
        console.error("Catch Error", error);
      }
    };

    getBook();
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  // back-front 연결 통신

  return (
    <div>
      <h2>책 상세 정보</h2>
      <h2>{book.book_name}</h2>
      <img src={book.img_url} alt={book.book_name} />
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
    </div>
  );
}
export default BookDetail;
