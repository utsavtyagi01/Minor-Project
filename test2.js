// Constants
let foodTokens = 15; // Amount of food tokens
let gameInstructions = [
    "Welcome to the Swimming Race Game!",
    "Help the swimmers reach the other side of the pool!",
    `You have ${foodTokens} food tokens to feed your swimmers.`,
    "Click on a swimmer's lane to make them swim faster.",
    "Remember to save your tokens!",
    "Your choices affect how many swimmers reach the end."
];

// Variables
let instructionIndex = 0; // Current instruction index
let instructionCharIndex = 0; // Current character index in the instruction
let animationInterval; // Interval for animating instructions

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lanes = []; // Array to store swim lanes
const swimmers = []; // Array to store swimmers
let remainingTime = 10; // Remaining time in seconds
let gameStarted = false;

// Function to animate instructions
const animateInstructions = () => {
    const instructionElement = document.getElementById("game-instruction");

    if (instructionIndex < gameInstructions.length) {
        const currentInstruction = gameInstructions[instructionIndex];
        if (instructionCharIndex < currentInstruction.length) {
            instructionElement.textContent += currentInstruction.charAt(instructionCharIndex);
            instructionCharIndex++;
        } else {
            // Move to the next instruction
            instructionIndex++;
            instructionCharIndex = 0;
            instructionElement.innerHTML += "<br><br>";
        }
    } else {
        // Finished all instructions
        clearInterval(animationInterval);
        document.getElementById("start-button").style.display = "block";
    }
};

// Function to draw swim lanes
const drawLanes = () => {
    const laneWidth = canvas.width / 6;

    for (let i = 0; i < 6; i++) {
        // Create swim lanes
        const laneX = i * laneWidth;
        ctx.fillStyle = "#00bbff";
        ctx.fillRect(laneX, 0, laneWidth, canvas.height);

        // Draw lane lines
        for (let j = 0; j < canvas.height; j += canvas.height / 100) {
            ctx.beginPath();
            ctx.fillStyle = `hsl(${Math.cos(j / 10) * 65}, 100%, 50%)`;
            ctx.arc(laneX + laneWidth - 5, j + 5, 10, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Create swimmers in each lane
        swimmers.push({
            x: laneX + laneWidth / 2,
            y: 30,
            speed: 0.5,
            clickUpSpeed: 0,
            madeToOtherSide: false,
            font: "30px 'Comic Sans MS', cursive"
        });
    }

    // Draw lane lines on the leftmost lane
    for (let j = 0; j < canvas.height; j += canvas.height / 100) {
        ctx.beginPath();
        ctx.fillStyle = `hsl(${Math.cos(j / 10) * 65}, 100%, 50%)`;
        ctx.arc(5, j + 5, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
};

// Function to start the swimming race
const startSwimming = () => {
    if (!gameStarted) {
        gameStarted = true;
        animationInterval = setInterval(animateInstructions, 50);
        drawLanes();
        startTimer();
    }
};

// Function to start the game timer
const startTimer = () => {
    const timerElement = document.getElementById("game-timer");
    const timerInterval = setInterval(() => {
        remainingTime -= 0.01;
        if (remainingTime >= 0) {
            timerElement.textContent = `${remainingTime.toFixed(2)} TIME`;
        } else {
            timerElement.textContent = "0 TIME";
            clearInterval(timerInterval);
            endGame();
        }
    }, 10);
};

// Function to end the game
const endGame = () => {
    const endText = "Time's Up!";
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "30px 'Comic Sans MS', cursive";
    ctx.fillText(endText, canvas.width / 2, canvas.height / 2);
};

// Function to handle lane clicks
const clickLane = (event) => {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;

    for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i];
        if (x >= lane.left && x <= lane.left + lane.width && y >= lane.top && y <= lane.top + lane.height) {
            // Clicked on a lane
            if (foodTokens > 0 && remainingTime > 0) {
                swimmers[i].speed += 1;
                swimmers[i].clickUpSpeed += 1;
                foodTokens--;
            }
        }
    }
};

// Event listener for lane clicks
canvas.addEventListener("click", clickLane);

// Event listener for the start button
document.getElementById("start-button").addEventListener("click", startSwimming);
