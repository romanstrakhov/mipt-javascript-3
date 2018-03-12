'use strict';

// Код валидации формы

function validateForm(valObject) {

	var form = document.getElementById(valObject.formId);
	var button = form.querySelector('button');
	// собираем все Inputs, которые есть в форме
	var inputCollection = form.getElementsByTagName('input');
	// приводим их к масиву
	var inpupList = Array.prototype.slice.call(inputCollection);

	// -----------------------
	//
	// При потере фокуса (blur) элемента input вызывается проверка для этого элемента по id
	//
	// -----------------------
	form.addEventListener('blur', function(event) {
		// только для input
		if (event.target.tagName === 'INPUT') {
			// валидация всех input формы на правильность заполнения
			cheсkFieldInput();
		};
	}, true);

	// -----------------------
	//
	// При фокусе (focus) элемента input вызывается проверка для этого элемента по id
	//
	// -----------------------
	form.addEventListener('focus', function(event) {
		// только для input
		if (event.target.tagName === 'INPUT') {
			var focusItem = document.getElementById(event.target.id);
			// Класс с ошибкой (inputErrorClass) удаляется при фокусе на элемент (focus).
			focusItem.classList.remove(valObject.inputErrorClass);
		}
	}, true);

	// -----------------------
	//
	// При отправке формы (submit) проверяются все элементы. 
	// Реагирует на нажатие enter на элементе input и кликом.
	//
	// -----------------------
	form.addEventListener('submit', function(event) {
	    event.preventDefault();
	    // убираем лишние классы с формы
	    form.classList.remove(valObject.formValidClass);
	    form.classList.remove(valObject.formInvalidClass);
	    // валидация всех input формы на правильность заполнения cheсkFieldInput()
	    // +
	    // валидация на заполнение обязательных полей checkRequiredField()
	    if (checkRequiredField() && cheсkFieldInput()) {
	    	form.classList.add(valObject.formValidClass);
	    } else {
	    	form.classList.add(valObject.formInvalidClass);
	    }
	});

	// -----------------------
	//
	// валидация всех input формы на правильность заполнения
	// если все input формы правильно заполнены, то возвращает true
	//
	// -----------------------
	function cheсkFieldInput() {
		var log = true;
		inpupList.forEach(function(input) {
			validateInput(input);
			log = log && (input.getAttribute('class') != valObject.inputErrorClass); // проверяем, есть ли ошибка в заполнении (по классу inputErrorClass)
		});
		return log;
	};

	// -----------------------
	//
	// Валидация Input на правильность заполнения
	// дополнительная функция к cheсkFieldInput()
	//
	// -----------------------
	function validateInput(input) {
		var log = true;
		switch (input.dataset.validator) {
			case 'letters':
				removeErrorItem();
				if ((/^[а-яёa-z]+$/i.test(input.value))||(/^$/.test(input.value))) {
				} else {
					addErrorItem(input);
				};
			break;
			case 'number':
				removeErrorItem();
				// условие заполнения поля с number
				var ifNumber = (/^-?\d+$/i.test(input.value))||(/^$/.test(input.value));
				var minAge = parseInt(input.dataset.validatorMin);
				var maxAge = parseInt(input.dataset.validatorMax);

				if (ifNumber) {
					if (checkNumRange()) { // проверяем, есть ли ограничения по диапазону чисел
						if (!(input.value >= minAge && input.value <= maxAge)) {
						addErrorItem(input); // если выходит за диапазон
						};
					};
				} else { // если не число
					addErrorItem(input);
				};
			break;
			case 'regexp':
				removeErrorItem();
				var regPattern = new RegExp(input.dataset.validatorPattern);
				if (!(regPattern.test(input.value)||(/^$/.test(input.value)))) {
					addErrorItem(input);
				};
			break;
		};
		// убираем класс ошибки inputErrorClass на поле input
		function removeErrorItem() {
			input.classList.remove(valObject.inputErrorClass);
		}
		// проверяем, есть ли ограничения по диапазону чисел
		function checkNumRange() {
			if ((input.dataset.hasOwnProperty('validatorMin'))&&(input.dataset.hasOwnProperty('validatorMax'))) {
				return true;
			} else return false;
		};
	};

	// -----------------------
	//
	// валидация обязательных полей. 
	// Если все нужные поля заполнены и нет ошибок заполнения, то возвращает true
	//
	// -----------------------
	function checkRequiredField() {
		var log = true;
		inpupList.forEach(function(input) {
			// проверяем, содержит ли input data-required
			if (input.dataset.hasOwnProperty('required')) {
				// проверяем, заполнена ли форма
				 log = log && (!/^$/.test(input.value));
				 if (!log) {
				 	addErrorItem(input);
				 };
			} 
		});
		return log;
	};

	// -----------------------
	//
	// добавляем класс ошибки inputErrorClass на поле input
	//
	// -----------------------
		function addErrorItem(input) {
			input.classList.add(valObject.inputErrorClass);
		};

}


