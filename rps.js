let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const uscore = document.querySelector("#userscore");
const cscore = document.querySelector("#compscore");
const resetBTN = document.querySelector("#resetbtn");


const genCompChoice = () => {
    let option = ["rock", "paper", "scissors"]
    const rndIdx = Math.floor(Math.random() * 3);
    return option[rndIdx];
    
}

const playGame = (userChoice) => {
    let userWin;
    // console.log("User's Choice is:",userChoice);
    const compChoice = genCompChoice();
    // console.log("Comp's Choice is:",compChoice);

    if(userScore == 10 || compScore == 10){
        return;
    }

    if (userChoice == compChoice) {
        gameDraw();
        return;
        
    }
    else {

        if (userChoice == "rock") {
            userWin = compChoice == "paper" ? false : true;
        }
        else if (userChoice == "paper") {
            userWin = compChoice == "scissors" ? false : true;
        }
        else {
            userWin = compChoice == "rock" ? false : true;
        }
    }
    showWinner(userWin, userChoice, compChoice);
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log("choice is clicked" , userChoice)
        playGame(userChoice);
    });
});

const gameDraw = () => {
    // console.log("It's a Draw");
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "black";

}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        // console.log("You Won");
        msg.innerText = `You Won. ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";

        if(userScore < 10 && compScore < 10){
        userScore++;
        uscore.innerText = userScore;
        }

        if (userScore == 10) {
            const start = () => {
                setTimeout(function () {
                    confetti.start()
                }, 100);
            };
            start();

            msg.innerText = "Hurray!!! You Won the Game!";
            msg.style.backgroundColor = "green";
            reset();
            disable();
        }
        
    }
    else {
        // console.log("You Lost");
        msg.innerText = `You Lost. ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";

        if(compScore < 10 && userScore < 10){
        compScore++;
        cscore.innerText = compScore;
        }

       
        if(compScore == 10){
            msg.innerText = "Game Over!";
            msg.style.backgroundColor = "darkred";
            reset();
            disable();
           
        }
    }
}

resetBTN.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    uscore.innerText = userScore;
    cscore.innerText = compScore;
    msg.innerText = "Play Again!";
    msg.style.backgroundColor = "black";
    

    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 100); 
    };
    stop();
    enable();
})

const reset = () => {
    setTimeout (() => {
    userScore = 0;
    compScore = 0;
    uscore.innerText = userScore;
    cscore.innerText = compScore;
    msg.innerText = "Play Again!";
    msg.style.backgroundColor = "black"
    
    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 100); 
    };
    stop();
    enable();

    }, 5000);

    
}

const disable = () => {
    choices.forEach((choice) => {
        choice.disabled = true;
        choice.style.opacity = 0.5;   
      });
    // msg.innerText = "Gsme Over!"
    // msg.style.backgroundColor = " yellow"  
};

const enable = () =>{
    choices.forEach((choice) => {
        choice.disabled = false;
        choice.style.opacity = 1;
        // choice.style.backgroundColor = ""   
      });
}
