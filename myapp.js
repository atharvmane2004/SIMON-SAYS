let level = 0;
let started = false;
let h3 = document.querySelector('h3');
let score = 0;
let highestScore = 0;
let userArray;

let red = document.querySelector('red');
let yellow = document.querySelector('yellow');
let green = document.querySelector('green');
let blue = document.querySelector('blue');
let highestScoreLabel = document.getElementById('HIGHSCORE');

let buttonsArr = ["red", "green", "yellow", "blue"];

let computerArray = [];

document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;
        levelUp();
    }

})


//GENERATES RANDOM COLOR INDEX
function generateRandomIndex() {

    let randomIndex = Math.floor(Math.random() * 4);
    computerArray.push(randomIndex);
    console.log('**********');
    console.log("Random Color : ", buttonsArr[randomIndex]);

    return randomIndex;
}


//FLASHES UPON COMPUTER'S CLICK(i.e WHEN RANDOM NUMBER IS GENERATED) 
function flashCard(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}


//FLASHES UPON USERS CLICK (GREEN)
function flashUser(btn) {
    btn.classList.add("flashUser");
    setTimeout(() => {
        btn.classList.remove("flashUser");
    }, 350);
}


//INCREASES LEVEL AFTER CORRECT GUESS FROM USER
function levelUp() {
    userArray = [];
    level++;
    h3.innerText = "Level " + level;
    let index = generateRandomIndex();
    let btn = document.querySelector(`.${buttonsArr[index]}`);
    flashCard(btn);
}


let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    //DETECT USERS CLICK
    btn.addEventListener("click", btnPressed);
}

//ADD BUTTON PRESSED BY USER TO  userArray AND PRINT THAT INDEX
function btnPressed(event) {

    let pressedButtonNumber = parseInt(this.innerText) - 1;
    console.log("presseed : ", pressedButtonNumber)
    userArray.push(pressedButtonNumber);
    flashUser(this); displayCompArr();
    displayUserArr();
    chechAns(userArray.length - 1);
}


//RESTART GAME AFTER LOOSING
function restart() {
    started = false;
    level = 0;
    userArray = [];
    computerArray = [];
    score = 0;
    document.querySelector('body').classList.add("wrongScreen");

}


//CHECK IF USER HAS CHOOSED RIGHT COLOR IN SEQUENCE BY MATCHING LAST INDEX OF USER ARRAY AND COMPUTER ARRAY
function chechAns(index) {

    if (userArray[index] === computerArray[index]) {
        if (userArray.length == computerArray.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let score = level;
        
        h3.innerHTML = `Game Over. Your Score is <b>${score}</b>. <br>Please Press Any Key to Continue`;
        if(isHighscore(score)){
            highestScoreLabel.innerText = `HIGHSCORE : ${score}`;
        }
        wrongScreen();
        restart();
    }
}

function wrongScreen() {
    document.querySelector('body').classList.add("wrongScreen");
    setTimeout(() => {
        document.querySelector('body').classList.remove("wrongScreen");

    }, 280);
}

function isHighscore(level){
    if(level > highestScore){
        highestScore = level;
        return level;
    }
    return;
}
//DISPLAYS COMPUTER ARRAY
function displayCompArr() {
    console.log("Computer Array :", computerArray);
}

//DISPLAYS USER ARRAY
function displayUserArr() {
    console.log("User Array :", userArray);
}

