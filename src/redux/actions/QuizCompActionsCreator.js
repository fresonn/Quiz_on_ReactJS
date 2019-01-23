import axios from '../../axios/axios-conf'
import {quizComponent as Quiz} from './actionTypes'

const quizStartDownload = (respObject) => {
    return {
        type: Quiz.QUIZ_FETCH_DATA,
        payload: respObject
    }
}


export const fetchQuizByID = (QuizId) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`/quiz/${QuizId}.json`)
                // ждем ответ!
            dispatch(quizStartDownload(resp.data))
        } catch(error) {
            console.log(error.message)
        }
    }
}