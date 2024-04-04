import React from 'react';
import { Link } from 'react-router-dom';

function Rank() {
  // 예시 데이터, 실제 데이터는 API 호출을 통해 가져옵니다.
  const books = [
    { id: 1, title: '책 1' },
    { id: 2, title: '책 2' },
    // 나머지 책 데이터 추가...
  ];

  return (
    <div>
      <h1>책 랭킹</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/rank/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rank;
