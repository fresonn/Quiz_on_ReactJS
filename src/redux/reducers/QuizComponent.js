import {quizComponent as Quiz} from '../actions/actionTypes'

const initState = {
    nameQuiz: '',
    isFinished: false,
    results: {}, //{ [id]: 'success' || 'error' } - тесты
    activeQuestion: 0,
    answerState: null, //{ [id]: 'success' || 'error' }
    quiz: [], //parsed json
    loadingQuiz: true,
    // fetchError: false // ***
}


export default (state = initState, action) => {
    switch (action.type) {
        case Quiz.QUIZ_FETCH_DATA:
            return {
                ...state,
                nameQuiz: action.payload.name,
                quiz: action.payload.quiz,
                loadingQuiz: false
            }
        case Quiz.QUIZ_RESP_ERR:
            return {
                ...state,
                // fetchError: true // ***
            }
        case Quiz.QUIZ_NEW_ANSWER_STATE:
            return {
                ...state,
                answerState: action.payload.answerState,
                results: action.payload.results
            }
        case Quiz.QUIZ_FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case Quiz.QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestion: action.payload
            }
        case Quiz.QUIZ_RETRY_QUIZ:
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