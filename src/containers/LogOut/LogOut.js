import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {logOut} from '../../redux/actions/AuthActions'


const LogOut = class extends Component {

    componentDidMount() {
        this.props.logoot()
    }
    

    render() {
        return <Redirect to={"/"} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logoot: () => dispatch(logOut())
    }
}


export default connect(null, mapDispatchToProps)(LogOut)