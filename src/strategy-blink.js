import Strategy from 'strategy';
import util from 'util';
import shapes from 'shapes';
import layout from 'layout';
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
          boxSize: [100, 100],
          bigStarSize: [40, 60],
          numSmallStars: 3,
          numCircles: 3
        }
        break;
      case 2: 
        return {
          boxSize: [120, 120],
          bigStarSize: [30, 50],
          numSmallStars: 2,
          numCircles: 3
        }
        break;
      default:
        return {
          boxSize: [140, 140],
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
          sets[setNum] = {
            borders: [],
            fourStars: [],
            fiveStars: [],
            circles: []
          } 
        }

        sets[setNum].borders.push(
        {
          base: boxBase,
          size: boxSize
        });

        let boxBottomRight = [
          boxBase[0] + boxSize[0],
          boxBase[1] + boxSize[1],
        ];

        // put a big five star somewhere in the box
        let bigStar = {
          pos: util.randPosition([0,0], boxSize, boxBase),
          size: util.rand(gridSettings.bigStarSize[0], 
            gridSettings.bigStarSize[1]),
          angle: util.randAngle(),
          alpha: util.randAlpha(0.7, 1, this.config.maxAlpha),
          color: color
        }

        util.ensureVisible(bigStar, boxBase, boxBottomRight);
        sets[setNum].fiveStars.push(bigStar);

        // Generate small stars
        for (let k = 0; k < gridSettings.numSmallStars; k++) {
        // put a big four star somewhere in the box
          let shape = {
            pos: util.randPosition([0,0], boxSize, boxBase),
            size: util.rand(10,30),
            angle: util.randAngle(),
            alpha: util.randAlpha(0.5, 0.7, this.config.maxAlpha),
            color: color
          }
          util.ensureVisible(shape, [0,0], this.config.size);
          sets[setNum].fourStars.push(shape);
        }

        // Generate circles
        for (let k = 0; k < gridSettings.numCircles; k++) {
          let shape = {
            pos: util.randPosition([0,0], boxSize, boxBase),
            size: util.rand(10,30),
            alpha: util.randAlpha(0.2, 0.4, this.config.maxAlpha),
            color: color
          }
          util.ensureVisible(shape, [0,0], this.config.size);
          sets[setNum].circles.push(shape);
        }
      }
    });

    return sets;
  }

  createRandomSets(count, color) {
    let sets = [];
    for (let i = 0; i < count; i++) {  
      let set = {
        circles: [],
        fourStars: [],
        fiveStars: [],
        borders: []
      }
      let numCircles = 10;
      let numFourStars = 30;
      for (let j = 0; j < numCircles; j++) {
        let minSize = 5;
        let maxSize = 30;
        let size = util.rand(minSize, maxSize);

        let shape = {
          pos: util.randPosition([0,0], this.config.size),
          size: size,
          alpha: 0.4,
          color: color
        }
        util.ensureVisible(shape, [0,0], this.config.size);
        set.circles.push(shape);
      }
      for (let j = 0; j < numFourStars; j++) {
        let minSize = 10;
        let maxSize = 50;
        let maxAngle = 45
        let size = util.rand(minSize, maxSize);
        let shape = {
          pos: util.randPosition([0,0], this.config.size),
          size: size,
          angle: util.randAngle(),
          alpha: 0.8,
          color: color
        }

        util.ensureVisible(shape, [0,0], this.config.size);
        if (util.rand(0,2) === 2) {
          set.fiveStars.push(shape);
        } else {
          set.fourStars.push(shape);          
        }

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

    for (let i = 0; i < set.circles.length; i++) {
      let circle = set.circles[i];
      shapes.drawCircle(ctx, circle);
    }

    for (let i = 0; i < set.fourStars.length; i++) {
      let fourStar = set.fourStars[i];
      shapes.drawFourStar(ctx, fourStar);
    }

    for (let i = 0; i < set.fiveStars.length; i++) {
      let fiveStar = set.fiveStars[i];
      shapes.drawFiveStar(ctx, fiveStar);
      if (this.config.debug) {
        shapes.drawShapeBorder(ctx, fiveStar, i);        
      }
    }

    if (this.config.debug) {
      for (let i = 0; i < set.borders.length; i++) {
        let border = set.borders[i];
        shapes.drawBorder(ctx, border, i);
      }
    }
  }
}

export default Blink;
