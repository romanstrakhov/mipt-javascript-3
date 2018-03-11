'use strict';

// Код валидации формы

var validateForm = function(checkValues) {
  /* get in checkValues following object's properties:
        formId, formValidClass, formInvalidClass, inputErrorClass
  */ 
  var formCheckValues = {};
  

  // Функция проверки валидности элемента 
  var checkElement = function(checkedElement) {
    if (checkedElement.tagName != 'INPUT') throw "Wrong call - not input element"; // если эту функцию вызвали не для input - ошибка 
    var isValid = true;
    if ('required' in checkedElement.dataset) {
      if (checkedElement.value.toString().length == 0)
        return false;
    };
    if ('validator' in checkedElement.dataset) {
      if (checkedElement.dataset.validator =='letters') {
        let re = new RegExp('^[A-za-zА-Яа-я]{1,}$');
        isValid = checkedElement.value.match(re);
      }
      else if (checkedElement.dataset.validator =='number') {
        // Проверяем что введено целое число (с дробями не работаем)
        let minValue = checkedElement.dataset.validatorMin;
        let maxValue = checkedElement.dataset.validatorMax;
        let numericValue = checkedElement.value;
        let floatValue = parseFloat(numericValue);
        let intValue = parseInt(numericValue);
        isValid = (floatValue == intValue) && (intValue.toString() == numericValue) 
        if (isValid && maxValue) isValid = (intValue<= maxValue);
        if (isValid && minValue) isValid = (intValue >= minValue);
      } 
      else if (checkedElement.dataset.validator =='regexp') {
        let re = new RegExp(checkedElement.dataset.validatorPattern);
        isValid = checkedElement.value.match(re);
      };
    };
    return isValid;
  };

  // Обработчик события (focus)  
  var focusEventHandler = function(event) {
    if (event.tagName == 'INPUT' && event.target.hasClass(formCheckValues.inputErrorClass)) {
      event.target.removeClass(formCheckValues.inputErrorClass);
    };
  };

  // Обработчик события ухода фокуса (blur), обработчик с анализом input 
  var blurEventHandler = function(event) {
    if (checkElement(event.target)) {
      // remove class if input element is valid 
        event.target.classList.remove(formCheckValues.inputErrorClass);
      }
    else {
      // add class if input element is invalid 
        event.target.classList.add(formCheckValues.inputErrorClass);
    }
  };
  
  var getInputElements = function(element) {
    let inputElements = element.querySelectorAll('input');
    return Array.from(inputElements);
  };
  // Проверка всех элементов (submit), обработчик на форме  
  var submitEventHandler = function(event) {
    let inputElements = getInputElements(event.target);
    let isError = false;
    let checkedForm = event.target;
    inputElements.forEach(function (value) {
      if (!checkElement(value)) isError = true;      
    });
    if (isError) {
      event.target.classList.add(formCheckValues.formInvalidClass);
      event.target.classList.remove(formCheckValues.formValidClass);
    }
    else {
      event.target.classList.remove(formCheckValues.formInvalidClass);
      event.target.classList.add(formCheckValues.formValidClass);
    };
    event.preventDefault();
  };

  Object.assign(formCheckValues, checkValues);
  
  var validatedForm = document.getElementById(formCheckValues.formId);
  validatedForm.addEventListener('focus', focusEventHandler, true);
  validatedForm.addEventListener('submit', submitEventHandler, false);
  let inputElements = getInputElements(validatedForm);
  inputElements.forEach(function (value) {
    if (('validator' in value.dataset) || ('required' in value.dataset)) {
      value.addEventListener('blur', blurEventHandler, true);
    }
  });
    
};