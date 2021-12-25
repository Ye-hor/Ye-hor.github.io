const startBtn = document.querySelector('#start');
const ratingBtn = document.querySelector('#rating');
const backButtons = document.querySelectorAll('.back-button');
const startGameScreen = document.querySelector('.start-game');
const ratingScreen = document.querySelector('.rating');
const timeSelectorScreen = document.querySelector('.time-selector');
const gameScreen = document.querySelector('.game');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const ulEl5 = document.getElementById('ul-el5');
const ulEl10 = document.getElementById('ul-el10');
const ulEl20 = document.getElementById('ul-el20');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const colors = ['#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A'];
let timer = 0;
let score = 0;
let rating = JSON.parse(localStorage.getItem('scoreInRating')) || [];
let intervalId;
let time = 0;

const switchToScreen = screenSelector => {
    const screens = document.querySelectorAll('.screen');
    const activeScreen = document.querySelector(screenSelector);
    screens.forEach(screen => {
        screen.classList.remove('visible');
    });

    activeScreen.classList.add('visible');
};

startBtn.addEventListener('click', event => {
    event.preventDefault();
    switchToScreen('.time-selector');
});

ratingBtn.addEventListener('click', () => {
    switchToScreen('.rating');
});

resetBtn.addEventListener('click', () => {
    anulation();
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchToScreen('.start-game');
    });
});

timeList.addEventListener('click', event => {
    const buttonClickedElement = event.target;
    const buttonClasses = buttonClickedElement.classList; // buttonClickedElement.getAttribute('class').split(' ')
    const hasButtonClass = buttonClasses.contains('time-btn');

    if (hasButtonClass) {
        timer = parseInt(buttonClickedElement.getAttribute('data-time'));
        time = timer;
        switchToScreen('.game');
        startGame();
    }
});

function formatTime(rawTime) {
    if (rawTime < 10) {
        return `0${rawTime}`;
    }
    return rawTime;
}

render(rating);

// create TIME COUNTER - - - - -
function startGame() {
    board.innerHTML = '';
    saveBtn.disabled = true;

    intervalId = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (timer === 0) {
        clearInterval(intervalId);
        finishGame();
    } else {
        let current = --timer;
        console.log({ current, time: timer });
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${formatTime(value)}`;
}
// - - - - - - - - - - - - - - -

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function finishGame() {
    board.innerHTML = `<h1> Cчет: <span class="primary">${score}</span></h1>`;
    saveBtn.disabled = false;
}

saveBtn.addEventListener('click', () => {
    rating.push(score);
    rating = rating.sort((a, b) => b - a);
    localStorage.setItem('scoreInRating', JSON.stringify(rating));
    if (time === 5) {
        render(rating);
    }
    if (time === 10) {
        render(rating);
    }
    if (time === 20) {
        render(rating);
    }
    anulation();
});

function render(playerPoints) {
    let listItems = '';
    for (let i = 0; i < playerPoints.length; i++) {
        listItems += `
        <li>
        ${playerPoints[i]}
        </li>
        `;
    }
    ulEl5.innerHTML = listItems;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 50);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function anulation() {
    switchToScreen('.start-game');
    score = 0;
    timer = 0;
    time - 0;
}

// function winTheGame() {
//     function kill() {
//         const circle = document.querySelector('.circle')

//         if (circle) {
//             circle.click()
//         }
//     }
//     setInterval(kill, 100)
// }
