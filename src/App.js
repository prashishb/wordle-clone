import React, { useState, useEffect } from 'react';
import { wordList } from './constants/data';

function App() {
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem('board-data'))
  );
  const [charArr, setCharArr] = useState([]);

  useEffect(() => {
    if (!boardData || !boardData.solution) {
      let alphabetIndex = Math.floor(Math.random() * 26);
      let wordIndex = Math.floor(
        Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
      );
      let newBoardData = {
        ...boardData,
        solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
        rowIndex: 0,
        boardWords: [],
        boardRowStatus: [],
        presentCharArr: [],
        absentCharArr: [],
        correctCharArr: [],
        status: 'IN_PROGRESS',
      };
      setBoardData(newBoardData);
      localStorage.setItem('board-data', JSON.stringify(newBoardData));
    }
  }, []);

  return <div>Hello</div>;
}

export default App;
