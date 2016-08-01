class ShapeSet {
  constructor() {
    this.shapes = [];
  }

  push(shape) {
    this.shapes.push(shape);
  }

  frame(ctx) {
    this.shapes.forEach((shape) => {
      shape.frame(ctx);
    })
  }
}

export default ShapeSet;