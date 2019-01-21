import React, { Component } from 'react'
import classes from './QuizList.css'

import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'

import {connect} from 'react-redux'


import fetchData from '../../redux/actions/QuizListCreator'


const QuizList = class extends Component {

    // state = {
    //     quizzes: [],
    //     loading: true
    // }


    renderQuizes() {
        return this.props.quizzes.map((quiz, ind) => {
            return (
                <li key={ind}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }
    
    render() {
        const quizzesList = (
                <ul>
                    { this.renderQuizes() }
                </ul>
        )


        return (
            <div className={classes.QuizList}>
                <div>
                    <h1 className={classes.MainTitle}>Мои викторины</h1>
                    <div className={classes.QuizListWrapper}>
                        { this.props.loading  ? <Loader /> : quizzesList }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quizzes: state.quizList.quizzes,
        loading: state.quizList.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)