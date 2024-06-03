// Fixing the bug of reset button while user win or lose the game and while click on the reset button than the score is changed automatically because of setTimwout function is called and it is reset the score after 5 seconds.. I'll make changes in your code my suggestion is if you change timing of the function or disable the reset button while user win or lose the game so that the code is working properly....


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
    const compChoice = genCompChoice();

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
        playGame(userChoice);
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "black";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        msg.innerText = `You Won. ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";

        if(userScore < 10 && compScore < 10){
            userScore++;
            uscore.innerText = userScore;
        }

        if (userScore == 10) {
            const start = () => {
                setTimeout(function () {
                    confetti.start();
                    resetBTN.disabled = true; // Reset BTN disabled
                }, 100);
            };
            start();

            msg.innerText = "Hurray!!! You Won the Game!";
            msg.style.backgroundColor = "green";
            winSound.play();
            winSound.volume = 0.2;
            reset();
            disable();
        }
    }
    else {
        msg.innerText = `You Lost. ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";

        if(compScore < 10 && userScore < 10){
            compScore++;
            cscore.innerText = compScore;
        }

        if(compScore == 10){
            msg.innerText = "Game Over!";
            msg.style.backgroundColor = "darkred";
            loseSound.play();
            loseSound.volume = 0.2;
            reset();
            disable();
            resetBTN.disabled = true; // Disable reset button when player loses
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
            confetti.stop();
            resetBTN.disabled = false;
        }, 100);
    };
    stop();
    enable();
});

const reset = () => {
    setTimeout(() => {
        userScore = 0;
        compScore = 0;
        uscore.innerText = userScore;
        cscore.innerText = compScore;
        msg.innerText = "Play Again!";
        msg.style.backgroundColor = "black";

        const stop = () => {
            setTimeout(function() {
                confetti.stop();
            }, 100);
        };
        stop();
        enable();
        // No need to enable reset button here as it's already enabled when the player wins
    }, 5000);
}

const disable = () => {
    choices.forEach((choice) => {
        choice.disabled = true;
        choice.style.opacity = 0.5;
    });
};

const enable = () => {
    choices.forEach((choice) => {
        choice.disabled = false;
        choice.style.opacity = 1;
    });
}

const winSound = new Audio('./win.mp3');
const loseSound = new Audio('./lose.mp3');