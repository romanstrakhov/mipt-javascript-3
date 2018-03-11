'use strict';

var validateForm = function (formParams) {
    var formId = formParams.formId;
    var formValidClass = formParams.formValidClass;
    var formInvalidClass = formParams.formInvalidClass;
    var inputErrorClass = formParams.inputErrorClass;

    var getAllInputs = function (formId) {
        return document.querySelectorAll('#' + formId + ' input');
    };

    var isInputValid = function (input) {
        var validationResult = true;
        var value = input.value;
        if (value) {
            value = value.trim();
        }

        if (input.dataset.hasOwnProperty('required')) {
            if (!value || value.length == 0) {
                validationResult = false;
            }
        }

        if (input.dataset.hasOwnProperty('validator') && validationResult) {
            var validatorType = input.dataset.validator;

            switch (validatorType) {
                case 'letters': {
                    validationResult = validationResult && /^[a-zA-Zа-яА-Я]+$/.test(value);
                    break;
                }
                case 'number': {
                    validationResult = validationResult && !isNaN(value);
                    if (input.dataset.hasOwnProperty('validatorMin') && validationResult) {
                        var minValue = Number(input.dataset.validatorMin);
                        validationResult = validationResult && (value >= minValue);
                    }
                    if (input.dataset.hasOwnProperty('validatorMax') && validationResult) {
                        var maxValue = Number(input.dataset.validatorMax);
                        validationResult = validationResult && (value <= maxValue);
                    }
                    break;
                }
                case 'regexp': {
                    if (value && value.length > 0) {
                        var validatorPattern = new RegExp(input.dataset.validatorPattern);
                        validationResult = validationResult && validatorPattern.test(value);
                    }
                    break;
                }
            }

            return validationResult;
        }
    };

    var validateInput = function (input) {
        var validInput = isInputValid(input);
        if (!validInput) {
            input.classList.add(inputErrorClass);
        } else {
            input.classList.remove(inputErrorClass);
        }
        return validInput;
    };

    var validate = function(event) {
        var input = event.target;
        validateInput(input);
    };

    var clear = function(event) {
        var input = event.target;
        input.classList.remove(inputErrorClass);
    };

    var submitForm = function (event) {
        var isFormValid = true;
        var form = event.target;
        var inputs = getAllInputs(formId);
        inputs.forEach(function (input) {
            var validInput = validateInput(input);
            isFormValid = isFormValid && validInput;
        });

        if (isFormValid) {
            form.classList.remove(formInvalidClass);
            form.classList.add(formValidClass);
        } else {
            form.classList.remove(formValidClass);
            form.classList.add(formInvalidClass);
        }

        event.preventDefault();
    };

    var form = document.getElementById(formId);
    form.addEventListener("submit", submitForm);
    form.addEventListener("blur", validate, true);
    form.addEventListener("focus", clear, true);
};
