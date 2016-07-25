import util from './util';

class Strategy {
  constructor(canvas, opts) {
    this.canvas = canvas;
    this.config = util.defaults(this.defaults(), opts);
  }

  defaults() {
    return {
      fps: 60
    }
  }

  start() {
    this.startTime = Date.now();
    this.fpsCount = 0;
    this.nextFrame = this.startTime;
    this.fpsDisplayTime = this.startTime + 1000;
  }

  animationFrame() {
    let now = Date.now();

    if (now >= this.nextFrame) {
      let frameDuration = (1000 / this.config.fps);
      this.nextFrame += frameDuration;
      this.fpsCount++;
      this.frame();
    }

    if (now >= this.fpsDisplayTime) {
      this.fpsDisplayTime += 1000;
      console.log('FPS:', this.fpsCount);
      this.fpsCount = 0;
    }
  }

  frame() {
    
  }


}

export default Strategy;