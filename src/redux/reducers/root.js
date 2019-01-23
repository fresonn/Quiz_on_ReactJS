import {combineReducers} from 'redux'

import quizListReducer from './quizList'
import quizComponentReducer from './QuizComponent'

export default combineReducers({
    quizList: quizListReducer,
    QuizComponent: quizComponentReducer
})