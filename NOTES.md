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

  