import React from 'react';

function BookShelf() {
  return (
    <div>
      <h2>나의책장 상세 정보</h2>
      <img 
        className="bookShelfImage"
        alt="" 
        src="img/bookshelf.jpg" 
        style={{
          display: 'block',
          width: 'calc(100% - 20px)',
          marginLeft: '10px',
          marginRight: '10px',
          height: 'auto', // 높이 자동 조정
          borderRadius: '20px', // 모서리 둥글게
        }}
        />
      {/* 상세 정보 내용 */}
    </div>
  );
}

export default BookShelf;
