import {combineReducers} from 'redux'

import quizListReducer from './quizList'
import QuizComponentReducer from './quizReducer'


export default combineReducers({
    quizList: quizListReducer,
    quiz: QuizComponentReducer
})