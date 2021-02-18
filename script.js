let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = "right";
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x,snake[i].y,box,box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y,box,box);
}

function iniciarJogo(){
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i=1;i<snake.length;i++){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            clearInterval(jogo);
            alert("Fim de Jogo :(!");
            break;
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snake[0].x != food.x || snake[0].y != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;

    }


    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function update (event){
    // tecla pra esquerda = valor 37
    if (event.keyCode == 37 && direction != "right") direction = "left";
    // tecla pra cima = valor 38
    if (event.keyCode == 38 && direction != "down") direction = "up";
    // tecla pra direita = valor 39
    if (event.keyCode == 39 && direction != "left") direction = "right";
    // tecla pra baixo = valor 40
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

document.addEventListener('keydown',update);

let jogo = setInterval(iniciarJogo, 100);