let totalTime = 300;
let remainingTime = totalTime;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const circle = document.getElementById("circle");
const soundSelect = document.getElementById("soundSelect");

let audio = new Audio("rain.mp3");
audio.loop = true;

function setTime(seconds) {
    totalTime = seconds;
    remainingTime = seconds;
    updateDisplay();
}

function updateDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timeDisplay.textContent =
        `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    circle.classList.add("breathing");
    audio.play();

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            audio.pause();
            circle.classList.remove("breathing");
            alert("Meditation Complete 🌿");
            isRunning = false;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    audio.pause();
    circle.classList.remove("breathing");
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = totalTime;
    updateDisplay();
    audio.pause();
    audio.currentTime = 0;
    circle.classList.remove("breathing");
    isRunning = false;
}

function changeSound() {
    audio.pause();
    audio = new Audio(soundSelect.value);
    audio.loop = true;
    if (isRunning) audio.play();
}

updateDisplay();
