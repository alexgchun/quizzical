
// import './App.css';
import React from 'react'
import Question from './Question'
import { nanoid } from "nanoid";



function Quiz() { 
  const [questions, setQuestions] = React.useState([])    //DB Object
  const [answers, setAnswers] = React.useState([])        //Arr of arr, randomized answers
  const [formData, setFormData] = React.useState([])      //arr of 5 empty strings, chosen answers
console.log(formData)
  const [finished, setFinished] = React.useState(false)   //check answers button toggles
  const [score, setScore] = React.useState(0)
  const [newGame, setNewGame] = React.useState(false)
  
  React.useEffect(() => {                                 //fetch db object
            async function getQuestions() {
                try { 
                const resp = await fetch(
                    "https://opentdb.com/api.php?amount=5"
                );
                const data = await resp.json();
                setQuestions(data.results);
                } catch (error) {
                console.error(error);
                }
            }
            getQuestions();
           
  },[newGame])

  React.useEffect(() => {                                 //answers arr of arrs, randomized answers

    questions.forEach(question => {
    const answersArr = []
    const randArr = []
      if (question.type === 'boolean') {
        answersArr.push('True', 'False')
      } else {
        randArr.push(question.correct_answer, ...question.incorrect_answers);

        randArr.forEach(function (answer) {
            if (Math.floor(Math.random() * 2 + 1) === 1) {
              answersArr.push(answer);
            } else {
              answersArr.unshift(answer);
            }
        });

      }
      setAnswers(prevAnswers => {
        return [...prevAnswers, answersArr]
      })
       
        setFormData(prevFormData => {
          return [...prevFormData, ""]
        });

    }); 

  }, [questions])

  //sets form state using radio input's value
  function handleChange(event, index) {//index?? question index(0-4)
    const value = event.target.value
    console.log(value, index)
    setFormData(prevFormData => {
      const arr = [...prevFormData];
      arr.splice(index, 1, value);//at index in formData, delete 1, insert value
      return arr
    })
  }
 
  //CHECK ANSWER AND PLAY AGAIN
  function handleButtonClick() {
    if (finished) {
      setFinished(false);
      setScore(0);
      setQuestions([]);
      setAnswers([]);
      setFormData([]);
      setNewGame(prevNewGame => {
        return !prevNewGame
      })
    } else {
      setFinished(true);
      questions.forEach((question, index) => {
        if (formData[index] === question.correct_answer) {
            setScore(prevScore => {
            return prevScore + 1
            })
        }
      })
    }
  } 

  const questionElements = questions.map((question, index) => {
  
    return (
      <Question 
      question={questions[index]}
      questionIndex={index}
      answers={answers[index]}
      finished={finished}
      formData={formData[index]}
      handleChange={(event) => handleChange(event, index)}
      key={nanoid()}//mapped, so need key
      />
    )

  })

  function randomMessage() {
    if (score === 0) {
      return "Who would even know those..."
    } else if (score === 1) {
      return "Well, of course I knew THAT one..."
    } else if (score === 2) {
      return "Pushing P."
    } else if (score === 3) {
      return "Three outta five, time for pie."
    } else if (score === 4) {
      return "Topadamornin'"
    } else {
      return "Excellent."
    }
  }

  if (answers[0]) {return ( 
    <div className="center">
      <div className="container">
        {questionElements}
          <div>
            <button className="button" onClick={handleButtonClick}>
              {finished ? "Play Again" : "Check Answers"}
            </button>
            {finished && (<span className="score">
              You scored  {score} / {questions.length} correct answers! {randomMessage()}
            </span>)}
          </div>
      </div>
    </div>
  );
  } else {
      return (
        <div>
          loading...
        </div>
      )
    }
  }

export default Quiz;