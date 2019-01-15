export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation, // если есть что-то в validation, тогда false
        touched: false,
        value: ''
    }
}


export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid

    }

    // можно расширить

    return isValid
}


export function formIsValidate(formControls) {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}