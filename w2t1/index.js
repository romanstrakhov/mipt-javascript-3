module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {

	this.__values = [];

}


// Методы коллекции
Collection.prototype.values = function () {

	return this.__values;

};
// другие методы

Collection.prototype.append = function(item) {

	if(item instanceof Collection) {
		item.values().forEach( function(value){
			this.append(value);
		}, this);
	} else {
		this.__values.push(item);
		console.log("Append: "+item+" total: "+this.__values.length);
		// console.info(item);
	}
};

Collection.prototype.count = function() {
	console.log("Counting:");
	console.info(this);
	console.log("=> " + this.__values.length);

	return this.__values.length;
};

Collection.prototype.at = function(position) {

	console.log("At("+position+"):");

	if ((position <= 0) || (position>this.__values.length)) {
		console.log("=> no element");
		return null;
	} else {
		console.log("=> "+this.__values[position-1]);
		return this.__values[position-1];
	};

};

Collection.prototype.removeAt = function(position) {

	console.log("RemoveAt("+position+"):");

	if ((position <= 0) || (position>this.__values.length)) {
		console.log("=> no element");
		return false;
	} else {
		this.__values.splice(position-1,1);
		console.log("=> "+this.__values[position-1]);
		return true;
	};

};


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (items) {

	var from_collection = new Collection();
	items.forEach(function(value) {
		this.append(value);
	}, from_collection)

	return from_collection;
};
