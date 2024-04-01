import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    grade: null,
    school: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGradeClick = (grade) => {
    setFormData({
      ...formData,
      grade,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // 백엔드 엔드포인트로 POST 요청 보내기
        const response = await axios.post('http://localhost:8082/users/signup', formData);
        console.log(response.data);
        alert('회원가입이 완료되었습니다.');
        // 회원가입 성공 후, 필요한 로직 구현 (예: 로그인 페이지로 리다이렉트)
      } catch (error) {
        console.error('회원가입 요청 처리 중 에러 발생:', error);
        alert('회원가입 처리 중 문제가 발생했습니다.');
      }
    };

  return (
    <div className="profileField">
      <h1 className="profileTitle">회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputemail">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="inputemail">
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
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
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="gradeField">
          <h3>학년</h3>
          <div className="gradeButtons">
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <button
                key={grade}
                className={`gradeButton ${formData.grade === grade ? 'selected' : ''}`}
                type="button"
                onClick={() => handleGradeClick(grade)}
              >
                {grade}학년
              </button>
            ))}
          </div>
        </div>
        <div className="inputemail">
          <input
            type="text"
            id="school"
            name="school"
            placeholder="학교 이름"
            value={formData.school}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="profile-box">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
