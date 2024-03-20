import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import BookRecommendation from './components/main/BookRecommendation';
import DailyQuote from './components/main/DailyQuote';
import LowerGradesBookPick from './components/main/LowerGradesBookPick';
import BookDetail from './components/book/BookDetail';
import Navbar from './components/navbar/Navbar';
import Mypage from './components/mypage/Mypage'
import BookPrefer from './components/book/BookPrefer';
import BookShelf from './components/book/BookShelf';
import MyRank from './components/rank/Rank';
import Profile from './components/mypage/Profile';


function App() {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 배경색 설정
    document.body.style.backgroundColor = "#FBF5F2";
  })
  return (
    <BrowserRouter>
      <Navbar />
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <>
              <BookRecommendation />
              <DailyQuote />
              <LowerGradesBookPick />
            </>
          }/>
          <Route path="/book-detail" element={<BookDetail />} />
          <Route path='/mypage' element={<Mypage/>} />
          <Route path='/mybook-shelf' element={<BookShelf/>} />
          <Route path='/mybook-prefer' element={<BookPrefer/>} />
          <Route path='/' element={<App/>} />
          <Route path='/rank' element={<MyRank/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
