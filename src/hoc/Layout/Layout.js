import React, {Component} from 'react'
import classes from './Layout.css'


import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

import {connect} from 'react-redux'


const Layout = class extends Component {

    state = {
        menuIsVisible: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menuIsVisible: !this.state.menuIsVisible
        })
    }

    menuCloseHAndler = () => {
        this.setState({
            menuIsVisible: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menuIsVisible}
                    onClose={this.menuCloseHAndler}
                    isAuthorized={this.props.isAuthorized}
                    
                />
                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menuIsVisible}
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: !!state.Auth.token
    }
}


export default connect(mapStateToProps)(Layout)