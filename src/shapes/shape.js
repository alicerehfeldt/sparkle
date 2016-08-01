import util from '../util';

class Shape {

  constructor(config = {}) {
    config = util.defaults(this.defaults(), config);
    this.position = config.position;
    this.angle = config.angle;
    this.size = config.size;
    this.alpha = config.alpha;
    this.color = config.color;
    this.spinDPS = config.spinDPS;
    this.fill = config.fill;
    this.moving = false;
    this.rotating = false;
    this.spinning = false;
    this.fading = false;
    this.transitionProperties = new Map();
  }

  defaults() {
    return {
      position: [0,0],
      angle: 0,
      size: 10,
      alpha: 1, 
      color: '#ff00ff',
      spinDPS: 90,
      fill: true
    }
  }

  draw(ctx) {

  }

  frame(ctx) {
    if (this.alpha > 0) {
      this.draw(ctx);      
    }
    let now = Date.now();
    let actions = ['moving', 'rotating', 'spinning', 'fading'];
    actions.forEach((key) => {
      if (this[key] !== false) {
        this[key](now);
      }
    });
    this.transitionProperties.forEach((callback) => {
      callback(now);
    });
  }

  move(to, duration = 1000, curve = 'linear') {
    return new Promise((resolve, reject) => {
      if (this.moving !== false) {
        reject();
        return;
      }
      let from = [this.position[0], this.position[1]];
      let startTime = Date.now();
      let endTime = startTime + duration;

      this.moving = (now) => {
        if (now > endTime) {
          this.moving = false;
          resolve(this);
          return;
        }
        let p = (now - startTime) / duration;
        this.position = util.easing(from, to, p, curve);
      }
    });
  }

  spin(clockwise = true, numSpins = false) {
    return new Promise((resolve, reject) => {
      if (this.spinning !== false || this.transitionProperties.has('angle')) {
        reject();
        return;
      }
      let startAngle = this.angle;
      let angleTick = 0;
      let spinTick = Date.now();
      let spinCount = 0;
      let spinRate = (this.spinDPS / 1000);

      this.spinning = (now) => {
        let elapsed = now - spinTick;
        let delta = elapsed * spinRate;
        angleTick += delta;
        if (angleTick > 360) {
          spinCount++;
          if (numSpins !== false && spinCount >= numSpins) {
            this.spinning = false;
            this.angle = startAngle;
            resolve(this);
            return;
          } else {
            angleTick -= 360;
          }
        }

        if (!clockwise) {
          delta = delta * -1;
        }

        let newAngle = this.angle + delta;
        if (newAngle > 360) {
          newAngle -= 360;
        } else if ( newAngle < 0 ) {
          newAngle += 360;
        }
        this.angle = newAngle;
        spinTick = now;
      }



    });
  }

  transition(property, to, duration = 0, curve = 'linear') {
    return new Promise((resolve, reject) => {
      duration = parseInt(duration, 10);
      if (this.transitionProperties.has(property)) {
        reject();
        return;
      }

      let from = this[property];
      let startTime = Date.now();
      let endTime = startTime + duration;
      let callback = (now) => {
        if (now > endTime) {
          this.transitionProperties.delete(property);
          resolve(this);
          return;
        }
        let p = (now - startTime) / duration;
        this[property] = util.easing(from, to, p, curve);
      }
      this.transitionProperties.set(property, callback);
    });
  }
}

export default Shape;