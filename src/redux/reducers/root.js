import {combineReducers} from 'redux'

import quizListReducer from './quizList'

export default combineReducers({
    quizList: quizListReducer
})