import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../../UI/BUTTONS/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = (props) => {
    // &#10004; ✔
    //&#10008; ✘
    // false ? '✔' : '✘'

    const {quiz, results, onRetry} = props

    const trueAnswerCount = Object.values(results).reduce((count, answer) => { //["error", "success", "error"] ES8
        if (answer === 'success') {
            count++
        }
        return count
    }, 0) 
    console.log(Object.values(results))

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { quiz.map((quizItem, ind) => {
                    // const iconStyle = []
                    return (
                        <li key={ind}>
                            <strong>{ind + 1}.</strong>&nbsp;
                            { quizItem.question + '?' }
                            <i className={(results[quizItem.id]) === 'success' ? classes.successAnswer : classes.errorAnswer}/> 
                        </li>
                    )
                }) }
            </ul>
            <p>Правильно {trueAnswerCount} из {quiz.length}</p>
            <div>
                <Button onClick={onRetry} classFor={'finishQuiz'}>повтор</Button>
                <Link to={'/'}>
                    <Button classFor={'finishQuiz'}>Все тесты</Button>
                </Link>
            </div>
        </div>
    )
}


export default FinishedQuiz