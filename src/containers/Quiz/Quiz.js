import React, {Component} from 'react'
import classes from './Quiz.css'


import CurrentQuestion from '../../components/CurrentQuestion/CurrentQuestion'
import FinishedQuiz from '../../components/Modal/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

import {connect} from 'react-redux'

// import DATA from '../../jsons/dfquestion.json' //default question for user 

import fetchQuizById, {quizAnswerClick, retryQuiz} from '../../redux/actions/quizCreatorAction'




const Quiz = class extends Component {

    // state = {
    //     nameQuiz: '',
    //     isFinished: false,
    //     results: {}, //{ [id]: 'success' || 'error' } - тесты
    //     activeQuestion: 0,
    //     answerState: null, //{ [id]: 'success' || 'error' }
    //     quiz: [], //parsed json
    //     loading: false
    // }

    

    
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuizHandler()
    }
    
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {/* <h1>Тест по JavaScript</h1> */}
                    {  !this.props.loading ?
                        <div className={classes.loaderWrapper}>
                            <Loader /> 
                        </div> :
                         this.props.isFinished 
                         ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuizHandler}
                         />
                         :
                        <CurrentQuestion 
                            nameQuiz={this.props.nameQuiz}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.onAnswerClickHandler}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1} // с 1
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nameQuiz: state.quiz.nameQuiz,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        onAnswerClickHandler: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuizHandler: () => dispatch(retryQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)