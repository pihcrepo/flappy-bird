const soundPoint = new Audio('sounds/point.mp3');
const soundDie = new Audio('sounds/die.mp3');
let img = document.getElementById('bird');
let birdProps = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let scoreVal = document.querySelector('.score-val');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score-title');

let moveSpeed = 3, grativy = 0.5;
let gameState = 'Start';
img.style.display = 'none';
message.classList.add('end-game-message');

document.addEventListener('keydown', handleKeyDown)

function handleKeyDown(event) {
    if (event.key == 'Enter' && gameState != 'Play') {
        document.querySelectorAll('.pipe-sprite').forEach(element => {
            element.remove()
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        gameState = 'Play';
        message.innerHTML = '';
        scoreTitle.innerHTML = 'Score : ';
        scoreVal.innerHTML = '0';
        message.classList.remove('end-game-message');
        play();
    }
}
function play() {
    function move() {
        if (gameState != 'Play') return;

        let pipeSprite = document.querySelectorAll('.pipe-sprite')
        pipeSprite.forEach(element => {
            let pipeSpriteProps = element.getBoundingClientRect();
            birdProps = bird.getBoundingClientRect();

            if (pipeSpriteProps.right <= 0) {
                element.remove()
            } else {
                if (
                    birdProps.left < pipeSpriteProps.left + pipeSpriteProps.width &&
                    pipeSpriteProps.left < birdProps.left + birdProps.width &&
                    birdProps.top < pipeSpriteProps.top + pipeSpriteProps.height &&
                    pipeSpriteProps.top < birdProps.top + birdProps.height
                ) {
                    gameState = 'End'
                    message.innerHTML = 'Game Over'.fontcolor('red') +
                        '<br>Press Enter to Restart';
                    message.classList.add('end-game-message');
                    img.style.display = 'none';
                    soundDie.play();
                    return;
                } else {
                    if (pipeSpriteProps.right < birdProps.left &&
                        pipeSpriteProps.right + moveSpeed >= birdProps.left &&
                        element.increaseScore == '1') {
                        scoreVal.innerHTML = + scoreVal.innerHTML + 1;
                        soundPoint.play()
                    }
                    element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
                }
            }
        });
        requestAnimationFrame(move)
    }
    requestAnimationFrame(move)

    let birdDy = 0
    function applyGravity() {
        if (gameState != 'Play') return
        birdDy = birdDy + grativy;
        document.addEventListener('keydown', event => {
            if (event.key == 'ArrowUp' || event.key == ' ') {
                img.src = 'images/Bird-2.png';
                birdDy = -7.6;
            }
        })

        document.addEventListener('keyup', event => {
            if (event.key == 'ArrowUp' || event.key == ' ') {
                img.src = 'images/Bird.png';
            }
        })

        if (birdProps.top <= 0 || birdProps.bottom >= background.bottom) {
             gameState = 'End'
            message.style.left = '28vw'
            window.location.reload()
            message.classList.remove('end-game-message')
            return
        }
        bird.style.top = birdProps.top + birdDy + 'px'
        birdProps = bird.getBoundingClientRect()
        requestAnimationFrame(applyGravity)
    }
    requestAnimationFrame(applyGravity)

    let pipeSeperation = 0;
    let pipeGap = 35;

    function createPipe() {
        if (gameState != 'Play') return

        if (pipeSeperation > 115) {
            pipeSeperation = 0;
            let pipePosi = Math.floor(Math.random() * 43) + 8
            let pipeSpriteInv = document.createElement('div')
            pipeSpriteInv.className = 'pipe-sprite'
            pipeSpriteInv.style.top = pipePosi - 70 + 'vh'
            pipeSpriteInv.style.left = '100vw'

            document.body.appendChild(pipeSpriteInv)
            let pipeSprite = document.createElement('div')
            pipeSprite.className = 'pipe-sprite'
            pipeSprite.style.top = pipePosi + pipeGap + 'vh'
            pipeSprite.style.left = '100vw'
            pipeSprite.increaseScore = '1'

            document.body.appendChild(pipeSprite)
        }
        pipeSeperation++
        requestAnimationFrame(createPipe)
    }
    requestAnimationFrame(createPipe)
}