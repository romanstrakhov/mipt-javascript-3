'use strict';

// Код валидации формы
function validateForm(obj){

    var form = document.getElementById(obj.formId);

    var elemsList = Array.from(form.querySelectorAll('input'));

    form.addEventListener('submit',function(event){

        event.preventDefault();
        var res = elemsList.reduce(function(previousValue, currentValue, index, array) {
            return previousValue && ValidateInput(currentValue);
        },true);

        if(res){ 
            form.classList.add(obj.formValidClass);
            form.classList.remove(obj.formInvalidClass);
        }
        else {
            form.classList.remove(obj.formValidClass);
            form.classList.add(obj.formInvalidClass);
        }
    });


   
    elemsList.forEach(function(elem) {
        
        elem.addEventListener('focus',function(event){
            this.classList.remove(obj.inputErrorClass);            
        });

        elem.addEventListener('blur',function(event){
            if(!ValidateInput(this))
                this.classList.add(obj.inputErrorClass); 
        });
    });

    function ValidateInput(input){
        
        if (!input.dataset.hasOwnProperty('required') && !input.value){
            return true;
        }

        if (!input.dataset.hasOwnProperty('required') || input.value){
            if(input.dataset.hasOwnProperty('validator')){
                var validator = input.dataset.validator;
                switch(validator){
                    case "number":
                        return  validateNumber(input.value, input.dataset);
                        break;
                    case "letters":
                        return  validateLetter(input.value);
                        break;
                    case "regexp":
                        return validateRegexp(input.value, input.dataset.validatorPattern);
                        break;
                    }
                }
            }
            else{
                return false;
            }

        return true;
    }

    function validateNumber(value, { validatorMin ,validatorMax }){
        
        if(value.length==0)
            return true;
        if (isNumeric(value)){
            var v = parseInt(value);
            if(validatorMin && v<validatorMin)
                return false;
            if(validatorMax && v>validatorMax)
                return false;
        }
        else
            return false;
        return true;
    }

    function validateLetter(value)
    {
        return validateRegexp(value,  /^[A-Za-zА-Яа-яёЁ]+$/);
    }

    function validateRegexp(value, regexp )
    {
        if(value.match(regexp)===null)
            return false;
        return true;
    }

    function isNumeric(num){
        return !isNaN(+num)
      }
    
}