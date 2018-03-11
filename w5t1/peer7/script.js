'use strict';

// Код валидации формы
function validateForm(options) {
  var form = document.getElementById(options.formId);
  var formValidClass = options.formValidClass;
  var formInvalidClass = options.formInvalidClass;
  var inputErrorClass = options.inputErrorClass;

  function formSubmitListener(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    var valid = true;
    var element;

    for (var i = 0, len = form.elements.length; i < len; i++) {
      element = form.elements[i];
      if (element.tagName === 'INPUT') {
        if (!validateField(element)) {
          valid = false;
        }
      }
    }

    if (valid) {
      setFormValid(form, formValidClass, formInvalidClass);
    } else {
      setFormInvalid(form, formValidClass, formInvalidClass);
    }
  }

  function fieldFocusListener(event) {
    if (event.target.tagName === 'INPUT') {
      event.stopImmediatePropagation();
      setFieldValid(event.target, inputErrorClass);
    }
  }

  function fieldBlurListener(event) {
    if (event.target.tagName === 'INPUT') {
      event.stopImmediatePropagation();
      validateField(event.target);
    }
  }

  function setFormValid(element, validClass, errorClass) {
    if (element.classList.contains(errorClass)) {
      element.classList.remove(errorClass);
    }

    if (!element.classList.contains(validClass)) {
      element.classList.add(validClass);
    }
  }

  function setFormInvalid(element, validClass, errorClass) {
    if (element.classList.contains(validClass)) {
      element.classList.remove(validClass);
    }

    if (!element.classList.contains(errorClass)) {
      element.classList.add(errorClass);
    }
  }

  function setFieldValid(element, errorClass) {
    if (element.classList.contains(errorClass)) {
      element.classList.remove(errorClass);
    }
  }

  function setFieldInvalid(element, errorClass) {
    if (!element.classList.contains(errorClass)) {
      element.classList.add(errorClass);
    }
  }

  function validateField(element) {
    if (verifiedField(element)) {
      setFieldValid(element, inputErrorClass);
      return true;
    } else {
      setFieldInvalid(element, inputErrorClass);
      return false;
    }
  }

  function verifiedField(element) {
    return(verifiedForCompletion(element) && verifiedForValidity(element));
  }

  function verifiedForCompletion(element) {
    return (!element.hasAttribute('data-required') || element.value.length > 0);
  }

  function verifiedForValidity(element) {
    var validator = element.dataset.validator;
    if (validator !== undefined && validator.length > 0 && element.value.length > 0) {
      switch (validator) {
        case 'letters':
            return validateRegexp(element.value, /^[a-zа-яё\s]*$/i);
          break;
        case 'number':
            return validateNumbers(element.value, element.dataset.validatorMin, element.dataset.validatorMax);
          break;
        case 'regexp':
            return validateRegexp(element.value, new RegExp(element.dataset.validatorPattern));
          break;
      }
    }

    return true;
  }

  function validateNumbers(value, min, max) {
    var digit = parseInt(value);
    if (validateRegexp(value, /^\d*$/i) && !Number.isNaN(digit)) {
      if (min !== undefined && min.length > 0) {
        if (digit < min) {
          return false;
        }
      }
      if (max !== undefined && max.length > 0) {
        if (digit > max) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  function validateRegexp(value, regexp) {
    return regexp.test(value);
  }

  form.addEventListener('submit', formSubmitListener);
  form.addEventListener('focus', fieldFocusListener, true);
  form.addEventListener('blur', fieldBlurListener, true);
}