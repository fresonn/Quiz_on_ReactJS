import React from 'react'
import classes from './MenuToggle.css'



const MenuToggle = (props) => {
    const {isOpen, onToggle} = props

    const forToggleClass = [
        classes.MenuToggle,
        'fa'
    ];

    if (isOpen) {
        forToggleClass.push('fa-times')
        forToggleClass.push(classes.open)
    } else {
        forToggleClass.push('fa-bars')
    }

    return (
        <b
            className={forToggleClass.join(' ')}
            onClick={onToggle}
        />
    )
}


export default MenuToggle