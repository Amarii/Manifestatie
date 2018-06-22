// import 'bootstrap'

var joined = false;
var socket = io();

socket.on('start', playScreen.start)
socket.on('show-result', playScreen.showAnswer)

socket.on('disconnect', function() {
    document.location.reload();
});

setInterval(function() {
    socket.emit("hithere");
}, 2000);