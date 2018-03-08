var http = require('http');
var server = new http.Server();

// Подписка на событие
server.on('request', function(req, res) { // Обработчик события
// req instanceof http.IncommingMessage
	console.info(req.method); // GET
	console.info(req.headers); // {..}
	console.info(req.url); // 
// res instanceof http.ServerResponse	
	console.info(res.statusCode); // 200
	res.setHeader('content-type', 'text/html');
	res.write('<strong>Hello!</strong>');

	res.end('Hello, User!');
});

server.listen(8080);



  