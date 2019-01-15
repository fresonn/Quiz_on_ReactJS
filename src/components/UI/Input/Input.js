import React from 'react'
import classes from './input.css'







const Input = (props) => {
    const {labelText, inputType, inpValue, onChange, errorMessage, valid, shouldValidate, touched} = props

    const isInvalid = () => {
        return !valid && shouldValidate && touched
    }

    const cls = [
        classes.Input
    ]
    if (isInvalid(props)) {
        cls.push(classes.Invalid)
    }

    const ligamentLabel = `${inputType}-${Math.random()}` // вот такой вид связки

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={ligamentLabel}>{labelText}</label>
            <input
                type={inputType}
                id={ligamentLabel}
                value={inpValue}
                onChange={onChange}
            />
            { isInvalid() ? <span>{errorMessage || 'Введите верное значение'}</span> : null }
        </div>
    )
}

Input.defaultProps = {
    inputType: 'text'
}


export default Input