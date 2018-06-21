var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/www/index.html');
});

app.get('/main.css', function (req, res) {
    res.sendfile(__dirname + '/www/main.css');
});

app.get('/bundle.js', function (req, res) {
    res.sendfile(__dirname + '/www/scripts.js');
});

app.get('/scripts.js', function (req, res) {
    res.sendfile(__dirname + '/www/scripts.js');
});

app.get('/is_super_admin_dashboard_op4/', function (req, res) {
    res.sendfile(__dirname + '/www/dashboard.html');
});


// Connect
io.on('connection', function (socket) {
    console.log("Welcome " + socket.id);
    jelly.connected++;

    socket.on('disconnect', function (data) {
        jelly.connected--;
        console.log("Bye " + socket.id);
    });

    socket.on('respond', jelly.addResponse);

    socket.on('admin-dashboard-start-round', jelly.start);

    io.emit("participants", jelly.connected);
});


let jelly = 
{
    connected: 0,
    responses: [40, 30, 50, 60, 40, 30, 100, 200, 300],
    currentNumber: 593,

    start()
    {
        io.emit("start");

        this.peopleResponded = 0;

        this.timer();
        
    },

    addResponse(response)
    {
        this.responses.push(response);
    },

    sendResult()
    {
        let totalAnswer = 0;

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
            if(this.peopleResponded >= this.connected) {
                clearInterval(timer);
                clearTimeout(timeout);
                this.sendResult();
            }
        }, 1000);

        // Go anyway
        let timeout = setTimeout(() => {
            this.sendResult();
            clearInterval(timer);
        }, 55000);
    }
};

jelly.start();

console.log('Server running at http://localhost:80/')