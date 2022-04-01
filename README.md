# Quizzical

Live Site: https://majestic-fenglisu-72dc22.netlify.app/

This is the final solo project of the [Learn React](https://scrimba.com/learn/learnreact) course on Scrimba. The design of the page was provided, however all code has been built from scratch. This project makes use of React components, and React hooks (useState and useEffect). It also makes use of two external react libraries, Nano ID and HTML Entities.

# About 
![ezgif com-gif-maker](https://user-images.githubusercontent.com/90280800/161155489-c137afe5-763d-4c54-a7ae-1a53fbce62aa.gif)

The project aims to create a quiz game that pulls directly from the Open Trivia Database API and gives the user five random questions to answer, then allows you to check your score.

# Built With
- React
- HTML5
- CSS
- Flexbox
- [OpenTriviaDataBase](https://opentdb.com/)

# My Approach
The app consists of two main components, "Questions" and "Quiz". When the Quiz component first loads, useEffect() fetches 5 questions from the trivia API, and stores it into state called questions. Then a second useEffect(), that listens for question state, runs and creates a new state called answers, that consists of an array of arrays, with each array containing the randomized answers. The useEffect() function randomizes the items using this shuffle. 
```
        randArr.forEach(function (answer) {
            if (Math.floor(Math.random() * 2 + 1) === 1) {
              answersArr.push(answer);
            } else {
              answersArr.unshift(answer);
            }
        });
```
Lastly, the function creates a new state called formData, which now holds an array of 5 empty strings.

From there, it maps out 5 Question components and passes in data(states, question data). Each question component displays the question and 5 radio inputs for the answers. Each answer has a onChange function that sets formData to that answer in correct sequence. FormData is then passed down props again, and whichever answer selected will be checked using this logic, in the input,
```
checked={props.formData === answer} 
```
This makes sure only one answer is held in formData, and one answer is selected at a time.

Once the user has selected their answers, handleButtonClick() is ran when they click the 'check answers' button. This function uses formData to determine which answers are correct by comparing it to the correct answer in questions state. The index parameter helps to correctly compare strings.
```
        questions.forEach((question, index) => {
          if (formData[index] === question.correct_answer) {
              setScore(prevScore => {
              return prevScore + 1
              })
        } 
```
Score is then shown, and the 'play again' button resets all states and the useEffect fetches 5 more questions because it listens to the newGame state being updated.
# Challenges
A problem I faced was correctly using the npm package html-entities, and forgot that it was a JavaScript function, and it needed to be surrounded by brackets to now be read as JSX.
```
{decode(answer)}
```

The main hurdle I faced was how to save what the user clicks, and only letting the user select one answer per question. For the latter, I let the checked property on the input be dependent on the formData. The onChange on the input uses the event, and index to correctly place the answer in formData like so. For the former, the callback function in handleChange uses the event object, and the index of the question to place the event.target.value in the correct place in formData using the splice method. 

```
function handleChange(event, index) {//index?? question index(0-4)
    const value = event.target.value
    console.log(value, index)
    setFormData(prevFormData => {
      const arr = [...prevFormData];
      arr.splice(index, 1, value);//at index in formData, delete 1, insert value
      return arr
    })
  }
  
   handleChange={(event) => handleChange(event, index)} <------- props 
   
        checked={props.formData === answer} <------------------- input props in Questions component.
        onChange={props.handleChange}
   
```

# Roadmap
I would like to do something with localStorage in the future, maybe a scoreboard that saves the date and time, as well as what questions and answers where given.
# Acknowledgements
- [Nanoid](https://www.npmjs.com/package/nanoid)
- [HTML Entities](https://www.npmjs.com/package/html-entities)
