
function examples() {

    const registrationForm = new Validation("#registrationForm")

    registrationForm.validate({
        firstname: {
            type: "text",
            minLength: 2,
            numbers: false,
            whitespace: false,
            exclude: ["Bob"],
            required: true,
            customCheck: {
                checker: function (val) {
                    if (val) {
                        if (val[0] === "S" || val[0] === "s") {
                            return true
                        }
                    }
                    return false
                },
                errorMessage: "No names that start with s"
            },

        },
        lastname: {
            type: "text",
            minLength: 3,
            numbers: false,
            whitespace: false,
            exclude: ["Bob"],
            required: true
        },
        email: {
            type: "email",
            required: true

        },
        password: {
            type: "password",
            numbers: true,
            required: true,
            confirmPassword: "cpassword"
        },
        cpassword: {
            type: "password",
            isEqual: "password",
            required: true
        },
    })

    const commentForm = new Validation("#commentForm")
    commentForm.validate({
        firstname: {
            type: "text",
            minLength: 1,
            numbers: false,
        },
        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },
        comment: {
            type: "textarea",
            minLength: 2,
            maxLength: 25,
        }
    })


    const creditCardForm = new Validation("#creditCardForm")
    creditCardForm.validate({
        cardname: {
            type: "text",
            numbers: false,
            required: true
        },
        cardnumber: {
            type: "visa",
            required: true
        },
        checkbox: {
            type: "checkbox",
            checkMinimum: 1,


        }
    })
    const exampleInputs = new Validation("#exampleInputs")

    exampleInputs.validate({

        firstName: {
            type: "text",
            minLength: 2,
            numbers: false,
            whitespace: false,
            exclude: ["Admin", "User"]
        },

        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },



    })

    const passwordCheck = new Validation("#passwordCheck")
    passwordCheck.validate({
        password: {
            type: "password",
            confirmPassword: "confirmPassword"
        },
        confirmPassword: {
            type: "password",
            isEqual: "password"
        }
    })

    const checkboxesChecker = new Validation("#checkboxesChecker")
    checkboxesChecker.validate({
        checkbox: {
            type: "checkbox",
            checkLimit: 3,
            checkMinimum: 1
        }
    })

    const dropdownChecker = new Validation("#dropdownChecker")
    dropdownChecker.validate({
        dropdown: {
            type: "dropdown",
            exclude: ["C", "D"]
        }
    })

    const dateChecker = new Validation("#dateChecker")
    dateChecker.validate({
        ssdate: {
            type: "date"
        }
    })


    const customFunction = new Validation("#customFunction")
    customFunction.validate({
        firstname: {
            type: "text",
            required: true,
            customCheck: {
                checker: function (val) {
                    if (val) {
                        if (val[0] === "S" || val[0] === "s") {
                            return true
                        }
                    }
                    return false
                },
                errorMessage: "No names that start with s"
            }
        },
    })


    const commentForm2 = new Validation("#getErrorsExample")
    commentForm2.validate({
        firstname: {
            type: "text",
            minLength: 1,
            numbers: false,
        },
        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },
        comment: {
            type: "textarea",
            minLength: 2,
            maxLength: 25,
        }
    })

    const commentForm3 = new Validation("#getActiveErrorsExample")
    commentForm3.validate({
        firstname: {
            type: "text",
            minLength: 1,
            numbers: false,
        },
        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },
        comment: {
            type: "textarea",
            minLength: 2,
            maxLength: 25,
        }
    })

    const reg = document.querySelector("#getActiveErrorsExample")
    const firstName = reg.querySelector("input[name=firstname]")
    const phoneNumber = reg.querySelector("input[name=phonenumber]")
    firstName.value = "Shaahid"
    phoneNumber.value = "4164554555"
    firstName.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
    phoneNumber.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));



    const commentForm4 = new Validation("#editOptionsExample")
    commentForm4.validate({
        firstname: {
            type: "text",
            minLength: 1,
            numbers: false,
        },
        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },
        comment: {
            type: "textarea",
            minLength: 2,
            maxLength: 25,
        }
    })

    commentForm4.editOptions("firstname", { type: "text", minLength: 1000 })

    const commentForm5 = new Validation("#removeOptionsExample")
    commentForm5.validate({
        firstname: {
            type: "text",
            minLength: 1,
            numbers: false,
        },
        email: {
            type: "email"
        },
        phonenumber: {
            type: "phoneNumber"
        },
        comment: {
            type: "textarea",
            minLength: 2,
            maxLength: 25,
        }
    })


    commentForm5.removeOptions()

    const containsExample = new Validation("#containsExample")
    containsExample.validate({
        firstname: {
            type: "text",
            required: true,
            contains: ["a"]

        },
    })
}







examples();

// tabs reference : https://www.w3schools.com/howto/howto_js_tabs.asp

function openCode(event, codeType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(codeType).style.display = "block";
    event.currentTarget.className += " active";
}








