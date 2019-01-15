import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'

const App = class extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path={'/auth'} component={Auth}/>
                    <Route path={'/quiz-creator'} component={QuizCreator}/>
                    <Route path={'/quiz/:id'} component={Quiz}/>
                    <Route path={'/'} component={QuizList}/>
                </Switch>
            </Layout>
        )
    }
}


const Application = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)


ReactDOM.render(
    Application,
    document.querySelector('#root')
)