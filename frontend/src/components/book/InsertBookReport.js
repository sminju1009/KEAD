import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function BookShelf() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportContent, setReportContent] = useState(''); // 독후감 내용을 관리하는 상태 추가
  const { detail } = useParams();
  const memberIdRef = useRef(null);
  const bookIdRef = useRef(null);

//console.log(detail),"agewahehra";

  useEffect(() => {
    //console.log(detail)
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        memberIdRef.current = response.data;

        const response2 = await axios.get(`http://localhost:8082/book/${detail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookData(response2.data);
        setLoading(false);

        bookIdRef.current = response2.data
      } catch (error) {
        console.error('Error fetching book data:', error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  const handleInsert = async () => {
    try {
      const bookimf = bookIdRef.current;

      //console.log(bookimf)
      //console.log(reportContent)

      const token = localStorage.getItem('jwtToken');
      
      await axios.post(`http://localhost:8082/users/mybookshelf`, {
        memberId: memberIdRef.current,
        bookId: bookimf.bookId,
        Isbn: bookimf.isbn,
        reportContent: reportContent,
        reportTime: "2024-04-02",
        bookMemberRate : 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      //window.location.href = '/';
    } catch (error) {
      console.error('Error inserting report:', error);
    }
  };

  const handleReportContentChange = (event) => {
    setReportContent(event.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>독후감 작성</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img
            className="bookShelfImage"
            alt=""
            src={bookData.imgUrl}
            style={{
              display: 'block',
              width: 'calc(30% + 10px)',
              marginLeft: '150px',
              marginRight: '10px',
              height: 'auto',
              borderRadius: '20px',
              position: 'relative'
            }}
          />
          <h1>독후감</h1>
          <textarea
            value={reportContent}
            onChange={handleReportContentChange}
            placeholder="독후감을 작성해주세요"
            style={{ width: '100%', height: '100px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button>뒤로가기</button>
            </Link>
            <button onClick={handleInsert}>독후감 등록 하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookShelf;
