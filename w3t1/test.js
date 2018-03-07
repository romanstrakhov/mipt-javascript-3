function dothis() {
	console.log("dothis:");
	console.info(arguments);


}


function rundothis(dothis) {
	setTimeout( function() {
		console.log("rundothis:");
		dothis(null, "1000ms");
	}, 1000);
}



a = rundothis(dothis, function( console.log("1"), console.log(2) ) { console.log("3"); } ;

console.log("unnamed:");