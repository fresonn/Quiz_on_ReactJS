import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'


import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label: 'Список', exact: true },
    {to: '/auth', label: 'Авторизация', exact: false },
    {to: '/quiz-creator', label: 'Создать тест', exact: false }
]

const Drawer = class extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <>
            <nav className={cls.join(' ')}>
                <ul>
                    { links.map((link, ind) => {
                        return (
                            <li key={ind}>
                                <NavLink
                                    to={link.to}
                                    exact={link.exact}
                                    activeClassName={classes.active}
                                    // при выборе ссылки drawer уходит
                                    onClick={this.clickHandler}
                                >{link.label}</NavLink>
                            </li>
                        )
                    }) }
                </ul>
            </nav>
            { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null } 
            </>
        )
    }
}


export default Drawer