import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  
  const goToMyPage = () => {
    navigate('/mypage')
  }

 const goToMyBookShelf = () => {
  navigate('/mybook-shelf')
 }

 const goToMyPreferBook= () => {
  navigate('/mybook-prefer')
 }

 const goToMyHome= () => {
  navigate('/')
 }

 const goToMyRank= () => {
  navigate('/rank')
 }

  return (
    <nav className='navbar'>
      <div className='background-orange book-recommendation-box'>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/">
              <img></img>
            </Link>
          </li>
          <li style={{ display: "inline" }}>
            <img
            className='mybookpreferImage'
            alt='mybookpreferImage'
            src='img/icon_heart.png'
            onClick={goToMyPreferBook}
            >
            </img>
          </li>
          

          <li style={{ display: "inline" }}>
            <img
            className='mybookshelfImage'
            alt='mybookShelfImage'
            src='img/icon_book.png'
            onClick={goToMyBookShelf}
            >
            </img>
          </li>


          <li style={{ display: "inline" }}>
            <img
            className='mybookshelfImage'
            alt=''
            src='img/icon_home.png'
            onClick={goToMyHome}
            >
            </img>
          </li>


          <li style={{ display: "inline" }}>
            <img
            className='mybookshelfImage'
            alt=''
            src='img/icon_rank.png'
            onClick={goToMyRank}
            >
            </img>
          </li>


          <li style={{ display: "inline" }}>
            <img
            className='mypageImage'
            alt=''
            src='img/icon_setting_.png'
            onClick={goToMyPage}
            >
            </img>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
