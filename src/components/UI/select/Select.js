import React from 'react'
import classes from './Select.css'


const Select = props => {

    const {label, value, onChange, options} = props

    const ligamentLabel = `${label}_${Math.random()}`

    return (
        <div className={classes.Select}>
            <label htmlFor={ligamentLabel}>{label}</label>
            <select
                id={ligamentLabel}
                value={value}
                onChange={onChange}
            >
                { options.map((option, ind) => {
                    return (
                        <option value={option.value} key={option.value + ind}>
                            { option.text }
                        </option>
                    )
                }) }
            </select>
        </div>
    )
}


export default Select