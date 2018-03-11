'use strict';

// Код валидации формы
function validateForm(formObj)
{
	var form = document.getElementById(formObj.formId);
	form.addEventListener('submit', submitHandler);
	form.addEventListener('blur', blurHandler, true);
	form.addEventListener('focus', focusHandler, true);

	function focusHandler(event){
		if (!event.target.tagName === 'INPUT') {
		   return;
		}
		event.stopPropagation();
		event.target.classList.remove(formObj.inputErrorClass);
	}

	function blurHandler(event){
		if (!event.target.tagName === 'INPUT') {
		   return;
		}
		event.stopPropagation();
		var inputfield = event.target;
		if (validateInput(inputfield)){
			inputfield.classList.remove(formObj.inputErrorClass);
		} else {
			inputfield.classList.add(formObj.inputErrorClass);
		}
	}

	function submitHandler(event){
		event.preventDefault();
		event.stopPropagation();
		var inputs = document.querySelectorAll('#' + formObj.formId + " input");
		var isOk = true;
		for(var i = 0; i<inputs.length; i++){
			var inputfield = inputs[i];
			if (validateInput(inputfield)){
				inputfield.classList.remove(formObj.inputErrorClass);
			} else {
				isOk = false;
				inputfield.classList.add(formObj.inputErrorClass);
			}
		}
		if(isOk){
			form.classList.add(formObj.formValidClass);
			form.classList.remove(formObj.formInvalidClass);
		}else{
			form.classList.remove(formObj.formValidClass);
			form.classList.add(formObj.formInvalidClass);
		}
	}

	function validateInput(inputfield){
		var tmpvalue;
		if(inputfield.value==""){
			if (inputfield.dataset.hasOwnProperty("required")){
				return false;
			}
			return true;
		}
		tmpvalue = inputfield.value;
		if (inputfield.dataset.validator == "number"){
			var regexp = /^-?\d*$/;
			if (!regexp.test(tmpvalue)){
				return false;
			}
			tmpvalue = Number(tmpvalue);
			var minvalue = Number(inputfield.dataset.validatorMin);
			var maxvalue = Number(inputfield.dataset.validatorMax);
			if (minvalue>tmpvalue || maxvalue<tmpvalue){
				return false;
			}
			return true;
		}else if (inputfield.dataset.validator == "letters") {
			var regexp = /^[а-яa-z]*$/i;
			if (!regexp.test(tmpvalue)){
				return false;
			}
			return true;
		}else if (inputfield.dataset.validator == "regexp") {
			var pattern = inputfield.dataset.validatorPattern;
			var regexp = RegExp(pattern);
			if (!regexp.test(tmpvalue)){
				return false;
			}
			return true;
		}
		return true;
	}
}