import axios from 'axios'

export default axios.create({
    baseURL: 'https://quiz-f3332.firebaseio.com/'
})