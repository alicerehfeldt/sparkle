import Strategy from './strategy';
import util from './util';
import {Circle, FourStar, FiveStar} from './shapes';
import ShapeSet from './set';
import layout from './layout';
import tinycolor from 'tinycolor2';

class Blink extends Strategy {
  defaults() {
    let defaults = super.defaults();
    return util.defaults(defaults, {
      color: 'white',
      layout: 'grid',
      intensity: 1,
      maxAlpha: 0.5,
      sets: 3,
      setsPerSecond: 3
    })
  }

  start() {
    super.start();
    let color = tinycolor(this.config.color);
    let colorString = color.toRgbString();
    this.setCounter = 0;
    this.nextSet = Date.now();
    if (this.config.layout.toLowerCase() === 'grid') {
      this.frameSets = this.createGridSets(this.config.sets, colorString);
    } else {
      this.frameSets = this.createRandomSets(this.config.sets, colorString);
    }
  }


  gridIntensity() {
    switch (this.config.intensity) {
      case 3:
        return {
          boxSize: [150, 150],
          bigStarSize: [30, 50],
          numSmallStars: 3,
          numCircles: 3
        }
        break;
      case 2: 
        return {
          boxSize: [200, 200],
          bigStarSize: [20, 40],
          numSmallStars: 2,
          numCircles: 3
        }
        break;
      default:
        return {
          boxSize: [250, 250],
          bigStarSize: [20, 40],
          numSmallStars: 2,
          numCircles: 3
        }
        break;
    }
  }

  createGridSets(count, color) {
    // divide canvas in to grids
    let gridSettings = this.gridIntensity();
    let boxSize = [];
    let sets = [];
    layout.grid(this.config.size, gridSettings.boxSize, (boxBase, boxSize) => {
      for (let setNum = 0; setNum < count; setNum++) {
        if (!sets[setNum]) {
          sets[setNum] = new ShapeSet
        }

        let boxBottomRight = [
          boxBase[0] + boxSize[0],
          boxBase[1] + boxSize[1],
        ];

        // put a big five star somewhere in the box
        let bigStar = new FiveStar({
          position: util.randPosition([0,0], boxSize, boxBase),
          size: util.rand(gridSettings.bigStarSize[0], 
            gridSettings.bigStarSize[1]),
          angle: util.randAngle(),
          alpha: util.randAlpha(0.6, 1, this.config.maxAlpha),
          color: color
        });

        util.ensureVisible(bigStar, boxBase, boxBottomRight);
        sets[setNum].push(bigStar);

        // Generate small four stars
        for (let k = 0; k < gridSettings.numSmallStars; k++) {
          let shape = new FourStar({
            position: util.randPosition([0,0], boxSize, boxBase),
            size: util.rand(10,30),
            angle: util.randAngle(),
            alpha: util.randAlpha(0.5, 0.7, this.config.maxAlpha),
            color: color
          });
          util.ensureVisible(shape, [0,0], this.config.size);
          sets[setNum].push(shape);
        }

        // Generate circles
        for (let k = 0; k < gridSettings.numCircles; k++) {
          let shape = new Circle({
            position: util.randPosition([0,0], boxSize, boxBase),
            size: util.rand(10,30),
            alpha: util.randAlpha(0.2, 0.4, this.config.maxAlpha),
            color: color
          });
          util.ensureVisible(shape, [0,0], this.config.size);
          sets[setNum].push(shape);
        }
      }
    });

    return sets;
  }

  createRandomSets(count, color) {
    let sets = []
    for (let i = 0; i < count; i++) {  
      let set = new ShapeSet();
      let numCircles = 10;
      let numFourStars = 30;
      for (let j = 0; j < numCircles; j++) {
        let minSize = 5;
        let maxSize = 30;
        let size = util.rand(minSize, maxSize);

        let shape = new Circle({
          position: util.randPosition([0,0], this.config.size),
          size: size,
          alpha: 0.4,
          color: color
        })
        util.ensureVisible(shape, [0,0], this.config.size);
        set.push(shape);
      }
      for (let j = 0; j < numFourStars; j++) {
        let minSize = 10;
        let maxSize = 50;
        let maxAngle = 45
        let size = util.rand(minSize, maxSize);
        let shape = new FourStar({
          position: util.randPosition([0,0], this.config.size),
          size: size,
          angle: util.randAngle(),
          alpha: 0.8,
          color: color
        });

        util.ensureVisible(shape, [0,0], this.config.size);
        set.push(shape);
      }
      sets.push(set);
    }

    return sets;
  }




  frame() {
    let now = Date.now();
    if (now > this.nextSet) {
      this.setCounter++;
      this.nextSet = now + (1000 / this.config.setsPerSecond);
    }
    if (this.setCounter >= this.frameSets.length) {
      this.setCounter = 0;
    }

    let set = this.frameSets[this.setCounter];
    this.draw(set);

  }



  draw(set) {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    set.frame(ctx);
  }
}

export default Blink;
