var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/www/public/index.html');
});

app.get('/css/main.css', function (req, res) {
    res.sendFile(__dirname + '/www/public/css/main.css');
});

app.get('/js/bundle.js', function (req, res) {
    res.sendFile(__dirname + '/www/public/js/bundle.js');
});

app.get('/js/sockets.js', function (req, res) {
    res.sendFile(__dirname + '/www/js/sockets.js');
});

app.get('/js/home.js', function (req, res) {
    res.sendFile(__dirname + '/www/js/home.js');
});

app.get('/js/playscreen.js', function (req, res) {
    res.sendFile(__dirname + '/www/js/playscreen.js');
});

app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', function (req, res) {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
});

app.get('/is_super_admin_dashboard_op4/', function (req, res) {
    res.sendFile(__dirname + '/www/public/dashboard.html');
});


let jelly = 
{
    playing: [],
    responses: [],
    peopleResponded: 0,
    currentNumber: 593,

    start()
    {
        console.log('Start requested');

        io.emit("start", 'start');

        jelly.peopleResponded = 0;
        jelly.responses = [];

        console.log("Players: " + jelly.playing.length)

        jelly.timer();
        
    },

    addResponse(response)
    {
        jelly.peopleResponded++;
        jelly.responses.push(Number(response));
    },

    sendResult()
    {
        let totalAnswer = 0;

        console.log(this.responses);

        for(let i = 0; i < this.responses.length; i++)
        {
            totalAnswer += this.responses[i];
        }
        
        let ourAnswer = Math.floor(totalAnswer / this.responses.length);

        io.emit("show-result", ourAnswer);
    },

    timer()
    {
        // Next
        let timer = setInterval(() => {
            if(this.peopleResponded >= jelly.playing.length) {
                clearInterval(timer);
                clearTimeout(timeout);
                this.sendResult();
            }else{
                console.log('Waiting');
            }
        }, 1000);

        // Go anyway
        let timeout = setTimeout(() => {
            this.sendResult();
            clearInterval(timer);
        }, 55000);
    }
};

// Connect
io.on('connection', function (socket) {
    console.log("Welcome " + socket.id);

    socket.on('joining', function() {
        jelly.playing.push(socket.id);
        console.log("Joined: " + socket.id);
    });

    socket.on('disconnect', function (data) {
        
        var i = jelly.playing.indexOf(socket.id);
        jelly.playing.splice(i, 1);

        console.log("Bye: " + socket.id);
    });

    socket.on('respond', jelly.addResponse);

    socket.on('admin-dashboard-start-round', jelly.start);

    // setInterval(function() {
    //     io.emit("participants", {
    //         a: jelly.peopleResponded,
    //         b: jelly.playing
    //     });
    // }, 1500);
});