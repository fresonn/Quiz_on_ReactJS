import React, {Component} from 'react'
import classes from './Quiz.css'
import axios from '../../axios/axios-conf'

import CurrentQuestion from '../../components/CurrentQuestion/CurrentQuestion'
import FinishedQuiz from '../../components/Modal/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

import DATA from '../../jsons/dfquestion.json' //default question for user 




const Quiz = class extends Component {

    state = {
        nameQuiz: '',
        isFinished: false,
        results: {}, //{ [id]: 'success' || 'error' } - тесты
        activeQuestion: 0,
        answerState: null, //{ [id]: 'success' || 'error' }
        quiz: DATA.defaultquiz.quiz, //parsed json
        loading: true
    }

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

    async componentDidMount() {
        // console.log('Quiz id: ', this.props.match.params.id)
        try {
            const resp = await axios.get(`/quiz/${this.props.match.params.id}.json`)
            this.setState({
                nameQuiz: resp.data.name,
                quiz: resp.data.quiz,
                loading: false
            })
        } catch(error) {
            console.log(error.message)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    {/* <h1>Тест по JavaScript</h1> */}
                    {  this.state.loading ?
                        <div className={classes.loaderWrapper}>
                            <Loader /> 
                        </div> :
                         this.state.isFinished 
                         ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                         />
                         :
                        <CurrentQuestion 
                            nameQuiz={this.state.nameQuiz}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1} // с 1
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}


export default Quiz