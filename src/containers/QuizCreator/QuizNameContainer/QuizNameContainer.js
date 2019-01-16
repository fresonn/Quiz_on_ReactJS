import React, {Component} from 'react'
import classes from './QuizNameContainer.css'

// import {createControl} from '../../../formWatcher/formWatcher'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/BUTTONS/Button'

// const createOptionControl = () => {
//     return createControl({
//         label: 'Теперь нужно дать название этой викторине!',
//         errorMessage: 'Имя не может быть пустым'
//     })
// }

const QuizNameContainer = class extends Component {

    state = {
        value: '',
        inputMaxLength: 40,
        invalidName: true
    }

    inputOnChangeHandler = (event) => {
        // console.log(event.target.value)
        const text = event.target.value.trim()
        if (text !== '' && text.length >= 3 && text.length <= this.state.inputMaxLength ) {
            this.setState({
                invalidName: false,
                value: text
            })
            console.log('done')

        } else {
            this.setState({
                invalidName: true,
                value: ''
            })
        }

        // || text.length <= this.state.inputMaxLengt

    }

    render() {
        const {onSubmitButton} = this.props

        return (
            <div className={classes.QuizNameContainer}>
                <h2 className={classes.Title}>Отлично!</h2>
                <Input
                    onChange={this.inputOnChangeHandler}
                    maxLength={this.state.inputMaxLength}
                    labelText={'Теперь нужно дать название этой викторине!'}
                    errorMessage={'s'}
                />
                <div className={classes.BtnWrapper}>
                    <Button
                        classFor={'ModalForQuizCreator'}
                        onClick={() => onSubmitButton(this.state.value)}
                        disabled={this.state.invalidName}
                    >готово</Button>
                </div>
            </div>
        )
    }
}



export default QuizNameContainer