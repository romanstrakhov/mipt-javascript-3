'use strict';

// Код валидации формы

// formId: 'profile',
// formValidClass: 'form_valid',
// formInvalidClass: 'form_invalid',
// inputErrorClass: 'input_error'

var validateForm = function(args) {

	var formId = checkArgument(args, 'formId', 'profile');
	var formValidClass = checkArgument(args, 'formValidClass', 'form_valid');
	var formInvalidClass = checkArgument(args, 'formInvalidClass', 'form_invalid');
	var inputErrorClass = checkArgument(args, 'inputErrorClass', 'input_error');

	// console.info(formId, formValidClass, formInvalidClass, inputErrorClass);

	var form = document.getElementById(formId);

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		var nErrors = 0;
		for (var i=0; i<inputs.length; i++) {
			if (!validateInput(inputs[i])) {
				nErrors++;
				// console.log("Invalid: " + inputs[i].id);		
			}
		}
		setValid(event.target, nErrors===0);


	});

	// inputs

	var inputs = form.querySelectorAll('input');

	// console.info(inputs);

	for (var i=0; i<inputs.length; i++) {
		inputs[i].addEventListener('blur', function(event) {
			// console.log('<blur> ' + event.target.id);
			validateInput(event.target);
		});

		inputs[i].addEventListener('focus', function(event) {
			// console.log('<focus> ' + event.target.id);
			setError(event.target, false);
		});


	}



	function validateInput(item) {


		// console.log("validator on " + item.id);
		// console.info(item.dataset);
		// console.info(item.dataset.validator);

		var required = item.dataset.required;

		if (required!==undefined && item.value==='') {
			// console.log("Validator: Empty field " + item.id)
			return !setError(item, true);
		}

		// required test
		var validator = item.dataset.validator;			

		// content validator		
		switch (validator) {
			case 'letters':
				return !setError(item, !isLetters(item));
			case 'number':
				return !setError(item, !isNumber(item));
			case 'regexp':
				return !setError(item, !isRegexp(item));
			case undefined:
				// console.log('Warning: ' + item.id + ' no validator set' );
				return true;
			default:
				// console.log('Warning: ' + item.id + ' unknown validator: \'' + validator +'\'' );
				return true;
		}	
	}


	function isLetters(item) {

		var letters = "abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
		letters += letters.toUpperCase();

		var string = item.value;

		for (let i=0; i<string.length; i++) {
			if (letters.indexOf(string[i]) === -1) return false;
		}

		return true;
	}

	
	function isNumber(item) {

		var value = Number(item.value);


		if (isNaN(value) || item.value.indexOf(' ')!==-1) {
			return false;
		}

		if (item.dataset.validatorMin && value < item.dataset.validatorMin) {
			return false;
		}

		if (item.dataset.validatorMax && value > item.dataset.validatorMax) {
			return false;
		}

		return true;
	}

	function isRegexp(item) {

		return item.value==='' || item.value.match(item.dataset.validatorPattern);
	}


	function setValid(form, state) {
		if ( (arguments.length<2) || state ) {
			// set valid
			if (form.classList.contains(formInvalidClass)) {
				form.classList.remove(formInvalidClass);
			}
			if (!form.classList.contains(formValidClass)) {
				form.classList.add(formValidClass);
			}
			return true;
		} else {
			// set invalid
			if (form.classList.contains(formValidClass)) {
				form.classList.remove(formValidClass);
			}
			if (!form.classList.contains(formInvalidClass)) {
				form.classList.add(formInvalidClass);
			}
			return false;
		}
	}

	function setError(item, state) {
		if ( (arguments.length<2) || state ) {
			// set error
			if (!item.classList.contains(inputErrorClass)) {
				item.classList.add(inputErrorClass);
			}
			return true; 
		} else {
			// remove error
			if (item.classList.contains(inputErrorClass)) {
				item.classList.remove(inputErrorClass);
			}
			return false;
		}
	}	

	function checkArgument(args, item, value) {
		if ( !(args instanceof Object) || !args.hasOwnProperty(item) ) {
			var result = value;
			// console.log ('Warning: '+ item + ' missing, set to default value \'' + value + '\'');
		} else {
			var result = args[item];
			// console.log (item + ' correctly set to \'' + value + '\'');
		}
		return result;
	}

}
