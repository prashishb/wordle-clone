import React, { useState, useEffect } from 'react';
import { wordList } from './constants/data';

function App() {
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem('board-data'))
  );
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArr, setCharArr] = useState([]);

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArr = boardData.presentCharArr;
    let absentCharArr = boardData.absentCharArr;
    let correctCharArr = boardData.correctCharArr;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;
    for (let i = 0; i < word.length; i++) {
      if (solution.charAt(i) === word.charAt(i)) {
        matchCount++;
        rowStatus.push('correct');
        if (!correctCharArr.includes(word.charAt(i)))
          correctCharArr.push(word.charAt(i));
        if (presentCharArr.indexOf(word.charAt(i)))
          presentCharArr.splice(presentCharArr.indexOf(word.charAt(i), 1));
      } else if (solution.includes(word.charAt(i))) {
        rowStatus.push('present');
        if (
          !correctCharArr.includes(word.charAt(i)) &&
          !presentCharArr.includes(word.charAt(i))
        )
          presentCharArr.push(word.charAt(i));
      } else {
        rowStatus.push('absent');
        if (!absentCharArr.includes(word.charAt(i)))
          absentCharArr.push(word.charAt(i));
      }
    }
    if (matchCount === 5) {
      status = 'WIN';
      handleMessage('You won the game');
    } else if (rowIndex + 1 === 6) {
      status = 'LOST';
      handleMessage(boardData.solution);
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {
      ...boardData,
      boardWords,
      boardRowStatus,
      rowIndex: rowIndex + 1,
      status,
      presentCharArr,
      absentCharArr,
      correctCharArr,
    };
    setBoardData(newBoardData);
    localStorage.setItem('board-data', JSON.stringify(newBoardData));
  };

  const handleKeyPress = (key) => {
    if (boardData.rowIndex > 5 || boardData.status === 'WIN') return;
    if ((key = 'ENTER')) {
      if (charArr.length === 5) {
        let word = charArr.join('').toLowerCase();
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage('Not in word list');
          return;
        }
        enterBoardWord(word);
        setCharArr([]);
      } else {
        handleMessage('Not enough characters');
      }
    }
    if (key === '⌫') {
    }
  };

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
