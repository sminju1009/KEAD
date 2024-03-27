import React from 'react';
import './Rank.css'
function MyRank() {
  return (
    <div>
      <h2 className="pageTitle">
        <span style={{ color: '#EB9F4A' }}>K</span>
        <span style={{ color: '#77B29F' }}>E</span>
        <span style={{ color: '#AB70DF' }}>A</span>
        <span style={{ color: '#6884F6' }}>D</span>
      </h2>
      <div className='background-orange rank-box'>
        독서 마라톤
      </div>
      <div className="rank-container">
        <img src='img/people.png' alt="Rank" style={{ width: '50px', height: '70px' }} className="rank-image"/>
        <div className='background-orange rank-box2'>
          호날두님 1.543m<br/>
          신창초등학교 1.8km
        </div>
      </div>
    </div>
  );
}

export default MyRank;