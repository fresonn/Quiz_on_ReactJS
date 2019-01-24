import {combineReducers} from 'redux'

import quizListReducer from './quizList'
import quizComponentReducer from './QuizComponent'
import QuizCreatorComponent from './QuizCreatorComponent'
import AuthComponent from './AuthReducer'

export default combineReducers({
    quizList: quizListReducer,
    QuizComponent: quizComponentReducer,
    QuizCreator: QuizCreatorComponent,
    Auth: AuthComponent
})