import React from 'react'
import classes from './Button.css'


const Button = (props) => {
    const {onClick, disabled, classFor, linkRef} = props
    

    return (
        <button
            className={classes[classFor]}
            onClick={onClick}
            disabled={disabled} // true || false
            ref={linkRef}
        >
            {props.children}
        </button>
    )
}



export default Button