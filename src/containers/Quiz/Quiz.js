import React, {Component} from 'react'
import classes from './Quiz.css'


import CurrentQuestion from '../../components/CurrentQuestion/CurrentQuestion'
import FinishedQuiz from '../../components/Modal/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

// redux
import {connect} from 'react-redux'
import {fetchQuizByID, quizAnswerClick, retryQuiz} from '../../redux/actions/QuizCompActionsCreator'


const Quiz = class extends Component {



    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    componentWillUnmount = () => {
        // При окончании теста его состояние сохранится, и по этому его нужно обнулить!
        this.props.retryHandler()
    }
    

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {  this.props.loadingQuiz ?
                        <div className={classes.loaderWrapper}>
                            <Loader /> 
                        </div> :
                         this.props.isFinished 
                         ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryHandler}
                         />
                         :
                        <CurrentQuestion 
                            nameQuiz={this.props.nameQuiz}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.answerClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1} // с 1
                            state={this.props.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nameQuiz: state.QuizComponent.nameQuiz,
        isFinished: state.QuizComponent.isFinished,
        results: state.QuizComponent.results,
        activeQuestion: state.QuizComponent.activeQuestion,
        answerState: state.QuizComponent.answerState, 
        quiz: state.QuizComponent.quiz, 
        loadingQuiz: state.QuizComponent.loadingQuiz
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuiz: QuizId => dispatch(fetchQuizByID(QuizId)),
        answerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryHandler: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)