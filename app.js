const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');



pen.fillStyle = 'yellow';

const cs = 67;
const W = 1200;
const H = 735;
let food = null;
let score = 0;
let gameOver = false;

const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],

    createSnake: function () {
        for (let i = 0; i < this.init_len; i++) {
            //cells has initial position of every block of cell's body
            this.cells.push({
                x: i,
                y: 0
            });
        }
    },

    drawSnake: function () {
        for (let cell of this.cells) {
            pen.fillRect(cell.x * cs, cell.y * cs, cs - 1, cs - 1);
        }
    },

    updateSnake: function () {
        const head = this.cells[this.cells.length - 1];
        const headX = head.x;
        const headY = head.y;

        if (headX === food.x && headY === food.y) {
            score+=5;
            food = getRandomFood();
        }
        else {
            this.cells.shift();
        }

        let nextX;
        let nextY;

        // console.log(this.direction);

        if (this.direction === 'down') {
            nextX = headX;
            nextY = headY + 1;
            if (nextY * cs >= H) {
                pen.fillStyle = 'red';
                pen.fillText('Game Over', 90, 50);
                clearInterval(id);
                // gameOver=true;
            }
        }
        else if (this.direction === 'up') {
            nextX = headX;
            nextY = headY - 1;
            if (nextY * cs < 0) {
                pen.fillStyle = 'red';
                pen.fillText('Game Over', 90, 50);
                clearInterval(id);
                // gameOver=true;
            }
        }
        else if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = headY;
            if (nextX * cs < 0) {
                pen.fillStyle = 'red';
                pen.fillText('Game Over', 90, 50);
                clearInterval(id);
            }
        }
        else if (this.direction === 'right') {   //-----------------
            nextX = headX + 1;
            nextY = headY;
            if (nextX * cs >= W) {
                pen.fillStyle = 'red';
                pen.fillText('Game Over', 90, 50);
                clearInterval(id);
            }
        }


        // console.log(headX,' ',headY,' ',nextX,' ',nextY);


        //remove first cell
        // this.cells.shift();

        //push next cell
        this.cells.push({
            x: nextX,
            y: nextY
        })
    }

}



function init() {
    snake.createSnake();

    food = getRandomFood();

    //adding eventListener to whole document

    function keypressed(e) {
        // console.log(e);
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }
        else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        }

        console.log(snake.direction)
    }

    document.addEventListener('keydown', keypressed);
}

function update() {
    if (gameOver === true) {
        clearInterval(id);
    }
    snake.updateSnake();
}

function draw() {
    
    pen.clearRect(0, 0, W, H); //tho erased from array,remains drawn on canvas, so erasing all the canvas and redrawing 
    pen.font = '40px sans-serif'
    pen.fillStyle='magenta';
    pen.fillText(`Score: ${score}`, 100, 150)
    pen.fillStyle = 'blue';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}



function gameLoop() {
    draw();
    update();
}

function getRandomFood() {
    const foodX = Math.round(Math.random() * (W - cs) / cs);
    const foodY = Math.round(Math.random() * (H - cs) / cs);

    food = {
        x: foodX,
        y: foodY
    }

    return food;
}

init();
// draw();

// gameLoop();

const id = setInterval(gameLoop, 200);

