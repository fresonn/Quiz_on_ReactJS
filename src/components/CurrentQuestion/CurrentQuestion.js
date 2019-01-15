import React from 'react'
import classes from './CurrentQuestion.css'
import AnswersList from './AnswersList/AnswersList'


const CurrentQuestion = (props) => {
    const { answers, question, onAnswerClick, quizLength, answerNumber, state } = props

    return (
        <div className={classes.CurrentQuestion}>
            <p className={classes.Question}>
                <span>
                    <strong>{answerNumber}.</strong>&nbsp;
                    { question + '?' }
                </span>
                <small>{answerNumber} из {quizLength}</small>
            </p>
            <AnswersList
                state={state}
                answers={answers}
                onAnswerClick={onAnswerClick}
            />
        </div>
    )
}


export default CurrentQuestion