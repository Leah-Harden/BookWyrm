
let timerEl = document.querySelector('#timeLeft');
let timeRemaining = timerEl.textContent.split(':').map((num) => num = parseInt(num));
let totalSeconds = (timeRemaining[0]*60*60) + (timeRemaining[1]*60)+timeRemaining[2];
let timer;
const updateCounter = () => {

    totalSeconds--;

    let hours = Math.floor(totalSeconds/3600);
    let seconds = totalSeconds % 3600;
    let minutes = Math.floor(seconds/60);
    seconds %= 60;

    timerEl.textContent = `${hours}:${minutes}:${seconds}`;

    if(totalSeconds <= 0){
        clearInterval(timer);
    }
}
const resume = () => {
    timer = setInterval(updateCounter, 1000);
}
const pause = () => {
    clearInterval(timer);
}