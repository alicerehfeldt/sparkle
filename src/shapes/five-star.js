import Shape from './shape';

class FiveStar extends Shape {

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    let scale = this.size / 20;
    ctx.scale(scale, scale)
    ctx.rotate((this.angle * Math.PI) / 180)
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -10); // top
    ctx.lineTo(3.5, -3.5);
    ctx.lineTo(10, -2.5); // mid right
    ctx.lineTo(5, 3);
    ctx.lineTo(6, 10); // bot right
    ctx.lineTo(0, 6.5);
    ctx.lineTo(-6.5,10); // bot left
    ctx.lineTo(-5, 3);
    ctx.lineTo(-10,-2.5); // mid left
    ctx.lineTo(-3.5,-3.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

}

export default FiveStar;