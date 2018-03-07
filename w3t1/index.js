/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {

	var dataset = [];
	var order = [];
	var numOps = operations.length;
	var numOpsDone = 0;

	if (numOps==numOpsDone) callback(null, []);

	var next = function() {
		// var args = [].slice.call(arguments);
		if (arguments.length==2) {
	// @param null
	// @param data
			dataset.push(arguments[1]);
			numOpsDone++;
			// console.log("dataset push "+arguments[1]);
			// console.log("=> ");
			// console.info(dataset);
			if (numOpsDone==numOps) {
				// console.log("! all operations done");
				callback(null, dataset);
			}

		} else if (arguments.length==1) {
	// @param error
			// console.log("--- error in call!");
			callback(arguments[0]);
		} else {
	// фигня какая-то
		throw new Error ('фигня какая-то');
		}
	};

	// console.log("numOps:" + numOps);

	operations.forEach( function(item, index) {
		item(next);
	}, this);



};

