import util from './util';
import Strategy from 'strategy';
import Blink from 'strategy-blink';
import Test from 'strategy-test';

class Sparkle {
  constructor(opts) {
    this.canvas = null;
    this.endTime = null;

    this.config = {
      anchor: document.body,
      size: [500, 500],
      type: false,
      position: 'center',
      color: 'white',
      debug: false
    }

    util.defaults(this.config, opts);
    this.createCanvas();
    this.centerCanvas();
  }

  createCanvas() {
    this.canvas = document.createElement('CANVAS');
    this.canvas.width = this.config.size[0];
    this.canvas.height = this.config.size[1];
    this.canvas.style.position = 'absolute';
    document.body.appendChild(this.canvas);
  }

  centerCanvas() {
    let anchorPos = this.config.anchor.getBoundingClientRect();
    let canvasPos = [];
    if (this.config.position.toLowerCase() === 'center') {

      let anchorCenter = [];
      anchorCenter[0] = anchorPos.left + Math.round(anchorPos.width / 2);
      anchorCenter[1] = anchorPos.top + Math.round(anchorPos.height / 2);

      canvasPos[0] = anchorCenter[0] - Math.round(this.config.size[0] / 2);
      canvasPos[1] = anchorCenter[1] - Math.round(this.config.size[1] / 2);
    }

    this.canvas.style.left = canvasPos[0] + 'px';
    this.canvas.style.top = canvasPos[1] + 'px';
  } 

  start(duration) {
    let strategy;
    switch(this.config.type.toLowerCase()) {
      case 'blink':
        strategy = new Blink(this.canvas, this.config);
        break;
      case 'test':
        strategy = new Test(this.canvas, this.config);
        break;
      default:
        strategy = new Strategy(this.canvas, this.config);
        break;
    }
    this.startAnimation(strategy, duration);
  }


  startAnimation(strategy, duration) {
    let startTime = Date.now();
    let endTime = false;

    if (duration) {
      duration = parseInt(duration, 10);
      endTime = startTime + (duration * 1000);
    }
    strategy.start();
    let animationFrame = () => {
      let now = Date.now();
      if (endTime && (now > endTime)) {
        return;
      }

      strategy.animationFrame();
      window.requestAnimationFrame(animationFrame);
    }
    animationFrame();    
  }

}

module.exports = Sparkle;
