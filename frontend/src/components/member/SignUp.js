import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    memberGrade: null,
    school: '',
    sex: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGradeClick = (memberGrade) => {
    setFormData((currentFormData) => {
      // console.log('Selected grade before update:', currentFormData.memberGrade);
      return {
        ...currentFormData,
        memberGrade,
      };
    });
  };
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting formData:', formData);

    const submittedData = {
      ...formData,
      sex: parseInt(formData.sex, 10), // 10진수로 변환
    };

    // console.log(typeof formData.memberGrade);
    // console.log(typeof formData.sex);

    // console.log('Submitting submittedData:', submittedData);
    try {
        // 백엔드 엔드포인트로 POST 요청 보내기
        const response = await axios.post('http://j10c106.p.ssafy.io:8082/users/signup', submittedData);
        
        alert('회원가입이 완료되었습니다.');
        // console.log('Navigating to /login');
        navigate('/login');
        // console.log('Navigate called');

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
            {[1, 2, 3, 4, 5, 6].map((memberGrade) => (
              <button
                key={memberGrade}
                className={`gradeButton ${formData.memberGrade === memberGrade ? 'selected' : ''}`}
                type="button"
                onClick={() => handleGradeClick(memberGrade)}
              >
                {memberGrade}학년
              </button>
            ))}
          </div>
        </div>
        <div className="inputField">
          <h3>성별</h3>
          <label>
            <input
              type="radio"
              name="sex"
              value="0" // 남자
              checked={formData.sex === '0'}
              onChange={handleInputChange}
            />
            남자
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="1" // 여자
              checked={formData.sex === '1'}
              onChange={handleInputChange}
            />
            여자
          </label>
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
