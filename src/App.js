import React from 'react';
import Quiz from './Quiz'
import './Quiz.css'

export default function App() {
  //First page toggle

  const [start, setStart] = React.useState(false);

function handleClick() {
  setStart(true);
}

  return (
    <main>
      {!start && (
      <div className='landing-page'>
        <h1>Quizzical</h1>
        <p>5 questions to test your trivia skills!</p>
      <button onClick={handleClick}>Start Game</button>
      </div>
      
      )}
      {start && <Quiz />}
    </main>
  )
}