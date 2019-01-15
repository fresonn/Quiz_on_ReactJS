import React from 'react'
import classes from './AnswerItem.css'


const AnswerItem = (props) => {
    const { answer, onAnswerClick, state } = props

    const answerClass = [classes.AnswerItem]

    if (state) {
        answerClass.push(classes[state]) // тут 'error' || 'success'
    }

    return (
        <li 
            className={answerClass.join(' ')} 
            onClick={() => {onAnswerClick(answer.id)}}    
        >
            { answer.text }
        </li>
    )
}


export default AnswerItem