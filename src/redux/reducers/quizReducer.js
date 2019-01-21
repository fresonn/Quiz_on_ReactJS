import {QuizComponentActions as A} from '../actions/actionTypes'

const initialState = {
    nameQuiz: '',
    isFinished: false,
    results: {}, //{ [id]: 'success' || 'error' } - тесты
    activeQuestion: 0,
    answerState: null, //{ [id]: 'success' || 'error' }
    quiz: [],
    loading: false
}


const QuizComponentReducer = (state = initialState, action) => {
    switch (action.type) {
        case A.START_FETCH_QUIZ:
            return {
                ...state, loading: true
            }
        case A.QUIZ_RESP_DATA:
            return {
                ...state,
                loading: false,
                quiz: action.payload
            }
        case A.QUIZ_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case A.QUIZ_RESULT_ANSWER_STATE:
            return {
                ...state,
                answerState: action.payload.answerState,
                results: action.payload.results
            }
        case A.QUIZ_FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case A.QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestion: action.payload
            }
        case A.QUIZ_RETRY_BUTTON_CLICK:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        default:
            return state
    }
}


export default QuizComponentReducer