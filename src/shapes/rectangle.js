import Shape from './shape';

class Rectangle extends Shape {

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate((this.angle * Math.PI) / 180)
    let x = 0 - (this.size / 2);
    let y = 0 - (this.size / 2);
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.size, this.size);


    ctx.restore();
  }

}

export default Rectangle;