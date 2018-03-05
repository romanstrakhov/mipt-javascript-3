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
}

Collection.prototype.count = function() {
	console.log("Counting:");
	console.info(this);
	console.log("=> " + this.__values.length);

	return this.__values.length;
}


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
