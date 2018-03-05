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