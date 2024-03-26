//json objects
var validationRules = {
    email: {
        required: true,
        emailFormat: true
    },
    pswd: {
        required: true,
        minLength: 6
    },
    pswd2: {
        required: true,
        equalTo: '#pswd'
    }
};
//sign up form validation
function signUpValidation() {
    var isValid = true;
    Object.keys(validationRules).forEach(function (field) {
        var value = document.getElementById(field).value.trim();
        var rules = validationRules[field];
        var errorElement = document.getElementById(field + 'Error');
        errorElement.innerHTML = '';

        if (rules.required && !value) {
            errorElement.innerHTML = 'This field is required';
            isValid = false;
        } else if (rules.emailFormat && !validateEmail(value)) {
            errorElement.innerHTML = 'Invalid email format';
            isValid = false;
        } else if (rules.minLength && value.length < rules.minLength) {
            errorElement.innerHTML = 'Password must be at least ' + rules.minLength + ' characters long';
            isValid = false;
        } else if (rules.equalTo && value !== document.querySelector(rules.equalTo).value.trim()) {
            errorElement.innerHTML = 'Passwords do not match';
            isValid = false;
        }
    });

    return isValid;
}

//sign in form validation
function signInValidation() {
    var isValid = true;
    Object.keys(validationRules).forEach(function (field) {
        var value = document.getElementById(field).value.trim();
        var rules = validationRules[field];
        var errorElement = document.getElementById(field + 'Error');
        errorElement.innerHTML = '';

        if (rules.required && !value) {
            errorElement.innerHTML = 'This field is required';
            isValid = false;
        } else if (rules.emailFormat && !validateEmail(value)) {
            errorElement.innerHTML = 'Invalid email format';
            isValid = false;
        } else if (rules.minLength && value.length < rules.minLength) {
            errorElement.innerHTML = 'Password must be at least ' + rules.minLength + ' characters long';
            isValid = false;
        }
    });

    return isValid;
}

// Function to validate email format
function validateEmail(email) {
    // Regular expression for email validation
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}