'use strict';

/**
 *
 * @param options
     formId: 'profile',
     formValidClass: 'form_valid',
     formInvalidClass: 'form_invalid',
     inputErrorClass: 'input_error'
 */

function validateForm(options) {
    var form = document.getElementById(options.formId);
    var formValidClass = options.formValidClass;
    var formInvalidClass = options.formInvalidClass;
    var inputErrorClass = options.inputErrorClass;

    function requiredValid(elem) {
        if (elem.value == '' && elem.hasAttribute('data-required')) {
            elem.classList.add(inputErrorClass);
        }
    }

    function validElem(elem) {
        var regExp;
        var value = elem.value;

        switch (elem.dataset.validator) {
            case 'letters':
                regExp = /^([a-zа-яё]*)$/i;
                if (!regExp.test(value)) elem.classList.add(inputErrorClass);

                requiredValid(elem);

                break;
            case 'number':
                var min, max;
                if (isNaN(Number(value))) {
                    elem.classList.add(inputErrorClass);
                    return;
                }

                if (elem.dataset.validatorMin) {
                    min = parseInt(elem.dataset.validatorMin);
                }
                if (elem.dataset.validatorMax) {
                    max = parseInt(elem.dataset.validatorMax);
                }

                value = parseInt(value);

                if (min > value || value > max) {
                    elem.classList.add(inputErrorClass);
                }

                requiredValid(elem);

                break;
            case 'regexp':
                regExp = new RegExp(elem.dataset.validatorPattern);
                if (!regExp.test(value) && value != '') elem.classList.add(inputErrorClass);

                requiredValid(elem);

                break;
        }
    }

    function checkForm() {
        var inputList = form.querySelectorAll('input');
        for (var i = 0; i < inputList.length; i++) {
            validElem(inputList[i]);

            if (inputList[i].classList.contains(inputErrorClass)) {
                form.classList.remove(formValidClass);
                form.classList.add(formInvalidClass);
                return;
            }
            form.classList.remove(formInvalidClass);
            form.classList.add(formValidClass);
        }
    }

    form.addEventListener('blur', function (event) {
        validElem(event.target);
    }, true);

    form.addEventListener('focus', function (event) {
        if (event.target.classList.contains(inputErrorClass)) {
            event.target.classList.remove(inputErrorClass);
        }
    }, true);

    form.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT' && event.keyCode==13) {
            checkForm();
        }
    }, true);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        checkForm();
    });
}
