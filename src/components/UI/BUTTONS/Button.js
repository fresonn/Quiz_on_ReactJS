import React from 'react'
import classes from './Button.css'


const Button = (props) => {
    const {onClick, disabled, classFor} = props
    

    return (
        <button
            className={classes[classFor]}
            onClick={onClick}
            disabled={disabled} // true || false
        >
            {props.children}
        </button>
    )
}



export default Button