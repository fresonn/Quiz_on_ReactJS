import axios from '../../axios/axios-conf'
import {quizComponent as Quiz} from './actionTypes'



//                                                          ** Загрузка теста **

const quizStartDownload = (respObject) => {
    return {
        type: Quiz.QUIZ_FETCH_DATA,
        payload: respObject
    }
}

const quizRespError = (err) => {
    return {
        type: Quiz.QUIZ_RESP_ERR,
        err
    }
}

export const fetchQuizByID = (QuizId) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`/quiz/${QuizId}.json`)
                // ждем ответ!
            dispatch(quizStartDownload(resp.data)) // тут name и quiz: [...]
        } catch(error) {
            dispatch(quizRespError(error))
        }
    }
}

//                                                              ** обработка теста **



const quizChangeAnswerState = (answerState, results) => {
    return {
        type: Quiz.QUIZ_NEW_ANSWER_STATE,
        payload: {
            answerState,
            results
        }
    }
}

const finishQuizActionCreator = () => {
    return {
        type: Quiz.QUIZ_FINISH_QUIZ
    }
}

const switchToTheNextQuestion = (currentQuestion) => {
    return {
        type: Quiz.QUIZ_NEXT_QUESTION,
        payload: currentQuestion
    }
}

const isQuizFinished = state => state.activeQuestion + 1 === state.quiz.length


export const quizAnswerClick = (answerId) => {
    return (dispatch, getState) => {

        const state = getState().QuizComponent
        if (state.answerState) { // если есть хоть что-то!
            const key = Object.keys(state.answerState)[0] // там и так 1 поле c id вопроса
            if (state.answerState[key] === 'success') {
                return; 
                // если уже был правильный ответ, выходим из onAnswerClickHandler
            }
        }
    
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
    
        if (question.rightAnswerId === answerId) {
    
            if(!results[question.id]) { // при пером клике, когда ничего нет или правильно
                results[question.id] = 'success'
            }
    
            // this.setState({
            //     answerState: {
            //         [answerId]: 'success',
            //         results
            //     }
            // })

            dispatch(quizChangeAnswerState({ [answerId]: 'success' }, results))
    
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    // this.setState({
                    //     isFinished: true
                    // })
                    dispatch(finishQuizActionCreator())
                } else {
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null //при переходе на новый вопрос обнуляю стили для ... state ?...
                    // })
                    dispatch(switchToTheNextQuestion(state.activeQuestion + 1))
                }
    
                window.clearTimeout(timeout) // на каждом вопросе снимаем таймер
            }, 500)
        } else {
            results[question.id] = 'error'

            // this.setState({
            //     answerState: {
            //         [answerId]: 'error',
            //         results
            //     }
            // })
                // тут все тоже, только error
            dispatch(quizChangeAnswerState({ [answerId]: 'error' }, results))
        }
    }
}


//                                                                **  обнуление теста **


// обнуление перед повтором теста
export const retryQuiz = () => {
    return {
        type: Quiz.QUIZ_RETRY_QUIZ
    }
}