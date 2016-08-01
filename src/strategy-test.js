import Strategy from 'strategy';
import shapes, {FourStar, FiveStar, Rectangle} from './shapes';
import util from 'util';

class Test extends Strategy {

  start() {
    super.start();
    this.shapes = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let x = -10 + (i * -30);
        let y = 10 + (j * 15);

        let fiveStar = new FiveStar({
          position: [x, y],
          size: 20
        });
        fiveStar.move([x + 700, y], 5000, 'linear');
        fiveStar.spin(1);

        this.shapes.push(fiveStar);
        break;
      }
    }


    let fiveStar = new Rectangle({
      position: [100, 100],
      size: 50,
      spinDPS: 180
    });

    fiveStar.spin(2);
    fiveStar.fade(0, 2000, 'ease-out').then((shape) => {
      shape.fade(1, 2000, 'ease-in');
    });
    this.shapes.push(fiveStar);



    // this.shapes = [
    // {
    //   type: 'fiveStar',
    //   pos: [170,70],
    //   size: 70,
    //   angle: 10,
    //   color: 'yellow',
    //   fade: {
    //     direction: 'down',
    //     throb: true
    //   }
    // },{
    //   type: 'fourStar',
    //   pos: [50,400],
    //   size: 70,
    //   angle: 45,
    //   color: 'white',
    //   rotate: {
    //     direction: 'right',
    //     speed: 5
    //   }
    // },
    // {
    //   type: 'fiveStar',
    //   pos: [400,250],
    //   size: 70,
    //   angle: 135,
    //   color: 'yellow',
    //   rotate: {
    //     direction: 'left',
    //     speed: 1,
    //   },
    //   fade: {
    //     direction: 'up',
    //     speed: 1,
    //     throb: 1
    //   }
    // }];
    this.frameCounter = 0;
  }

  // rotateStars() {
  //   this.shapes.forEach((shape) => {
  //     if (shape.rotate) {
  //       util.rotate(shape);        
  //     }

  //     if (shape.fade) {
  //       util.fade(shape);
  //     }
  //   });
  // }

  frame() {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      shape.frame(ctx);
    });
  }

  draw() {


    // for (let i = 0; i < this.shapes.length; i++) {
    //   let fiveStar = this.shapes[i];
    //   shapes.drawShape(ctx, fiveStar);
    // }
  }

}

export default Test;
