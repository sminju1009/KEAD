import React, { useState } from 'react';
import './Profile.css'
import useModal from '../../hooks/useModal';
function Profile() {

  const [selectedGrade, setSelectedGrade] = useState(null);

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade); // 선택된 학년 상태 업데이트
  };

  // 모달창
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div>
        <div class="profileField">
        <h1 class="profileTitle">회원정보수정</h1>
        <div class="inputemail">
         <input type="text" id="userEmail" name="userEmail" placeholder="이메일 주소" disabled value="user@example.com" />
        </div>
        <div class="inputWithButton">
          <input type="text" id="userId" name="userId" placeholder="아이디를 입력하세요" />
          <button type="button" id="checkDuplicate" onClick={openModal}>중복 확인</button>
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
                {[1, 2, 3, 4, 5, 6].map((grade) => (
                <button
                key={grade}
                className={`gradeButton ${selectedGrade === grade ? 'selected' : ''}`}
                onClick={() => handleGradeClick(grade)}
              >
                {grade}학년
              </button>
                ))}
            </div>
        </div>
        <div class="profileField">
            <div class="inputemail">
            <input type="text" id="userPassword" name="userPassword" placeholder="비밀번호" />
            </div>
            <div class="inputemail">
            <input type="text" id="userPassword" name="userPassword" placeholder="비밀번호 확인" />
            </div>
        </div>
        <div className='background-orange profile-box'>
          수정하기
        </div>
    </div>
  );
}

export default Profile;
