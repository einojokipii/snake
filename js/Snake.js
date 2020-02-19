export default class Snake {
  constructor(GAME) {
    this.GAME = GAME;

    this.w = this.GAME.cell;
    this.h = this.GAME.cell;
    this.x = this.GAME.cell * 4;
    this.y = this.GAME.cell * 4;
    this.dx = 1;
    this.dy = 0;
    this.len = 4;
    this.body = [];
  }

  reset() {
    this.x = this.GAME.cell * 4;
    this.y = this.GAME.cell * 4;
    this.dx = 1;
    this.dy = 0;
    this.len = 4;
    this.body = [];
  }

  changeDirection(key) {
    switch (key) {
      case "ArrowUp":
        if (this.dy === 0) {
          this.dx = 0;
          this.dy = -1;
        }
        break;
      case "ArrowRight":
        if (this.dx === 0) {
          this.dy = 0;
          this.dx = 1;
        }
        break;
      case "ArrowDown":
        if (this.dy === 0) {
          this.dx = 0;
          this.dy = 1;
        }
        break;
      case "ArrowLeft":
        if (this.dx === 0) {
          this.dy = 0;
          this.dx = -1;
        }
        break;
    }

    this.GAME.getNextFrame();
  }

  hitsWall() {
    if (this.x < 0 || this.x >= this.GAME.width || this.y < 0 || this.y >= this.GAME.height) {
      return true;
    }

    return false;
  }

  hitsItself() {
    if (this.body.length < this.len) { return; }

    for (let part of this.body) {
      if (this.x === part.x && this.y === part.y) {
        return true;
      }
    }

    return false;
  }

  eatsApple() {
    if (this.x === this.GAME.apple.x && this.y === this.GAME.apple.y) {
      return true;
    }

    return false;
  }

  update() {
    this.x += this.dx * this.w;
    this.y += this.dy * this.h;

    if (this.hitsWall()) {
      this.reset();
    }
    
    if (this.hitsItself()) {
      this.reset();
    }

    if (this.eatsApple()) {
      this.len++;
      this.GAME.apple.spawn();
    }

    if (this.body.length >= this.len) {
      this.body.pop();
    }
    
    this.body.unshift({x: this.x, y: this.y});
  }

  render() {
    for (let part of this.body) {
      this.body.indexOf(part) === 0 ? this.GAME.ctx.fillStyle = "#0be881" : this.GAME.ctx.fillStyle = "#ecf0f1";
      this.GAME.ctx.fillRect(part.x, part.y, this.w, this.h);
    }
  }
}