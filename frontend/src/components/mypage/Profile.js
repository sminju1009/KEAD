import React, { useState, useEffect } from 'react';
import './Profile.css'
import useModal from '../../hooks/useModal';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Profile() {

  const [userInfo, setUserInfo] = useState({ email: '' })
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  
 // 페이지 로드 시 사용자 정보를 가져오는 함수
 useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // 로컬 스토리지에서 JWT 토큰 가져오기
      // console.log(token) 토큰있음
      const response = await axios.get('http://j10c106.p.ssafy.io:8082/users/me', {
        headers: {
          Authorization: `Bearer ${token}` // 요청 헤더에 토큰 포함
        }
      });
      setUserInfo(response.data);
      console.log(response.data); // 응답 데이터를 콘솔에 출력
    } catch (error) {
      console.error('Error fetching user info:', error);
      // 인증 실패 시 로그인 페이지로 리다이렉트 등의 처리를 할 수 있음
    }
  };

  fetchUserInfo();
}, []);
  
  // 닉네임 중복 확인 함수
  const checkNicknameDuplicate = async () => {
    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = localStorage.getItem('jwtToken');

      // Axios 요청 시 헤더에 토큰 포함
      const response = await axios.get(`http://j10c106.p.ssafy.io:8082/users/nickname/${nickname}/check`, {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰 추가
        }
      });
      console.log("중복확인 response:", response.data)
      
      if (response.data === true) {
        alert('이미 사용중인 닉네임입니다.');
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 에러 발생:', error);
    }
  };

  const modifyMember = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const requestBody = {
        memberId: userInfo.memberId,
        nickname: nickname, // 사용자가 입력한 새로운 닉네임
        password: password, // 사용자가 입력한 새로운 비밀번호
        memberGrade: selectedGrade, // 선택한 학년
      };
      console.log('닉네임:', nickname)
      console.log('비밀번호:', password)
      console.log("유저 Id:", userInfo.memberId)
      const memberId = userInfo.memberId
      const response = await axios.post(`http://j10c106.p.ssafy.io:8082/users/${memberId}/reset`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 요청 성공 시 로직...
      console.log(response.data);
      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('회원 정보 수정 중 에러 발생:', error);
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleGradeClick = (memberGrade) => {
    setSelectedGrade(memberGrade); // 선택된 학년 상태 업데이트
  };


  // 모달창
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div>
        <div class="profileField">
        <h1 class="profileTitle">회원정보수정</h1>
        <div class="inputemail">
         <input type="text" id="userEmail" name="userEmail" placeholder="이메일 주소" disabled value={ userInfo.email } // 닉네임 입력 상태를 바인딩
          onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div class="inputWithButton">
          <input type="text" id="userId" name="userId" placeholder={ userInfo.nickname } onChange={(e) => setNickname(e.target.value)} />
          <button type="button" id="checkDuplicate" onClick={checkNicknameDuplicate}>중복 확인</button>
          {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>사용가능한 아이디입니다.</p>
          </div>
        </div>
      )}

        </div>
        </div>
        <div className='gradeField'>
            <h3>학년</h3>
            <div className="gradeButtons">
                {[1, 2, 3, 4, 5, 6].map((memberGrade) => (
                <button
                key={memberGrade}
                className={`gradeButton ${selectedGrade === memberGrade ? 'selected' : ''}`}
                onClick={() => handleGradeClick(memberGrade)}
              >
                {memberGrade}학년
              </button>
                ))}
            </div>
        </div>
        <div class="profileField">
            <div class="inputemail">
            <input type="text" id="userPassword" name="userPassword" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="inputemail">
            <input type="text" id="userPassword" name="userPassword" placeholder="비밀번호 확인" />
            </div>
        </div>
        <div className='background-orange profile-box' onClick={modifyMember}>
          수정하기
        </div>
    </div>
  );
}

export default Profile;
