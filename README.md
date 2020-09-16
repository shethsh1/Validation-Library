# Validation Library

Link to landing page: https://aqueous-garden-96512.herokuapp.com/examples.html

Link to documentation page: https://aqueous-garden-96512.herokuapp.com/documentation.html

<h1 align="center">Table of Contents</h1>

[**Getting Started**](#Getting-Started)

1. [Brief description](#Brief-description)
2. [How to set up](#How-to-set-up)




<h1 align="center">Getting started</h1>

## Brief description

* Simple to use dynamic checking validator for inputs
* Ability to freely choose your options on inputs that you need validated
* Functions made to help you retrieves current errors, active errors, and remove errors that you might not want anymore, additionally you can remove all your options.
* If you try to submit a form with errors then the fields with the error will be focused until a valid input is given

## How to set up

```html
<script src="js/Validation.js"></script>


<form id="login">
<input type="text" name="firstName" />
  ...
</form>

<script>

  const loginForm = new Validation("#login")
    loginForm.validate({
        firstName: {
            type: "text",
            numbers: false
        }
   })
</script>
```

The above example should give a broad overview on how to set it up. The script url where the library is based should be at the top under links. Under scripts I gave a very basic example of a first name input under the form "#login". 

The format will always be this

```javascript
const form = new Validation("formlocation")
  form.validate({
      name assigned by you: {
          type: type of input,
          options
      }
 })
```

In the first case. name is `firstName`, type is `text`, and we don't want numbers in the input `numbers: false`.

If a user puts a number in the first name input then it will give an error. 





