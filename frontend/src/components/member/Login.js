import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const goToSignUp = () => {
        navigate('/signup');
      };

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const login = useAuthStore((state) => state.login); // 로그인 함수 가져오기
  const navigate = useNavigate(); // 네비게이트 함수 사용
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // axios를 사용하여 로그인 요청 보내기
        // console.log('fghfgf/',loginData)
        const response = await axios.post('http://localhost:8080/users/login', loginData);
        console.log(response)
        if (response.data.statusCode === 200) {
          login(); // 로그인 상태 업데이트
          navigate('/'); // 메인 페이지로 리다이렉트
        } else {
          // 로그인 실패 처리
          alert('로그인에 실패했습니다.');
        }
      } catch (error) {
        console.error('로그인 요청 중 오류 발생', error);
        alert('로그인 처리 중 문제가 발생했습니다.');
      }
    };

  return (
    <div className="profileField">
      <h1 className="profileTitle">로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputemail">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="inputemail">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="profile-box">
          <button type="submit">로그인</button>
        </div>
      </form>
      <div className="signup-redirect">
        <button onClick={goToSignUp}>회원가입</button>
      </div>
    </div>
  );
}

export default Login;
