var http = require('http');

var req = http.request({
	hostname: 'localhost',
	port: 8080
});

// Подписка на ответ
req.on('response', function (response) {
	var body = '';
	
	response.on('data', function (chunk) {
		body += chunk; // res.write(chunk)
	});

	response.on('end', function () {
		console.info(body); // res.end()
	});
});

req.end();
