import {QuizCreatorComponent as Creator} from '../actions/actionTypes'

const initState = {
    quiz: [],
    isQuizReady: false
}


export default (state = initState, action) => {
    switch (action.type) {
        case Creator.CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.payload]
            }
        case Creator.CREATOR_QUIZ_READY:
            return {
                ...state,
                isQuizReady: true
            }
        case Creator.CREATOR_RESET_DATA:
            return {
                ...state,
                quiz: [],
                isQuizReady: false
            }
        default:
            return state
    }
}