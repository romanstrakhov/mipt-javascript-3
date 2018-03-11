'use strict';

function validateForm(form) {
	var formId = form.formId;
	var formValidClass = form.formValidClass;
	var formInvalidClass = form.formInvalidClass;
	var inputErrorClass = form.inputErrorClass;
	var testForm = document.getElementById(formId);

//udachi
//blur для input(добавит inputErrorClass если функция validateElem вернет false)

	document.addEventListener('blur', function (e) {
		e.preventDefault();

		if (e.target.tagName === "INPUT") {
			if (!validateElem( e.target.getAttribute('data-validator'), e.target)) {
				e.target.classList.add(inputErrorClass);
			}
		}
	}, true)

//focus для input(удаляет inputErrorClass при его наличии)

	document.addEventListener('focus', function (e) {
		e.preventDefault();

		if (e.target.tagName === "INPUT") {
				if (e.target.classList.contains(inputErrorClass)) e.target.classList.remove(inputErrorClass);
		}
	}, true)

	testForm.addEventListener('submit', function(e) {
		//отключает действия по-умолчанию
		e.preventDefault();

		var inputsForm = document.getElementById(formId).getElementsByTagName('input');

		//циклично проверяется наличие inputErrorClass в каждом input и заполненость обязательных полей
		for (var i = 0; i < inputsForm.length; i++) {
			if(inputsForm[i].classList.contains(inputErrorClass) || inputsForm[i].hasAttribute('data-required') && !inputsForm[i].value) {
				testForm.classList.remove('formValidClass')
				testForm.classList.add('formInvalidClass')
				console.log(i)
				break;
			} else {
				testForm.classList.remove('formInvalidClass')
				testForm.classList.add('formValidClass')
				console.log(i + 'i')

			}
		}
		//показывает сообщение
		if (testForm.classList.contains('formInvalidClass')) {
			testForm.querySelector('.form__success-msg').style.display = 'none';
			testForm.querySelector('.form__error-msg').style.display = 'block';

		} else {
			testForm.querySelector('.form__success-msg').style.display = 'block';
			testForm.querySelector('.form__error-msg').style.display = 'none';
		}
	})

	function validateElem(typeValidator, target) {
		var value = target.value;

		//вернет true для пустых необязательных полей
		if (!value && !target.hasAttribute('data-required')) return true;

		//валидатор для letters
		if (typeValidator === "letters") {

			var myReg = new RegExp(/^[a-zа-яё]+$/i);
			if (myReg.test(value)) return true;

		} else if (typeValidator === "number") {
		//валидатор для number

			var min = +target.getAttribute('data-validator-min') || 0;
			var max = +target.getAttribute('data-validator-max') || +value;

			var myReg = new RegExp(/^\d+$/i);
	

			if (myReg.test(value) && value >= min && value <= max) return true;

		} else if (typeValidator === "regexp") {
		//валидатор для regexp

			var myReg = new RegExp(target.getAttribute('data-validator-pattern'))
			if (myReg.test(value)) return true;

		}
		return false;
	}

	return false;
}
