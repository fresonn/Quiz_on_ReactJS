import React, { Component } from 'react';

import {Switch, Route, withRouter, Redirect} from 'react-router-dom'


import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import LogOut from './containers/LogOut/LogOut'


import {connect} from 'react-redux'
import {autoLogin} from './redux/actions/AuthActions'

const App = class extends Component {

    componentDidMount() {
        this.props.autoLogin() // если конечно localStorage не пуст
    }

    render() {

        let availableRoutes = (
            <Switch>
                <Route path={'/auth'} component={Auth}/>
                <Route path={'/quiz/:id'} component={Quiz}/>
                <Route path={'/'} exact component={QuizList}/>
                <Redirect to={'/'} />
            </Switch>
        )

        if (this.props.isAuthorized) {
            availableRoutes = (
                <Switch>
                    <Route path={'/quiz-creator'} component={QuizCreator}/>
                    <Route path={'/quiz/:id'} component={Quiz}/>
                    <Route path={'/logout'} component={LogOut} />
                    <Route path={'/'} exact component={QuizList}/>
                    <Redirect to={'/'} />
                </Switch>
            )
        }

        return (
            <Layout>
                { availableRoutes }
            </Layout>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        isAuthorized: !!state.Auth.token
    }
}

const mapDispatchToPRops = (dispatch) => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToPRops)(App))