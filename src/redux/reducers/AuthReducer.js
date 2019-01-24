import {AuthComponent as Auth} from '../actions/actionTypes'

const initState = {
    token: null
}


export default (state = initState, action) => {
    switch (action.type) {
        case Auth.AUTH_SUCCESS_FETCH:
            return {
                ...state,
                token: action.payload
            }
        case Auth.AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}