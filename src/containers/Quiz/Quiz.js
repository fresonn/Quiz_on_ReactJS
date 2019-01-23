import React, {Component} from 'react'
import classes from './Quiz.css'


import CurrentQuestion from '../../components/CurrentQuestion/CurrentQuestion'
import FinishedQuiz from '../../components/Modal/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

// redux
import {connect} from 'react-redux'
import {fetchQuizByID} from '../../redux/actions/QuizCompActionsCreator'


const Quiz = class extends Component {


    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) { // если есть хоть что-то!
            const key = Object.keys(this.state.answerState)[0] // там и так 1 поле c id вопроса
            if (this.state.answerState[key] === 'success') {
                return; 
                // если уже был правильный ответ, выходим из onAnswerClickHandler
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {

            if(!results[question.id]) { // при пером клике, когда ничего нет или правильно
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {
                    [answerId]: 'success',
                    results
                }
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null //при переходе на новый вопрос обнуляю стили для ... state ?...
                    })
                }

                window.clearTimeout(timeout) // на каждом вопросе снимаем таймер
            }, 500)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {
                    [answerId]: 'error',
                    results
                }
            })
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {} // но не null
        })
    }

    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    render() {
        // console.log('Quiz', this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {  this.props.loadingQuiz ?
                        <div className={classes.loaderWrapper}>
                            <Loader /> 
                        </div> :
                         this.props.isFinished 
                         ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                         />
                         :
                        <CurrentQuestion 
                            nameQuiz={this.props.nameQuiz}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
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
        fetchQuiz: QuizId => dispatch(fetchQuizByID(QuizId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)