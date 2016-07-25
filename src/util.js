class Util {
  defaults(base, override) {
    for (let key in override) {
      if (override.hasOwnProperty(key)) {
        base[key] = override[key];
      }
    }
    return base;
  }

  rand(min, max) {
    let range = max - min;
    return Math.round(Math.random() * range) + min;
  }

  randAlpha(min, max, base = 1) {
    return this.rand(min, max) * base;
  }

  randPosition(min, max, base = [0, 0]){
    return [
      this.rand(min[0] + base[0], max[0] + base[0]),
      this.rand(min[1] + base[1], max[1] + base[1])
    ];
  }

  randAngle() {
    let angle = [0,15,45,75][this.rand(0, 3)];
    return angle;
  }


  ensureVisible(shape, upperLeft = [0,0], bottomRight = [500, 500]) {
    let radius = shape.size / 2;

    let leftBound = shape.pos[0] - radius;
    let rightBound = shape.pos[0] + radius;
    let topBound = shape.pos[1] - radius;
    let bottomBound = shape.pos[1] + radius;

    if (leftBound < upperLeft[0]) {
      shape.pos[0] += upperLeft[0] - leftBound;
    } else if (rightBound > bottomRight[0]) {
      shape.pos[0] -= rightBound - bottomRight[0];
    }

    if (topBound < upperLeft[1]) {
      shape.pos[1] += upperLeft[1] - topBound;
    } else if (bottomBound > bottomRight[1]) {
      shape.pos[1] -= bottomBound - bottomRight[1];
    }
  }
}

let instance = new Util();
export default instance;
