import tinycolor from 'tinycolor2';

class Sparkle {
  constructor(opts) {
    this.canvas = null;
    this.endTime = null;
    this.config = {
      anchor: document.body,
      size: [500, 500],
      position: 'center',
      color: 'white'
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
    this.color = tinycolor(this.config.color);
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



  start(duration) {

    if (duration) {
      duration = parseInt(duration, 10);
      let now = Date.now();
      this.endTime = now + (duration * 1000);
    }


    this.animationFrame();
  }

  animationFrame() {
    let ctx = this.canvas.getContext('2d');
    //ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let position = [
      Math.round(Math.random() * this.size[0]),
      Math.round(Math.random() * this.size[1])
    ];
    ctx.beginPath();
    ctx.arc(position[0], position[1], 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();


    // let color = tinycolor(this.color);
    // color.setAlpha(0.6);
    // let colorString = color.toRgbString();
    // ctx.save();
    // ctx.beginPath();
    // ctx.arc(100, 100, 30, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fill();
    // ctx.restore();



    if (this.endTime && (Date.now() > this.endTime)) {
      this.endTime = false;
      return;
    }

    window.requestAnimationFrame(this.animationFrame.bind(this));
  }

}

module.exports = Sparkle;
