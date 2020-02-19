export default class Apple {
  constructor(GAME) {
    this.GAME = GAME;

    this.w = this.GAME.cell;
    this.h = this.GAME.cell;
    this.x = this.GAME.width - this.GAME.cell * 4;
    this.y = this.GAME.height - this.GAME.cell * 4;
  }

  spawn() {
    this.x = Math.floor(Math.random() * (this.GAME.width / this.GAME.cell)) * this.GAME.cell;
    this.y = Math.floor(Math.random() * (this.GAME.height / this.GAME.cell)) * this.GAME.cell;
    
    for (let part of this.GAME.snake.body) {
      if (this.x === part.x && this.y === part.y) {
        return this.spawn();
      }
    }
  }

  render() {
    this.GAME.ctx.fillStyle = "#e74c3c";
    this.GAME.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}