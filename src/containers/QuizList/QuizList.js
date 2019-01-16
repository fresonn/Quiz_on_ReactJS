import React, { Component } from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const QuizList = class extends Component {

    state = {
        quizes: []
    }


    renderQuizes() {
        return this.state.quizes.map((quiz, ind) => {
            return (
                <li key={ind}>
                    <NavLink to={'/quiz/' + quiz}>
                        {ind + 1}. {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const resp = await axios.get('https://quiz-f3332.firebaseio.com/quiz.json')
            const quizes = Object.keys(resp.data).reduce((arr, key, ind) => {
                arr.push({
                    id: key,
                    name: `Тест №${ind}`
                })
                return arr
            }, [])

            this.setState({ quizes })

        } catch(error) {
            console.log(error)
        }
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