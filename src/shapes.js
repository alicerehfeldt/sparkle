class Shapes {
  
  drawShape(ctx, shape) {
    if (shape.alpha <= 0) {
      return;
    }

    if (shape.type === 'circle') {
      this.drawCircle(ctx, shape);
    } else if (shape.type === 'fourStar') {
      this.drawFourStar(ctx, shape);
    } else if (shape.type === 'fiveStar') {
      this.drawFiveStar(ctx, shape);
    }

    this.updateShape(shape);
  }

  drawBorder(ctx, border, num) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeRect(border.base[0], border.base[1], border.size[0], border.size[1]);
    ctx.fillStyle = 'red';
    ctx.fillText(num, border.base[0] + 5, border.base[1] + 15);
    ctx.restore();
  }

  drawShapeBorder(ctx, shape, num) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    let x = shape.pos[0] - (shape.size / 2);
    let y = shape.pos[1] - (shape.size / 2);
    ctx.strokeRect(x, y, shape.size, shape.size);

    ctx.fillStyle = 'white';
    ctx.fillText(num, shape.pos[0]-5, shape.pos[1] + 5);

    ctx.restore();
  }


  drawCircle(ctx, shape) {
    ctx.save()
    let radius = shape.size / 2;
    ctx.globalAlpha = shape.alpha;
    ctx.beginPath();
    ctx.arc(shape.pos[0], shape.pos[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = shape.color;
    ctx.fill();
    ctx.restore();
  }

  drawFourStar(ctx, shape) {
    ctx.save();
    ctx.translate(shape.pos[0], shape.pos[1]);
    let scale = shape.size / 5;
    ctx.scale(scale, scale)    
    ctx.rotate((shape.angle * Math.PI) / 180)
    ctx.globalAlpha = shape.alpha;
    ctx.fillStyle = shape.color;
    ctx.beginPath();
    ctx.moveTo(0,-5);
    ctx.bezierCurveTo(0,0,0,0,-5,0)
    ctx.bezierCurveTo(0,0,0,0,0,5)
    ctx.bezierCurveTo(0,0,0,0,5,0)
    ctx.bezierCurveTo(0,0,0,0,0,-5)
    ctx.fill();
    ctx.restore();
  }

  drawFiveStar(ctx, shape){
    ctx.save();
    ctx.translate(shape.pos[0], shape.pos[1]);
    let scale = shape.size / 20;
    ctx.scale(scale, scale)
    ctx.rotate((shape.angle * Math.PI) / 180)
    ctx.globalAlpha = shape.alpha;
    ctx.fillStyle = shape.color;
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

  updateShape(shape) {
    if (shape.rotate) {
      this.rotate(shape);
    }

    if (shape.fade) {
      this.fade(shape);
    }
  }

  rotate(shape) {
    let now = Date.now();
    let modifier = (shape.rotate.direction === 'left') ? -1 : 1;
    let speed = (shape.rotate.speed) ? shape.rotate.speed : 1;
    if (!shape.rotate.tick) {
      shape.rotate.tick = now;
      return;
    }

    let timePassed = (now - shape.rotate.tick) / 1000;
    modifier = modifier * (360 * 0.1 * speed) * timePassed;
    shape.rotate.tick = now;
    shape.angle += modifier;
  }

  fade(shape) {
    let now = Date.now();
    let modifier = (shape.fade.direction === 'down') ? -1 : 1;
    if (typeof shape.alpha !== 'number') {
      shape.alpha = (modifier===1) ? 0.1 : 1;
      return;
    }

    let speed = (shape.fade.speed) ? shape.fade.speed : 1;
    if (!shape.fade.tick) {
      shape.fade.tick = now;
      return;
    }

    let timePassed = (now - shape.fade.tick) / 1000;
    modifier = modifier * (0.3 * speed) * timePassed;
    let newValue = shape.alpha + (modifier)

    if (newValue < 0.1) {
      if (!shape.fade.throb) {
        shape.fade = false;
        shape.alpha = 0;
        return;
      } else if (typeof shape.fade.throb === 'number') {
        shape.fade.throb--;
      }
      shape.alpha = 0.1;
      shape.fade.direction = 'up';
    } else if (newValue >= 1) {
      shape.alpha = 1;
      if (!shape.fade.throb) {
        shape.fade = false;
        return;
      } else if (typeof shape.fade.throb === 'number') {
        shape.fade.throb--;
      }
      shape.fade.direction = 'down';
    } else {
      shape.alpha = newValue;
    }

    shape.fade.tick = now;

  }


}

let instance = new Shapes();
export default instance;
