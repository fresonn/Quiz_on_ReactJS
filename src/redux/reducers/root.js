import {combineReducers} from 'redux'

import quizListReducer from './quizList'
import quizComponentReducer from './QuizComponent'
import QuizCreatorComponent from './QuizCreatorComponent'

export default combineReducers({
    quizList: quizListReducer,
    QuizComponent: quizComponentReducer,
    QuizCreator: QuizCreatorComponent
})