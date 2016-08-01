import Strategy from 'strategy';
import shapes, {FourStar, FiveStar, Rectangle} from './shapes';
import ShapeSet from './set';
import util from 'util';

class Test extends Strategy {

  start() {
    super.start();
    this.set = new ShapeSet();


  }

  createStar(x, y, size) {
    let curve = 'ease-out';
    let position = [x, y];
    let duration = util.rand(3000, 7000);

    let fiveStar = new FiveStar({
      position: position,
      size: size,
      fill: false,
      alpha: 0.1,
      spinDPS: util.rand(75, 120)
    });
    let endX = 500 - util.rand(20, 60);
    let clockwise = !!(util.rand(0,10) % 2);
    fiveStar.spin(clockwise);
    let loop = (shape) => {
      shape.transition('position', [endX, position[1]], duration, curve);
      shape.transition('size', 10, duration, curve);
      shape.transition('alpha', 1, (duration/2), curve).then((shape) => {
        shape.transition('alpha', 0, (duration/2), curve).then((shape) => {
          this.set.remove(shape);
        });
      });
    }
    loop(fiveStar);
    this.set.push(fiveStar);
  }

  frame() {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.set.frame(ctx);
  }

}

export default Test;
