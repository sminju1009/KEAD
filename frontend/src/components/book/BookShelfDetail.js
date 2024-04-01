import  { React,useState, useEffect,useRef  } from 'react';
import { Link, useParams } from 'react-router-dom'; // React Router의 Link 컴포넌트 추가
import axios from 'axios';

function BookShelf() {
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({ nickname: '' });
    const { detail } = useParams();
    const memberIdRef = useRef(null); // useRef를 사용하여 memberId를 관리
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          const response = await axios.get('http://localhost:8080/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setUserInfo(response.data);
          memberIdRef.current = response.data.memberId; // memberIdRef에 값 설정
          console.log(memberIdRef.current);
  
          const response2 = await axios.get(`http://localhost:8080/users/${response.data.memberId}/mybookshelf/${detail}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setBookData(response2.data);
          console.log(response2.data);
  
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user info or book data:', error);
          setLoading(false);
        }
      };
  
      fetchUserInfo();
    }, []);
  
    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        await axios.delete(`http://localhost:8080/users/${memberIdRef.current}/mybookshelf/${detail}`, { // memberIdRef.current를 사용
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // 삭제 후 필요한 작업 수행 (예: 페이지 리다이렉션)
        // 삭제 후 페이지 리다이렉션
        window.location.href = '/mybook-shelf';
    } catch (error) {
        console.error('Error deleting book:', error);
    }
    };
  
    // 나머지 코드는 동일하게 유지
  

  const firstObject = bookData && bookData.length > 0 ? bookData[0] : null;
  const reportContent = firstObject ? firstObject.reportContent : null;
  const reportTime = firstObject ? firstObject.reportTime : null;

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
          <h2>책 이름: {bookData[1].bookName}</h2>
          <h2>작가 : {bookData[1].author}</h2>
          <h2>평점 : {bookData[1].score}</h2>

          <h1>독후감</h1>
          <h2>{reportContent}</h2>
          <h2>작성일자 : {reportTime}</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* 뒤로가기 버튼 */}
            <Link to="/mybook-shelf" style={{ textDecoration: 'none' }}>
              <button>뒤로가기</button>
            </Link>
            {/* 삭제하기 버튼 */}
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookShelf;
