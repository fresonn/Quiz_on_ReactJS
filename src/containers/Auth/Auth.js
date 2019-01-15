import React, {Component} from 'react'
import classes from './Auth.css'
import is from 'is_js'

import Button from '../../components/UI/BUTTONS/Button'
import Input from '../../components/UI/Input/Input'

const Auth = class extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите правильный email',
                valid: false, // state валидации
                touched: false,
                validation: {
                    required: true,
                    email: true
                }

            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите правильный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 7
                }
            }

        }
    }


    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) return true
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {


        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] } // без мутации

        control.value = event.target.value
        control.touched = true // сразу 
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        // нужно узнать валидность каждого input
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
            // если было и есть валидное полу
        })

        this.setState({
            formControls,
            isFormValid
        })
    }

    renderInputs() {

        return Object.values(this.state.formControls).map((control, ind) => {
            const controlName = Object.keys(this.state.formControls)[ind]
            return (
                <Input 
                    key={control.type + ind}
                    inputType={control.type}
                    inpValue={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    labelText={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    placeholderText={''}


                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        { this.renderInputs() }
                        <div className={classes.BtnWrapper}>
                            <Button
                                classFor={'AuthButton'}
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                                // не валид. значит true
                            >Войти</Button>
                            <Button
                                classFor={'AuthButton'}
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                            >Зарегистрироваться</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}




export default Auth