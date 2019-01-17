import React, { Component } from 'react'
import classes from './QuizList.css'

import {NavLink} from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'

const QuizList = class extends Component {

    state = {
        quizes: [],
        loading: true
    }


    renderQuizes() {
        return this.state.quizes.map((quiz, ind) => {
            return (
                <li key={ind}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const resp = await axios.get('https://quiz-f3332.firebaseio.com/quiz.json')
            // console.log(resp.data)
            const quizes = Object.keys(resp.data).reduce((arr, key) => {
                console.log(key)
                arr.push({
                    id: key,
                    name: resp.data[key].name
                })
                return arr
            }, [])

            this.setState({ quizes, loading: false })

        } catch(error) {
            console.log(error)
        }
    }
    
    render() {

        const x = (
                <ul>
                    { this.renderQuizes() }
                </ul>
        )


        return (
            <div className={classes.QuizList}>
                <div>
                    <h1 className={classes.MainTitle}>Мои викторины</h1>
                    <div className={classes.QuizListWrapper}>
                        { this.state.loading ? <Loader /> : x }
                    </div>
                </div>
            </div>
        )
    }
}


export default QuizList