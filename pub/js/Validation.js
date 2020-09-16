/* JS Library */
"use strict"; // always need a semicolon before an IIFE

(function (global) {
    const errorMsg = function (name, value) {
        if (name === "required") {
            return "Field cannot be empty"
        }
        if (name === "minLength") {
            return `Length must be at least ${value}`
        }
        if (name === "maxLength") {
            return `Length must be at most ${value}`
        }
        if (name === "numbers") {
            return value ? "Must contain a number" : "Cannot contain a number"
        }
        if (name === "whitespace") {
            return value ? "Must contain whitespace" : "Cannot contain whitespace"
        }
        if (name === "exclude") {
            let exclusions = ''
            for (const user of value) {
                exclusions = exclusions + "'" + user + "' "

            }
            exclusions = exclusions + "are not allowed"
            return exclusions
        }
        if (name === "checkLimit") {
            return `Don't select more than ${value}`
        }
        if (name === "checkMinimum") {
            return `Must select atleast ${value}`
        }
        if (name === "valid") {
            return "Format is not valid"
        }
        if (name === "isEqual") {
            return "passwords are not equal"
        }
        if (name === "date") {
            return "Date is not valid"
        }
        if (name === "contains") {
            let contains = ''
            for (const user of value) {
                contains = contains + "'" + user + "' "

            }
            contains = contains + "cannot contain these words / letters"
            return contains
        }



    }
    // references
    // phonenumber regex https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    // visa credit card regex https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
    const regex = {
        numbers: /\d/,
        whitespace: /\s/,
        email: /\S+@\S+\.\S+/,
        phoneNumber: /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,

    }


    function Validation(form) {
        this.form = form
        this._self = {}
        this.rulesPerForm = {}
        this._self.element = document.querySelector(form)




    }


    Validation.prototype = {



        validate: function (constraints) {
            this.rulesPerForm = constraints



            const names = Object.keys(constraints)

            names.forEach((name) => {
                this._insertChecker(name, constraints[name])
            })

            names.forEach((name) => {

                this._validateInput(name, constraints[name])
            })


            const submit = this._self.element.querySelector("button[type=submit]")
            if (submit) {
                submit.addEventListener("click", e => {
                    e.preventDefault()
                    const errors = this.getActiveErrors()

                    if (Object.keys(errors).length === 0) {

                        const names = Object.keys(this.rulesPerForm)
                        names.forEach((name) => {
                            const element = this._self.element.querySelector(`*[name=${name}]`);

                            if (element.type === "text" || element.type === "email" || element.type === "password" || element.type === "textarea") {
                                element.style.border = null
                                element.style.borderColor = null
                                element.style.boxShadow = null
                            }
                        })

                        alert("Form is valid")

                    } else {
                        alert("Form is invalid")
                        const names = Object.keys(errors)


                        names.forEach((name) => {
                            const element = this._self.element.querySelector(`*[name=${name}]`);

                            if (element.type === "text" || element.type === "email" || element.type === "password" || element.type === "textarea"
                                || element.type === "visa") {
                                element.style.border = "2px solid #dadada"
                                element.style.borderColor = "red"
                                element.style.boxShadow = "0 0 5px red"
                            }
                        })

                        const allNames = Object.keys(this.rulesPerForm)
                        allNames.forEach((name) => {
                            if (!names.includes(name)) {

                                const element = this._self.element.querySelector(`*[name=${name}]`);

                                if (element.type === "text" || element.type === "email" || element.type === "password" || element.type === "textarea") {
                                    element.style.border = null
                                    element.style.borderColor = null
                                    element.style.boxShadow = null
                                }
                            }
                        })






                    }
                })
            }

        },

        getActiveErrors: function () {
            const errorSpans = this._self.element.querySelectorAll(".errorMsg")
            const errors = {}
            for (const error of errorSpans) {
                if (error.textContent !== '') {

                    errors[error.previousSibling.name] = error.innerHTML.slice(4, error.innerHTML.length - 4).split("<br>")


                }



            }
            return errors

        },

        getErrors: function () {
            const allErrors = this.rulesPerForm
            return allErrors

        },

        editOptions: function (name, newOptions) {
            this.rulesPerForm[name] = newOptions

            const errorSpans = this._self.element.querySelectorAll(".errorMsg")
            for (const error of errorSpans) {
                error.innerText = ""
                error.previousSibling.value = ""
            }



            this.validate(this.rulesPerForm)




        },
        removeOptions: function () {
            const errorSpans = this._self.element.querySelectorAll(".errorMsg")
            for (const error of errorSpans) {
                error.innerText = ""
                error.previousSibling.value = ""
            }

            const oldForm = document.querySelector(this.form);
            const newForm = oldForm.cloneNode(true);

            this.rulesPerForm[name] = {}

            oldForm.parentNode.replaceChild(newForm, oldForm);



        }







    }

    Validation.prototype._insertChecker = function (inputName, rules) {
        if (rules.type === "text" || rules.type === "email" || rules.type === "phoneNumber" ||
            rules.type === "visa" || rules.type === "password" || rules.type === "date") {
            const input = this._self.element.querySelector(`input[name=${inputName}]`)
            const error = document.createElement("span")
            error.className = "errorMsg"
            error.style.color = "red"
            input.parentNode.insertBefore(error, input.nextSibling);

        }

        if (rules.type === "checkbox") {
            const checkboxes = this._self.element.querySelectorAll(`input[name=${inputName}]`)
            const input = checkboxes[checkboxes.length - 1]
            const error = document.createElement("span")
            error.className = "errorMsg"
            error.style.color = "red"
            input.parentNode.insertBefore(error, input.nextSibling);


        }

        if (rules.type === "dropdown") {
            const input = this._self.element.querySelector(`select[name=${inputName}]`)
            const error = document.createElement("span")
            error.className = "errorMsg"
            error.style.color = "red"
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        if (rules.type === "textarea") {
            const input = this._self.element.querySelector(`textarea[name=${inputName}]`)
            const error = document.createElement("span")
            error.className = "errorMsg"
            error.style.color = "red"
            input.parentNode.insertBefore(error, input.nextSibling);
        }


    }

    Validation.prototype._validateInput = function (inputName, rules) {

        if (rules.type === "text" || rules.type === "email" || rules.type === "phoneNumber"
            || rules.type === "visa" || rules.type === "password" || rules.type === "date") {


            const text = this._self.element.querySelector(`input[name=${inputName}]`)

            text.addEventListener('keyup', event => {
                const messages = []
                const val = event.target.value
                const criteria = Object.keys(rules)
                if (rules.type === "email") {
                    if (!regex.email.test(val)) {
                        messages.push(errorMsg("valid", null))
                    }
                }
                if (rules.type === "phoneNumber") {
                    if (!regex.phoneNumber.test(val)) {
                        messages.push(errorMsg("valid", null))
                    }
                }
                if (rules.type === "visa") {

                    if (!regex.visa.test(val)) {
                        messages.push(errorMsg("valid", null))
                    }
                }
                if (rules.type === "date") {
                    const checkDate = new Date(val)
                    if (checkDate instanceof Date && !isNaN(checkDate)) {

                    } else {
                        messages.push(errorMsg("date", null))
                    }
                }

                criteria.forEach((rule) => {

                    if (rule === "required") {

                        if (rules.required === true) {
                            if (val === "") {
                                messages.push(errorMsg("required", null))
                            }

                        }
                    }
                    if (rule === "minLength") {
                        if (val.length < rules.minLength) {
                            messages.push(errorMsg("minLength", rules.minLength))

                        }
                    }
                    if (rule === "maxLength") {
                        if (val.length > rules.maxLength) {
                            messages.push(errorMsg("maxLength", rules.maxLength))
                        }
                    }
                    if (rule === "numbers") {

                        if (rules.numbers === true && !regex.numbers.test(val)) {
                            messages.push(errorMsg("numbers", true))

                        }
                        if (rules.numbers === false && regex.numbers.test(val)) {
                            messages.push(errorMsg("numbers", false))
                        }
                    }
                    if (rule === "whitespace") {


                        if (rules.whitespace === true && !regex.whitespace.test(val)) {
                            messages.push(errorMsg("whitespace", true))

                        }
                        if (rules.whitespace === false && regex.whitespace.test(val)) {
                            messages.push(errorMsg("whitespace", false))
                        }
                    }
                    if (rule === "exclude") {


                        if (rules.exclude.includes(val)) {
                            messages.push(errorMsg("exclude", rules.exclude))

                        }
                    }
                    if (rule === "isEqual") {

                        const value = this._self.element.querySelector(`input[name=${rules.isEqual}]`)
                        if (value.value !== val) {

                            messages.push(errorMsg("isEqual", null))
                        } else {
                            if (value.nextSibling.textContent.includes("passwords are not equal")) {
                                value.dispatchEvent(new Event('focus'));
                                value.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
                            }

                        }
                    }
                    if (rule === "confirmPassword") {
                        const value = this._self.element.querySelector(`input[name=${rules.confirmPassword}]`)
                        if (value.value !== val) {
                            messages.push(errorMsg("isEqual", null))
                        } else {
                            if (value.nextSibling.textContent.includes("passwords are not equal")) {
                                value.dispatchEvent(new Event('focus'));
                                value.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
                            }


                        }
                    }

                    if (rule === "customCheck") {
                        if (rules.customCheck.checker(val)) {
                            messages.push(rules.customCheck.errorMessage)
                        }
                    }

                    if (rule === "contains") {
                        if (val.includes(rules.contains)) {
                            messages.push(errorMsg("contains", rules.contains))
                        }
                    }


                    messages.length !== 0 ? text.nextSibling.innerText = "\n" : text.nextSibling.innerText = ""
                    messages.forEach((msg) => {
                        text.nextSibling.innerText = text.nextSibling.innerText + msg + "\n"

                    })
                })

            })
            text.dispatchEvent(new KeyboardEvent('keyup', { 'key': '' }));

        }

        if (rules.type === "checkbox") {
            const checkboxes = this._self.element.querySelectorAll(`input[name=${inputName}]`)
            const lastCheckbox = checkboxes[checkboxes.length - 1]
            const criteria = Object.keys(rules)

            let total = 0
            checkboxes.forEach(checkbox => {

                checkbox.addEventListener('change', (event) => {
                    const messages = []
                    if (event.target.checked === true) {
                        total = total + 1
                    } else {
                        total = total - 1
                    }
                    criteria.forEach((rule) => {



                        if (rule === "checkLimit") {

                            if (total > rules.checkLimit) {
                                messages.push(errorMsg("checkLimit", rules.checkLimit))


                            }
                        }
                        if (rule === "checkMinimum") {
                            if (total < rules.checkMinimum) {
                                messages.push(errorMsg("checkMinimum", rules.checkMinimum))

                            }
                        }



                    })

                    messages.length !== 0 ? lastCheckbox.nextSibling.innerText = "\n" : lastCheckbox.nextSibling.innerText = ""
                    messages.forEach((msg) => {
                        lastCheckbox.nextSibling.innerText = lastCheckbox.nextSibling.innerText + msg + "\n"

                    })




                })



            }

            )
            checkboxes[0].checked = true;
            var event = new Event('change');
            checkboxes[0].dispatchEvent(event);
            checkboxes[0].checked = false;
            checkboxes[0].dispatchEvent(event);



        }

        if (rules.type === "dropdown") {
            const dropdown = this._self.element.querySelector(`select[name=${inputName}]`)
            const criteria = Object.keys(rules)

            dropdown.addEventListener('click', event => {
                const val = event.target.value
                const messages = []
                criteria.forEach((rule) => {
                    if (rule === "exclude") {
                        if (rules.exclude.includes(val)) {
                            messages.push(errorMsg("exclude", rules.exclude))
                        }
                    }
                    messages.length !== 0 ? dropdown.nextSibling.innerText = "\n" : dropdown.nextSibling.innerText = ""

                    messages.forEach((msg) => {
                        dropdown.nextSibling.innerText = dropdown.nextSibling.innerText + msg + "\n"

                    })
                })

            })




        }
        if (rules.type === "textarea") {
            const textarea = this._self.element.querySelector(`textarea[name=${inputName}]`)
            const criteria = Object.keys(rules)

            textarea.addEventListener("keyup", event => {
                const val = event.target.value
                const messages = []
                criteria.forEach((rule) => {
                    if (rule === "minLength") {
                        if (val.length < rules.minLength) {
                            messages.push(errorMsg("minLength", rules.minLength))

                        }
                    }
                    if (rule === "maxLength") {
                        if (val.length > rules.maxLength) {
                            messages.push(errorMsg("maxLength", rules.maxLength))
                        }
                    }
                    if (rule === "numbers") {

                        if (rules.numbers === true && !regex.numbers.test(val)) {
                            messages.push(errorMsg("numbers", true))

                        }
                        if (rules.numbers === false && regex.numbers.test(val)) {
                            messages.push(errorMsg("numbers", false))
                        }
                    }
                    if (rule === "whitespace") {


                        if (rules.whitespace === true && !regex.whitespace.test(val)) {
                            messages.push(errorMsg("whitespace", true))

                        }
                        if (rules.whitespace === false && regex.whitespace.test(val)) {
                            messages.push(errorMsg("whitespace", false))
                        }
                    }
                    if (rule === "exclude") {


                        if (rules.exclude.includes(val)) {
                            messages.push(errorMsg("exclude", rules.exclude))

                        }
                    }
                    if (rule === "customCheck") {
                        if (rules.customCheck.checker(val)) {
                            messages.push(rules.customCheck.errorMessage)
                        }
                    }
                    if (rule === "contains") {
                        if (val.includes(rules.contains)) {
                            messages.push(errorMsg("contains", rules.contains))
                        }
                    }



                    messages.length !== 0 ? textarea.nextSibling.innerText = "\n" : textarea.nextSibling.innerText = ""
                    messages.forEach((msg) => {
                        textarea.nextSibling.innerText = textarea.nextSibling.innerText + msg + "\n"

                    })
                })
            })

            textarea.dispatchEvent(new KeyboardEvent('keyup', { 'key': '' }));
        }











    }


    global.Validation = global.Validation || Validation
})(window); 