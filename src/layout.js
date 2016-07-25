class Layout {

  grid(canvasSize, desiredBoxSize, callback) {
    let boxesAcross = Math.ceil(canvasSize[0] / desiredBoxSize[0]);
    let boxesDown = Math.ceil(canvasSize[1] / desiredBoxSize[1]);
    let boxSize = [
      Math.ceil(canvasSize[0] / boxesAcross),
      Math.ceil(canvasSize[1] / boxesDown)
    ];

    for (let i = 0; i < boxesAcross; i++) {
      for (let j = 0; j < boxesDown; j++) {
        let boxBase = [
          (boxSize[0] * i),
          (boxSize[1] * j) 
        ];
        callback(boxBase, boxSize);
      }
    }
  }

}

let instance = new Layout();
export default instance;
