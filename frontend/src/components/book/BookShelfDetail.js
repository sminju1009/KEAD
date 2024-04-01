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
          const response = await axios.get('http://localhost:8082/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          setUserInfo(response.data);
          memberIdRef.current = response.data.memberId; // memberIdRef에 값 설정
          console.log(memberIdRef.current);
  
          const response2 = await axios.get(`http://localhost:8082/users/${response.data.memberId}/mybookshelf/${detail}`, {
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
        const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
        const response = await axios.get('http://localhost:8082/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserInfo(response.data);

        const response2 = await axios.get(`http://localhost:8082
        /users/${response.data.memberId}/mybookshelf/${detail}`, {
          headers: {
            Authorization: `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
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
            src={bookData[1].imgUrl}
            style={{
              display: 'block',
              width: 'calc(30% + 10px)',
              marginLeft: '150px',
              marginRight: '10px',
              height: 'auto',
              borderRadius: '20px',
              position: 'relative', // 상대 위치 설정
            }}
          />
          {/* 두 번째 이미지 */}
          {/* <h2>책 이름: {bookData[1].bookName}</h2>
          <h2>작가 : {bookData[1].author}</h2>
          <h2>평점 : {bookData[1].score}</h2> */}

          <h1>독후감</h1>
          <h2>{reportContent}</h2>
          {/* <h2>작성일자 : {reportTime}</h2> */}

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
