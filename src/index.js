import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'


import App from './App'

// redux
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/root'
import thunk from 'redux-thunk'


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose



const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


const Application = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(
    Application,
    document.querySelector('#root')
)