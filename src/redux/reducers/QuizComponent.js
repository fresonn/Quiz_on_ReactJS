import {quizComponent as Quiz} from '../actions/actionTypes'

const initState = {
    nameQuiz: '',
    isFinished: false,
    results: {}, //{ [id]: 'success' || 'error' } - тесты
    activeQuestion: 0,
    answerState: null, //{ [id]: 'success' || 'error' }
    quiz: [], //parsed json
    loadingQuiz: true
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
        default:
            return state
    }
}