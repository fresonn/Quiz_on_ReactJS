import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'



const AnswersList = (props) => {
    // получит массив возможных ответов
    const { answers, onAnswerClick, state } = props
    return (
        <ul className={classes.AnswersList}>
            { answers.map((answer, ind) => {
                return (
                    <AnswerItem
                        key={ind} 
                        answer={answer}
                        onAnswerClick={onAnswerClick}
                        state={state ? state[answer.id]: null} // null -> false
                    />
                )
            }) }
        </ul>
    )
}


export default AnswersList