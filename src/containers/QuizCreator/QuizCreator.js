import React, { Component } from 'react'
import classes from './QuizCreator.css'
import {createControl, validate, formIsValidate} from '../../formWatcher/formWatcher'
import axios from 'axios'

import Button from '../../components/UI/BUTTONS/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/select/Select'

const createOptionControl = (num) => {
    return createControl({
        label: `Ответ ${num}: `,
        errorMessage: 'Ответ не может быть пустым',
        id: num,
    }, { required: true })
}


const QuizCreator = class extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerID: 1,
        formControls: {
            question: createControl({
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым'
            }, { required: true }),
            option1: createOptionControl(1),
            option2: createOptionControl(2),
            option3: createOptionControl(3),
            option4: createOptionControl(4)
        }
    }

    onSubmitFormHandelr = (event) => {
        event.preventDefault()
    }

    addQuestionButtonHandler = (event) => {
        event.preventDefault()
        const quiz = [...this.state.quiz]
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerID: this.state.rightAnswerID,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]

        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerID: 1,
            formControls: {
                question: createControl({
                    label: 'Введите вопрос',
                    errorMessage: 'Вопрос не может быть пустым'
                }, { required: true }),
                option1: createOptionControl(1),
                option2: createOptionControl(2),
                option3: createOptionControl(3),
                option4: createOptionControl(4)
            }
        })
    }

    createQuizButtonHandler = async (event) => {
        event.preventDefault()


        try {
            // + .json в ссылку
            await axios.post('https://quiz-f3332.firebaseio.com/quiz.json', this.state.quiz)
            // когда сервер ответит
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerID: 1,
            })
        } catch (error) {
            console.log(error)
        }

    }

    inputChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] } 
        control.touched = true
        control.value = event.target.value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: formIsValidate(formControls)
        })

    }

    renderControls() {
        return Object.values(this.state.formControls).map((control, ind) => {
            // console.log(control)
            const controlName = Object.keys(this.state.formControls)[ind]

            // костыль на первый input
            const firstQuestionInput = (
                <div className={classes.questionWrapper} key={ind}>
                    <Input 
                        labelText={control.label}
                        inpValue={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.inputChangeHandler(event, controlName)}
                    />
                </div>
            )
            if (ind === 0) {
                return firstQuestionInput
            } else {
                return (
                    <Input 
                        key={ind}
                        labelText={control.label}
                        inpValue={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.inputChangeHandler(event, controlName)}
                    />
                )
            }
        })
    }

    selectChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            rightAnswerID: Number(event.target.value)
        })
    }

    render() {
        const select = (
            <Select
                label={'Выберите правильный ответ'}
                value={this.state.rightAnswerID}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 }
                ]}
            />
        )


        return (
            <div className={classes.QuizCreator}> 
                <div>
                    <h1>Создайте свой тест!</h1>
                    <form onSubmit={this.onSubmitFormHandelr}>
                        { this.renderControls() }
                        { select }
                        <div className={classes.BtnWrapper}>
                            <Button
                                onClick={this.addQuestionButtonHandler}
                                disabled={!this.state.isFormValid}
                                classFor={'QuizCreatorButton'}
                            >Добавить вопрос</Button>
                            <Button
                                classFor={'QuizCreatorButton'}
                                onClick={this.createQuizButtonHandler}
                                disabled={this.state.quiz.length === 0}
                                // нет вопросов нет теста :)
                            >Создать тест</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default QuizCreator