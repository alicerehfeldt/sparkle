import Shape from './shape';

class FourStar extends Shape {

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    let scale = this.size / 5;
    ctx.scale(scale, scale)    
    ctx.rotate((this.angle * Math.PI) / 180)
    ctx.globalAlpha = this.alpha;

    ctx.beginPath();
    ctx.moveTo(0,-5);
    ctx.bezierCurveTo(0,0,0,0,-5,0);
    ctx.bezierCurveTo(0,0,0,0,0,5);
    ctx.bezierCurveTo(0,0,0,0,5,0);
    ctx.bezierCurveTo(0,0,0,0,0,-5);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }

}

export default FourStar;