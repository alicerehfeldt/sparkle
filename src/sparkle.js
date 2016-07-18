import tinycolor from 'tinycolor2';

class Sparkle {
  constructor(opts) {
    this.canvas = null;
    this.endTime = null;
    this.setCounter = 0;
    this.config = {
      anchor: document.body,
      size: [500, 500],
      position: 'center',
      color: 'white',
      sets: 3,
      fps: 3
    }

    for (let key in opts) {
      if (opts.hasOwnProperty(key)) {
        this.config[key] = opts[key];
      }
    }

    this.setupProps();
    this.createCanvas();
    this.position();
  }

  setupProps() {
    this.anchor = this.config.anchor;
    this.size = this.config.size;
  }

  createCanvas() {
    this.canvas = document.createElement('CANVAS');
    this.canvas.width = this.size[0];
    this.canvas.height = this.size[1];
    this.canvas.style.position = 'absolute';
    document.body.appendChild(this.canvas);
  }

  position() {
    let anchorPos = this.anchor.getBoundingClientRect();
    let canvasPos = [];
    if (this.config.position.toLowerCase() === 'center') {

      let anchorCenter = [];
      anchorCenter[0] = anchorPos.left + Math.round(anchorPos.width / 2);
      anchorCenter[1] = anchorPos.top + Math.round(anchorPos.height / 2);

      canvasPos[0] = anchorCenter[0] - Math.round(this.size[0] / 2);
      canvasPos[1] = anchorCenter[1] - Math.round(this.size[1] / 2);
    }

    this.canvas.style.left = canvasPos[0] + 'px';
    this.canvas.style.top = canvasPos[1] + 'px';
  }

  rand(min, max) {
    let range = max - min;
    return Math.round(Math.random() * range) + min;
  }

  createFrameSets() {
    this.frameSets = this.createRandomSets(this.config.sets);
  }




  createGridSets(count) {
    // divide canvas in to grids
    let desiredSize = 100;
    let boxSize = [];
    let boxesAcross = Math.ceil(this.size[0] / desiredSize);
    let boxesDown = Math.ceil(this.size[1] / desiredSize);
    boxSize[0] = Math.ceil(this.size[0] / boxesAcross);
    boxSize[1] = Math.ceil(this.size[0] / boxesAcross);


    let sets = [];
    for (let i = 0; i < boxesAcross; i++) {
      for (let j = 0; j < boxesDown; j++) {
        let boxBase = [
          (boxSize[0] * i),
          (boxSize[1] * j) 
        ];

        for (let setNum = 0; setNum < count; setNum++) {
          if (!sets[setNum]) {
            sets[setNum] = {
              fourStars: [],
              circles: []
            }
          }

        } 
      }
    }

    return sets;
  }





  createRandomSets(count) {
    let sets = [];
    for (let i = 0; i < count; i++) {  
      let set = {
        circles: [],
        fourStars: []
      }
      let numCircles = 10;
      let numFourStars = 30;
      for (let j = 0; j < numCircles; j++) {
        let minSize = 5;
        let maxSize = 30;
        let position = [
          Math.round(Math.random() * this.size[0]),
          Math.round(Math.random() * this.size[1])
        ];
        let size = this.rand(minSize, maxSize);

        let shape = {
          pos: position,
          size: size,
          alpha: 0.4
        }
        this.ensureVisible(shape);
        set.circles.push(shape);
      }
      for (let j = 0; j < numFourStars; j++) {
        let minSize = 10;
        let maxSize = 50;
        let maxAngle = 45
        let position = [
          Math.round(Math.random() * this.size[0]),
          Math.round(Math.random() * this.size[1])
        ];
        let size = this.rand(minSize, maxSize);
        let angle = [0,15,45,75][this.rand(0, 3)];
        let shape = {
          pos: position,
          size: size,
          angle: angle,
          alpha: 0.8
        }

        this.ensureVisible(shape);
        set.fourStars.push(shape);
      }
      sets.push(set);
    }

    return sets;
  }

  ensureVisible(shape) {
    let radius = shape.size / 2;

    let leftBound = shape.pos[0] - radius;
    let rightBound = shape.pos[0] + radius;
    let topBound = shape.pos[1] - radius;
    let bottomBound = shape.pos[1] + radius;

    if (leftBound < 0) {
      shape.pos[0] += 0 - leftBound;
    } else if (rightBound > this.size[0]) {
      shape.pos[0] -= rightBound - this.size[0];
    }

    if (topBound < 0) {
      shape.pos[1] += 0 - topBound;
    } else if (bottomBound > this.size[1]) {
      shape.pos[1] -= bottomBound - this.size[1];
    }
  }


  start(duration) {
    let color = tinycolor(this.config.color);
    let colorString = color.toRgbString();
    this.color = colorString;
    this.createFrameSets();
    this.startAnimation(duration);
  }


  startAnimation(duration) {
    let startTime = Date.now();
    let endTime = false;

    if (duration) {
      duration = parseInt(duration, 10);
      endTime = startTime + (duration * 1000);
    }

    let nextFrame = startTime;
    let fpsCount = 0;
    let fpsDisplayTime = startTime + 1000;
    let animationFrame = () => {
      let now = Date.now();
      if (now >= fpsDisplayTime) {
        console.log('FPS:', fpsCount);
        fpsCount = 0;
        fpsDisplayTime += 1000;
      }

      if (endTime && (now > endTime)) {
        return;
      } else if (now >= nextFrame) {
        nextFrame = this.nextFrame(nextFrame);
        fpsCount++;
        this.frame(fpsCount);
      }
      window.requestAnimationFrame(animationFrame);
    }
    animationFrame();    
  }


  nextFrame(now) {
    let frameDuration = 1000 / this.config.fps;
    let nextFrame = now + frameDuration;
    return nextFrame;
  }


  frame() {
    if (this.setCounter >= this.frameSets.length) {
      this.setCounter = 0;
    }

    let set = this.frameSets[this.setCounter];
    this.draw(set);

    this.setCounter++;
  }


  draw(set) {
    let ctx = this.canvas.getContext('2d');
    //ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < set.circles.length; i++) {
      let circle = set.circles[i];
      this.drawCircle(ctx, circle);
    }

    for (let i = 0; i < set.fourStars.length; i++) {
      let fourStar = set.fourStars[i];
      this.drawFourStar(ctx, fourStar);
    }
  }

  drawBorder(ctx, shape) {
    ctx.save();
    ctx.beginPath();
    let x = shape.pos[0] - (shape.size / 2);
    let y = shape.pos[1] - (shape.size / 2);

    ctx.strokeRect(x, y, shape.size, shape.size);
    ctx.restore();
  }

  drawCircle(ctx, shape) {
    ctx.save()
    let radius = shape.size / 2;
    ctx.globalAlpha = shape.alpha;
    ctx.beginPath();
    ctx.arc(shape.pos[0], shape.pos[1], radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0,-5);
    ctx.bezierCurveTo(0,0,0,0,-5,0)
    ctx.bezierCurveTo(0,0,0,0,0,5)
    ctx.bezierCurveTo(0,0,0,0,5,0)
    ctx.bezierCurveTo(0,0,0,0,0,-5)
    ctx.fill();
    ctx.restore();
  }




}

module.exports = Sparkle;
