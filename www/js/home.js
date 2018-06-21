
document.getElementById("connect").addEventListener("click", function() {
    socket.emit("joining", "join");
    joined = true;

    document.getElementById("startscreen").style.display = "none";
    document.getElementById("please-wait").style.display = "block";
});