const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const startGame = document.querySelector('.startBtn');
const playerScore = document.querySelector('.playerScore');

let mobileSize = window.matchMedia("(max-width: 540px)");

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false,
    ArrowLeft : false,
};

startGame.addEventListener('click', start);

let player = {
    score : 0,
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(event){
    event.preventDefault();
    keys[event.key] = true;
}
function keyUp(event){
    event.preventDefault();
    keys[event.key] = false;
}

function moveLeft(){
    keys.ArrowLeft = true;
    keys.ArrowRight = false;
}
function moveRight(){
    keys.ArrowRight = true;
    keys.ArrowLeft = false;
}
function stopMoveLeft(){
    keys.ArrowLeft = false;
    keys.ArrowRight = false;
}
function stopMoveRight(){
    keys.ArrowRight = false;
    keys.ArrowLeft = false;
}
function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left));
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    let roadHeight = gameArea.getBoundingClientRect();

    let getline = document.querySelector('.lines');

    let linesHeight = getline.getBoundingClientRect();

    lines.forEach(function(item){

        if(item.y >= roadHeight.height){
            item.y -= roadHeight.height + linesHeight.height;
        }
        
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    let roadHeight = gameArea.getBoundingClientRect();

    let getEnemyCar = document.querySelector('.enemy');

    let carHeight = getEnemyCar.getBoundingClientRect();

    enemy.forEach(function(item){

        if(isCollide(car,item)){
            end();
        }

        if(item.y >= roadHeight.height){
            item.y = -1000;
            item.style.left = Math.floor(Math.random() * 330) + "px";
            item.style.top = Math.floor(Math.random() * 1000) + "px";
        }
        
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame(){

    let car = document.querySelector('.car');

    let road = gameArea.getBoundingClientRect();

    let carSize = car.getBoundingClientRect();

    if( player.start){

        if(player.score >= 1000 && player.score < 2000){
            player.speed = 7;
        }
        else if(player.score >= 2000 && player.score < 3000){
            player.speed = 8;
        }
        else if(player.score >= 3000 && player.score < 4000){
            player.speed = 9;
        }
        else if(player.score >= 4000 && player.score < 5000){
            player.speed = 10;
        }
        else if(player.score >= 5000 && player.score < 6000){
            player.speed = 11;
        }
        else if(player.score >= 6000 && player.score < 7000){
            player.speed = 12;
        }
        else if(player.score >= 7000 && player.score < 8000){
            player.speed = 13;
        }
        else if(player.score >= 8000 && player.score < 9000){
            player.speed = 14;
        }
        else if(player.score >= 9000 && player.score < 10000){
            player.speed = 15;
        }
        else if(player.score >= 10000){
            player.speed = 16;
        }
        else{
            player.speed = 5;
        }

        
        if(keys.ArrowUp && player.y > 10){
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < (road.height - carSize.height - 10)){
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x > 5){
            player.x -= player.speed;
        }

        if(keys.ArrowRight && player.x < (road.width - carSize.width - 10)){
            player.x += player.speed;
        }
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        moveLines();

        moveEnemy(car);

        window.requestAnimationFrame(playGame);
        
        score.innerHTML = "Score : " + player.score++;
        
    }
}

function start(){
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    score.classList.remove('hide');

    player.start = true;
    player.score = 0;

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    car.style.backgroundImage = 'url(image/mycar.png)';
    car.style.backgroundRepeat = 'no-repeat';
    car.style.backgroundSize = '100% 100%';

    if(mobileSize.matches){
        let leftScreen = document.createElement('div');
        leftScreen.setAttribute('class', 'leftScreen');
        leftScreen.setAttribute('ontouchstart', 'moveLeft()');
        leftScreen.setAttribute('ontouchend', 'stopMoveLeft()');
        gameArea.appendChild(leftScreen);

        let rightScreen = document.createElement('div');
        rightScreen.setAttribute('class', 'rightScreen');
        rightScreen.setAttribute('ontouchstart', 'moveRight()');
        rightScreen.setAttribute('ontouchend', 'stopMoveRight()');
        gameArea.appendChild(rightScreen);
    }

    for(let x = 0; x < 5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = (x*150) + "px";
        gameArea.appendChild(roadLine);
    }

    let leftLine = document.createElement('div');
    leftLine.setAttribute('class', 'lineLeft');
    gameArea.appendChild(leftLine);

    let rightLine = document.createElement('div');
    rightLine.setAttribute('class', 'lineRight');
    gameArea.appendChild(rightLine);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let i = 1;  i <= 5;  i++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((i + 1) * 1000) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundImage = 'url(image/0' + i +'.png)';
        enemyCar.style.backgroundRepeat = 'no-repeat';
        enemyCar.style.backgroundSize = '100% 100%';
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    window.requestAnimationFrame(playGame);

}
function end(){
    startScreen.classList.remove('hide');
    playerScore.classList.remove('hide');
    player.start = false;
    playerScore.innerHTML = 'Scored :' + player.score;
}