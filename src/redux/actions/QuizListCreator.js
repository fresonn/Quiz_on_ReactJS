import axios from '../../axios/axios-conf'
import {QuizListActions as A} from './actionTypes'

export const fetchQuizzesStart = () => {
    return {
        type: A.FETCH_QUZZES_START
    }
}



export const fetchQuizzesRespData = (quizzes) => {
    return {
        type: A.FETCH_RESP_DATA,
        payload: quizzes
    }
}

export const fetchRespError = (error) => {
    return {
        type: A.FETCH_ERROR_RESP,
        error
    }
}

export default () => {
    return async dispatch => {
        dispatch(fetchQuizzesStart())
        try {
            const resp = await axios.get('/quiz.json')
            const quizzes = Object.keys(resp.data).reduce((arr, key) => {
                console.log(key)
                arr.push({
                    id: key,
                    name: resp.data[key].name
                })
                return arr
            }, [])

            dispatch(fetchQuizzesRespData(quizzes))

        } catch(error) {
            dispatch(fetchRespError(error))
        }
    }
}