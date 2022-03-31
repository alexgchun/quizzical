# quizzical

Using useEffect, the app requests an object containing 5 questions from Open Trivia Database and stores it into state (allQuestions)
Then, there is another useEffect that listens for the allQuestions state. It's function is to randomize the answers .forEach() question, and save it into another state called allAnswers.

challenges
index, class, decode html entities

what is the handle change index?
event target value mabye?

input => checked comes from the formData


onchange, when true 0 it clicked, true is now at the 0 index of formData
for each question we pass props of formData[index] 
for question 1 formData index is true (formData[0])
so for the answers, true or false
checked = {props.formData === answer}
checked = {props.formData === true} this would boolean true so it is checked blue
checked = {props.formData === false}
