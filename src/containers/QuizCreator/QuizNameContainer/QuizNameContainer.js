import React, {Component} from 'react'
import classes from './QuizNameContainer.css'


import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/BUTTONS/Button'

const QuizNameContainer = class extends Component {

    state = {
        value: '',
        inputMaxLength: 40,
        invalidName: true,
        button: null
    }

    inputOnChangeHandler = (event) => {
        // console.log(event.target.value)
        const text = event.target.value.trim()
        if (text !== '' && text.length >= 2 && text.length <= this.state.inputMaxLength ) {
            this.setState({
                invalidName: false,
                value: text
            })
        } else {
            this.setState({
                invalidName: true,
                value: ''
            })
        }
    }

    getButtonRef = (node) => {
        this.setState({
            button: node
        })
    }

    keyPressHandler = (event) => {
        if (event.keyCode === 13) {
            this.state.button.click()
        }
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.keyPressHandler)
    }
    
    componentWillUnmount() {
        //странная активность в dev.t по events
        window.removeEventListener('keydown', this.keyPressHandler)
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
                        linkRef={this.getButtonRef}
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