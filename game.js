let moveSpeed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('img');

let birdProps = bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.score_value');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score_title');

let gameState = 'Start';
img.style.display = 'none';
message.classList.add