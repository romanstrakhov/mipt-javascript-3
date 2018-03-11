# Конструкторы

````
function Person(name) {
	// var this = {}
	this.name = name;
	this.type = 'human';
	// Object.setPrototypeOf(this, Student.prototype)
	// return this;	
}

var Student = function(name) {
	Person.call(this.name);
	// this.prototype.call(this.name);
}

var Mike = new Student('Mike');

Student.prototype = Object.create(Person.prototype);
Student.prototype.sleep = function() {
	console.log("Zzzz...");
};

// mike.constructor.name === "Student"
// mike instanceof Student === true
// mike instanceof Person == true

````

# Асинхронности

SetTimeout (func, [delay, param1, param2, ... ]);
var id = SetInterval (func, [delay, param1, param2, ... ]);
clearInterval(id);


Работа с файлами

var fs = require('fs');
var fileName = __dirname + '/data.json';

var data = fs.readFileSync(filename, 'utf-8');

var data = fs.readFile(filename, 'utf-8', function(err, data) {});

## Promises ##

var promise = new Promise( function(resolve, reject){
  fs.readFile(filename, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resove(data);
    }
  }
});

promise.then( function(data){...}, function(err){...});

promise.catch
promise.resolve
promise.reject
promise.all

function readFile(name) {
  return new Resolve ( function(resolve, reject){
    fs.readFile(name, function(err,data){
      err ? reject(err) : resolve(data);
    })
  })
};

Promise
  .all([
    readFile(filename1),
    readFile(filename2)
    ])
  .then(function (data) {
    console.log (data[0] + data[1]);
  }); 

Promise
  .resolve('{ ... }')
  .then (console.log);

Promise
  .reject(new Error('...'))
  .catch (console.error);


# Node.js

## Ресурсы

CPU — вычисления
Memory — 
Система ввода-вывода


## Паттерн Reactor
- Application: IO / Callback Handler
- Requests: IO -> Event Demultiplexer -> (return) / (done) --> Callback
- Results: Callback -> Event Queue

Apache: multithreading (>memory)
Nginx: Reactor


Ryan Dahl: Node.js


Event Demultiplexer (Event notification interface)
( epoll | kqueue | I/O Completion Port API ) -> LIBUV interface

## libuv

linux: 

Операции над локальными файлами всегда блокирующие
Решение -> multithreading (по умолчанию 4 потока)
=> 4 долгих операции над локальными файлами блокируют все приложение

## Паттерн Callback

- Callback идет последним аргументом
- Error comes first

## API в Node.js = Core Javascript API

- fs — работа с файловой системой
- http – запросы
- console — логирование

Core JS API + bindings + LIBUV + V8 = Node.js

Четные версии — LTS (стабильные, long-time support)
Нечетные версии — текущие 

## Модули Node.js ##

Язык модулей — по спецификации CommonJS

// module = {
//  filename: 'absolute_path/module.js',
//  exports: {}
// }

module.exports.functionname = function () {};
exports.functionname = function () {}; // лакончиная запись, но сработает только для объекта, т.к. по сути просто перезапись поля

var module = require('./module.js');
module.functionname();

module.exports = function () {};

var functionname = require('./module.js');
functionname();

NB: Можно экспортировать не только объект или функцию, но и число, и конструктор, объект на основе конструктора

Встроенные модули (Core API):
- url — работа с адресами (parse, ... etc)

Сторонние модули:
- lodash — полезные методы для работы с объектами и массивами 

## Кеширование модулей после первого подключения

require.cash = 
{
  'absolute_path/module.js': {
    filename: '..',
    exports: {}
  }
}

## npm 

npm init — создание модуля -> файл-манифест package.json
npm search — поиск пакета в хранилище
npm show packagename — информация о пакете
npm install packagename[@version] — установка пакета в качестве зависимости
  --save — зависимость фиксируется в package.json
  --save-dev — зависимости не нужные для работы модуля (например, тестирование)

package.json
{
  "dependencies": {
    "express": "1.2.3",
    "express": ">1.2.3",
    "express": ">=1.2.3",
    "express": "~1.2.3", // >=1.2.3 <1.3.0
    "express": "^1.2.3", // >=1.2.3 <2.0.0
    "express": "1.2.*",
    "express": "latest",
    "express": "git://github.com/expressjs/express.git",
    "express": "git://github.com/expressjs/express.git#4.13.4", // тег
    "express": "git://github.com/expressjs/express.git#master", // ветка
    "express": "git://github.com/expressjs/express.git#f3d99a", // commit
    "express": "expressjs/express.git", // сокращенная запись для github.com
    ...
  }
}

