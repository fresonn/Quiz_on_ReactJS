import axios from 'axios'
import {AuthComponent as Auth} from '../actions/actionTypes'


const authSuccess = (token) => {
    return {
        type: Auth.AUTH_SUCCESS_FETCH,
        payload: token
    }
}

const logOut = () => {
        // .clear() - не подойдет, т.к могут быть и другие записи в localStorage!
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('exirationDate')
    return {
        type: Auth.AUTH_LOGOUT
    }
}

const autoLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, time * 1000)
    }
}

export const authCreator = (email, password, isLogin) => {
    return async (dispatch) => {
        const API_KEY = 'AIzaSyDGqLTHCNXKd6eszuSxWakdLAicku1_-so'

        const userAuthData = {
            email, password,
            returnSecureToken: true // true - нужно самой firebase
        }

        let url 

        if (isLogin) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`
        } else {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
        } 

        try {
            const resp = await axios.post(url, userAuthData)
            const data = resp.data
            console.log(data)
                // Сессия длится только час
            const exirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('exirationDate', exirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))

        } catch(error) {
            console.log(error.message)
        }
    }
}