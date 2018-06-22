// import 'bootstrap'

var joined = false;
var socket = io();


function start()
{
    socket.emit("admin-dashboard-start-round");
}

socket.on('start', playScreen.start)
socket.on('show-result', playScreen.showAnswer)

setInterval(function() {
    socket.emit("hithere");
}, 2000);