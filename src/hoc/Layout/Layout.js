import React, {Component} from 'react'
import classes from './Layout.css'


import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'



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



export default Layout