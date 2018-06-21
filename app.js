var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/www/index.html');
});

app.get('/is_super_admin_dashboard_op4/', function (req, res) {
    res.sendfile(__dirname + '/www/dashboard.html');
});

io.on('connection', function (socket) {
  socket.on('echo', function (data) {
    socket.emit('telme', data);
  });
});

console.log('Server running at http://localhost:80/')