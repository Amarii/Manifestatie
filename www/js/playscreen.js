var playScreen = {
    start: function() {
        if(!joined) return;
    
        document.getElementById("please-wait").style.display = "none";
        document.getElementById("average-answer").style.display = "none";
        document.getElementById("guess-screen").style.display = "block";
    },

    secondWindow: function() {
        if(!joined) return;
    
        document.getElementById("please-wait").style.display = "none";
        document.getElementById("average-answer").style.display = "none";
        document.getElementById("guess-screen").style.display = "none";
    },

    giveAnswer: function(second) {
        var input = document.getElementById("input-amount-" + (!second ? 1 : 2));
    
        // What's the value?
        if(input.value === "")
        {
            alert("Kies een getal");
            input.focus();
            return;
        }
    
        console.log(typeof input.value);
    
        // Is this numeric?
        if(isNaN(input.value))
        {
            alert("Dit is geen getal jongens....");
            input.focus();
            return;
        }
    
        socket.emit("respond", input.value);
    
        // Hide guess screen
        document.getElementById("guess-screen").style.display = "none";
        document.getElementById("average-answer").style.display = "none";
        document.getElementById("please-wait-two").style.display = "block";
    },

    showAnswer(value)
    {
        if(!joined) return;
        document.getElementById("please-wait").style.display = "none";
        document.getElementById("average-answer").style.display = "block";
        document.getElementById("guess-screen").style.display = "none";
        document.getElementById("please-wait-two").style.display = "none";
        document.getElementById("average-answer-value").innerHTML = value;
    }
};

document.getElementById("counter-sending").addEventListener("click", function() {
    playScreen.giveAnswer();
});

document.getElementById("form-submit-dont").addEventListener("onsubmit", function(e) {
    e.preventDefault();
});