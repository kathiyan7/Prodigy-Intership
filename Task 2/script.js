let timer;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Format time to display
function formatTime(time) {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Update display
function updateDisplay() {
    display.innerText = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function startPause() {
    if (!isRunning) {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
        startPauseBtn.innerText = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseBtn.innerText = 'Start';
        isRunning = false;
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    lapList.innerHTML = '';
    startPauseBtn.innerText = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    isRunning = false;
}

// Track lap times
function addLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const li = document.createElement('li');
        li.innerText = `Lap ${laps.length}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

// Event listeners for buttons
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);
