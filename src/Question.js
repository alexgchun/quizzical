import React from 'react';

import { decode } from 'html-entities';
import {nanoid} from 'nanoid';
import "./Quiz.css"

export default function Question(props) {
const answerElements = props.answers.map((answer, answerIndex) => {
return (
    <div
    className="answer"
    key={nanoid()}//mapped needs key
    >
        <input
        type="radio"
        name={props.questionIndex}//dont think this matters
        id={`${props.questionIndex}-${answerIndex}`}//0-0, 1-1, etc
        value={answer}
        checked={props.formData === answer} //if true, then checked
        onChange={props.handleChange}
        className="input"
        disabled={props.finished}// if true, then can't click
        />
        <label
        htmlFor={`${props.questionIndex}-${answerIndex}`}//for the id
        className={`label ${props.finished && answer === props.question.correct_answer ? "true" : ""}`}//logic if game finished and answer = props.question.correct_answer
        >
        {decode(answer)} 
        </label>
    </div>
) 
})

    return (
        <div>
            <h1 className="questions">{decode(props.question.question)}</h1>
            <form className="answer-container">
             {answerElements}
             
            </form>
        </div>
    )
}