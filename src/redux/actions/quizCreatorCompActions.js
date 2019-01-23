import {QuizCreatorComponent as Creator} from '../actions/actionTypes'

import axios from '../../axios/axios-conf'




export const addQuestionItem = (item) => {
    console.log(item)
    return {
        type: Creator.CREATE_QUIZ_QUESTION,
        payload: item
    }
}


export const clickOnCreateQuiz = () => {
    return {
        type: Creator.CREATOR_QUIZ_READY
    }
}

const resetQuizCreator = () => {
    return {
        type: Creator.CREATOR_RESET_DATA
    }
}

export const sendingQuiz = (value) => {
    return async (dispatch, getState) => {
        await axios.post('/quiz.json', {
            name: value,
            quiz: getState().QuizCreator.quiz
        })
        dispatch(resetQuizCreator())
    }
}