class ShapeSet {
  constructor() {
    this.shapes = [];
  }

  push(shape) {
    this.shapes.push(shape);
  }

  remove(shape) {
    let index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  frame(ctx) {
    this.shapes.forEach((shape) => {
      shape.frame(ctx);
    });
  }
}

export default ShapeSet;