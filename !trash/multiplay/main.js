var http = require('http'),
	fs = require('fs');

var app = http.createServer(function(request, response) {
	fs.readFile("client.html", 'utf-8', function(error, data) {
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});
		response.write(data);
		response.end();
	});
}).listen(1337);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
	fs.readFile('./data.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		io.sockets.emit("init_to_client", {
			message: data
		});
	});

	socket.on('message_to_server', function(data) {
		io.sockets.emit("message_to_client", {
			message: data["message"]
		});
	});
});
