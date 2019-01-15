import React, { Component } from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const QuizList = class extends Component {


    renderQuizes() {
        return [ 1, 2, 3 ].map((quiz, ind) => {
            return (
                <li key={ind}>
                    <NavLink to={'/quiz/' + quiz}>
                        Тест №{quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://quiz-f3332.firebaseio.com/quiz.json')
            .then(resp => console.log(resp))
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        { this.renderQuizes() }
                    </ul>
                </div>
            </div>
        )
    }
}


export default QuizList