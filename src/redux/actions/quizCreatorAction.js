import {QuizComponentActions as A} from './actionTypes'
import axios from '../../axios/axios-conf'

// начало загрузки
export const fetchQuizStart = () => {
    return {
        type: A.START_FETCH_QUIZ
    }
}
// загрузка
export const quizResponseData = (quiz) => {
    return {
        type: A.QUIZ_RESP_DATA,
        payload: quiz
    }
}
// если есть ошибка!
export const fetchRespError = (error) => {
    return {
        type: A.QUIZ_FETCH_ERROR,
        error
    }
}

export const resultAnswerState = (answerState, results) => {
    return {
        type: A.QUIZ_RESULT_ANSWER_STATE,
        payload: {
            answerState, results
        }
    }

}

export const finishQuiz = () => {
    return {
        type: A.QUIZ_FINISH_QUIZ
    }
}

export const quizNextQuestion = (questionNumber) => {
    return {
        type: A.QUIZ_NEXT_QUESTION,
        payload: questionNumber
    }
}

const isQuizFinished = (state) => {
    return state.activeQuestion + 1 === state.quiz.length
}

const fetchQuizById = (quizId) => {
    return async (dispatch) => {
        dispatch(fetchQuizStart())
        try {
            const resp = await axios.get(`/quiz/${quizId}.json`)
            const quiz = resp.data.quiz
            console.log(quiz)
            dispatch(quizResponseData(quiz))
        } catch(error) {
            dispatch(fetchRespError(error))
        }
    }
}

export const quizAnswerClick = (answerId) => {
    return (dispatch, getState) => {
        const state = getState().quiz
        console.log(state)
        if (this.state.answerState) { // если есть хоть что-то!
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

            dispatch(resultAnswerState({
                [answerId]: 'success',
                results
            }))
            

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null //при переходе на новый вопрос обнуляю стили для ... state ?...
                    // })
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                window.clearTimeout(timeout) // на каждом вопросе снимаем таймер
            }, 500)
        } else {
            results[question.id] = 'error'
            dispatch(resultAnswerState({
                [answerId]: 'error',
                results
            }))
        }
    }
}

export const retryQuiz = () => {
    return {
        type: A.QUIZ_RETRY_BUTTON_CLICK
    }
}



export default fetchQuizById



