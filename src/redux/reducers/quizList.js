import {QuizListActions as A} from '../actions/actionTypes'

const initialState = {
    quizzes: [],
    loading: false,
    error: null
}

const quizListReducer = (state = initialState, action) => {
    switch (action.type) {
        case A.FETCH_QUZZES_START:
            return {
                ...state, loading: true
            }
        case A.FETCH_RESP_DATA:
            return {
                loading: false,
                quizzes: action.payload
            }
        case A.FETCH_ERROR_RESP:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default quizListReducer