.npmrc

save=true // всегда фиксировать зависимости
save-exact=true // всегда фиксировать версию (рекомендуется!)
init-author-name='Roman Strakhov' // имя по умолчанию для новых пакетовъ

## Node.js Core API 

var http = require('http');

## Event Emitter

Позволяет подписывать объекты на события и назначать для этих событий обработчики:

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('log', console.info);

emitter.emit('log', 'Hello!'); // Hello!
emitter.emit('unknown event'); // Do nothing
emitter.emit('error'); // Uncaught 'error' event!

Модуль url
- url.parse()
- url.format()

Модуль querystring
- querystring.parse( "a=1&b=2" )
- querystring.stringify( { a:1, b:2 } )

## Работа с файловой системой (модуль fs)

var fs = require('fs');
fs.readFile(absolute_filename, function(err, content) { 
  console.info(content); // typeof(content) == "buffer"
  console.info(content.toString('utf-8'));
});

fs.readFile(absolute_filename, 'utf-8', function(err, data) { 
  console.info(data); // typeof(data) == String
});


require('buffer'); // модуль для работы с бинарными данными, массив чисел 0-255

var letterB = new Buffer([98]);
console.info(letterB.toString()); // b
console.info(letterB.toString('utf-8')); // b

fs.appendFile()
fs.writeFile()
fs.unlink()
fs.mkdir()

fs.stat(__filename, function (stats) {
  console.info(stat.isDirectory()); // false
};

fs.watch(__filename, function (event, filename) {
  console.info(event); // change (изменен) or rename (переименован)
});



# DOM #

document.getElementByID() // object HTMLFormElement
document.getElementByTagName() // object HTMLCollection — устаревший!
document.querySelector("#idname") // object HTMLFormElement
document.querySelector(".classname") // object HTMLFormElement
document.querySelector('[name="login"]') // object HTMLFormElement

document.querySelector() возврацает только первый элемент
document.querySelectorAll() // object Nodelist — не массив! (array-like: индексирование, .length)

var [Array] = Array.prototype.slice.call( [object Nodelist] )
var [Array] = Array.from( [object Nodelist] )

## Атрибуты

var form = document.getElementById('auth');

form.getAttribute('action'); // '/login/'
form.hasAttribute('method'); // false
form.setAttribute('method', 'POST');
form.removeAttribute('method');

### data-атрибуты

form.getAttribute('data-form-value'); // 123
form.dataset.formValue; // 123
form.dataset.hasOwnProperty('formValue'); // true
form.hasAttribute('data-form-value'); // 123

## Свойства ##

Не слишком предсказуемые! Использовать осторожно!

form.action; // "https://yandex.ru/login/"
form.method; // "get"
form.id; // "auth"

form.classname; // 'auth form'
form.classname += ' login-form';

### Классы ###

form.classList.add('login-form');
form.classList.item(1); // 'form'
form.classList.item(2); // 'login-form'
form.classList.contains('login-form'); // true
form.classList.remove('login-form');

## Создание элементов ##

var elem = document.createElement('span');

elem.className = 'error';
elem.setAttribute('id','auth-error');
elem.setAttribute('status','auth-error');
elem.textContent = 'Error!';

document.body.appendChild(elem);

var clone = elem.cloneNode(false); // true — копировать дочерние элементы 


## События в DOM ##

Можно явно пропистать в HTML:
<... onsubmit="js-function">
<... onclick="js-function">
но с этим невозможно гибко работать (только один обработчик, связь HTML-JS, при изменении HTML нужно помнить, нельзя навешивать динамически)

form.addEventListener('submit', submitHandler);
form.addEventListener('submit', yetAnotherSubmitHandler);
form.addEventListener('submit', function (event) {
  console.log(this, event);
});

Обработчики вызываются в прямом порядке

this — объект, в котором произошло событие (???)

event.target — последний лист дерева, в котором произошло событие
event.altKey
event.ctrlKey
event.shiftKey
event.type

Обработка событий (третий аргумент addEventListener):
- Bubbling/всплытие (по умолчанию, false) — с самого глубокого элемента
- Capturing/перехват (true) — погружается начиная с самого верхнего
- Bubbling + stopPropagation <= event.stopPropagation()
- Caprturing + stopPropagation <= event.stopPropagation()
- Отмена всплытия/погружения и отмена всех других обработчиков <= event.stopImmediatePropagation()

Отмена действий по умолчанию:
event.preventDefault();

Делегирование событий родительским узлам:































