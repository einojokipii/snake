import Snake from "./Snake.js";
import Apple from "./Apple.js";

class Game {
  constructor() {
    this.width = 400;
    this.height = 400;
    this.cell = 16;
    this.FPS = 8;
    this.frameTime = 0;

    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  setup() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0,0, this.width, this.height);
    
    document.body.append(canvas);
    document.addEventListener("keydown", (e) => this.onKeyPress(e));
  }

  onKeyPress(e) {
    this.snake.changeDirection(e.key);
  }

  run() {
    let elapsedTime = new Date().getTime() - this.frameTime;
    if (elapsedTime < 1000 / this.FPS) {
      return;
    }

    this.getNextFrame();
  }

  getNextFrame() {
    this.frameTime = new Date().getTime();

    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0,0, this.width, this.height);
    
    this.snake.update();
    this.snake.render();
    this.apple.render();
  }

}

const game = new Game();
game.setup();

(function run() {
  game.run();
  requestAnimationFrame(run);
})();

