let Game = document.querySelector(".game");
let Score=document.querySelector(".score");
let foodX,foodY;
let headX=12,headY=12;
let velocityX=0,velocityY=0;
let body=[];
let score=0;
function generateFood(){
    foodX=Math.floor(Math.random()*25)+1;
    foodY=Math.floor(Math.random()*25)+1;
    for(let i=0;i<body.length;i++){
        if(body[i][1]==foodY && body[i][0]==foodX){
            generateFood();
        }
    }
}
function gameOver(){
    headX=12;
    headY=12;
    generateFood();
    velocityX=0;
    velocityY=0;
    body=[];
    score=0;
    Score.innerHTML="Score: "+score;
    alert("Game Over");
}
function renderGame() {
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if(headX==foodX && headY==foodY){
        body.push([foodX,foodY]);
        generateFood();
        score+=10;
        Score.innerHTML="Score: "+score;
    }
    body.pop();
    headX+=velocityX;
    headY+=velocityY;
    body.unshift([headX,headY]);
    if(headX==0 || headY==0 || headX==26 ||headY==26){
        gameOver();
    }
    for(let i=1;i<body.length;i++){
        if(body[0][0]==body[i][0] && body[0][1]==body[i][1]){
            gameOver();
        }
    }
    for(let i=0;i<body.length;i++){
        updatedGame+=`<div class="snake" style="grid-area: ${body[i][1]}/${body[i][0]};"></div>`
    }
    
    Game.innerHTML = updatedGame;
}
generateFood();
setInterval(renderGame,150);
document.addEventListener("keydown",function(e){
    let key=e.key;
    if(key=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(key=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }else if(key=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }else if(key=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
})