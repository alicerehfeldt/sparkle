import Strategy from 'strategy';
import shapes from 'shapes';
import util from 'util';

class Test extends Strategy {

  start() {
    super.start();
    this.shapes = [
    {
      type: 'fiveStar',
      pos: [170,70],
      size: 70,
      angle: 10,
      color: 'yellow',
      fade: {
        direction: 'down',
        throb: true
      }
    },{
      type: 'fourStar',
      pos: [50,400],
      size: 70,
      angle: 45,
      color: 'white',
      rotate: {
        direction: 'right',
        speed: 5
      }
    },
    {
      type: 'fiveStar',
      pos: [400,250],
      size: 70,
      angle: 135,
      color: 'yellow',
      rotate: {
        direction: 'left',
        speed: 1,
      },
      fade: {
        direction: 'up',
        speed: 1,
        throb: 1
      }
    }];
    this.frameCounter = 0;
  }

  rotateStars() {
    this.shapes.forEach((shape) => {
      if (shape.rotate) {
        util.rotate(shape);        
      }

      if (shape.fade) {
        util.fade(shape);
      }
    });
  }

  frame() {
    this.draw();
    this.frameCounter++;
  }

  draw() {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.shapes.length; i++) {
      let fiveStar = this.shapes[i];
      shapes.drawShape(ctx, fiveStar);
    }
  }

}

export default Test;
