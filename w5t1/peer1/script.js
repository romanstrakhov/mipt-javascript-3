'use strict';

// Код валидации формы

function validateForm(obj) {
    var form = document.getElementById(obj.formId);
    var requiredElements = Array.from(form.querySelectorAll('input'));
    var submitButton = form.querySelector('button');
    var isValid = true;
    var requirment = true;
    requiredElements.forEach(function (element) {
        element.addEventListener('blur', function() {
            isValid = checkifValid(element, obj);
            if (element.dataset.hasOwnProperty('required')) {
                requirment = checkIfRequired(element, obj);
            }
        }, false);
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
            requiredElements.forEach(function (input) {
                isValid = checkifValid(input, obj);
                if (input.dataset.hasOwnProperty('required')) {
                requirment = checkIfRequired(input, obj);
                }
                console.log(requirment);
            });
            
            console.log(requirment + " /" + isValid)
            if (isValid && requirment) {
                form.classList.remove(obj.formInvalidClass);
                form.classList.add(obj.formValidClass);

            } else {
                form.classList.remove(obj.formValidClass);
                form.classList.add(obj.formInvalidClass);
            }       
     });

     function checkifValid(inputElement, obj) {
    if (inputElement.dataset.hasOwnProperty('validator')) {
        var validation = inputElement.dataset.validator;
        var inputValue = inputElement.value;
        switch (validation) {
            case "number":
                if (!isNaN(inputValue)) { //!!!!!!!!!!!
                    var result = checkRange(inputElement, inputValue, obj);
                    return result;
                } else {
                    inputElement.classList.add(obj.inputErrorClass);
                    return false;
                };
                
            case "letters":
                if (!/\d/.test(inputValue) && !/[$-/:-?{-~!"^_`\[\]]/.test(inputValue)) { 
                    inputElement.classList.remove(obj.inputErrorClass);
                    return true;
                } else {
                    inputElement.classList.add(obj.inputErrorClass) ;
                    return false;
                }
               
            case "regexp":
                var regexp = new RegExp(inputElement.dataset.validatorPattern);
                if ((regexp).test(inputValue) || inputValue == "") {
                    inputElement.classList.remove(obj.inputErrorClass);
                    return true;
                } else {
                    inputElement.classList.add(obj.inputErrorClass);
                    return false;
                }
        }
        
    }
    
};

function checkRange(inputElement, inputValue, obj) {
    if (inputElement.hasAttribute('data-validator-min')) {
        var minimum = parseInt(inputElement.dataset.validatorMin);
        var maximum = parseInt(inputElement.dataset.validatorMax);
        if ((parseInt(inputValue) >= minimum && parseInt(inputValue) <= maximum) || inputValue == "") {
            inputElement.classList.remove(obj.inputErrorClass);
            return true;
        } else {
            inputElement.classList.add(obj.inputErrorClass);
            return false;
        }
    } else {
        inputElement.classList.remove(obj.inputErrorClass);
        return true;
    }
};

function checkIfRequired(inputElement, obj) {
        var inputValue = inputElement.value;
        if (!inputValue) { inputElement.classList.add(obj.inputErrorClass); return false; } 
        else { return true; }
        
    };
}


