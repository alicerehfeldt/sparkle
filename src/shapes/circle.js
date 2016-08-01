import Shape from './shape';

class Circle extends Shape {

  draw(ctx) {
    ctx.save()
    let radius = this.size / 2;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.position[0], this.position[1], radius, 0, 2 * Math.PI);
    if (this.fill) {
        ctx.fillStyle = this.color;
        ctx.fill();
    } else {
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    ctx.restore();
  }

}

export default Circle;