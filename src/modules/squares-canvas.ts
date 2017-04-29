export function squaresCanvas() {
  const
    canvasBody = <HTMLCanvasElement>document.getElementById('canvas'),
    canvas = canvasBody.getContext('2d'),
    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,
    options = {
      spawnOpacity: '1',
      size: 50,
      count: 2,
      sizeRandom: 10,
      sparkLife: 0.05,
      color: 'rgba(39,173,96,alpha)'
    };


  function anim() {
    step();
    window.requestAnimationFrame(anim);
  }

  function step() {
    const fillColor = options.color.replace('alpha', options.spawnOpacity);
    const randomSize = Math.random() * options.sizeRandom + options.size;
    const sizeD2 = options.size / 2;
    for (let i = 0; i < Math.round(options.count); i++) {
      canvas.fillStyle = fillColor;
      canvas.fillRect(-sizeD2 + Math.random() * w, -sizeD2 + Math.random() * h, randomSize, randomSize);
      canvas.fillStyle = `rgba(255,255,255,${options.sparkLife})`;
      canvas.fillRect(0, 0, w, h);
    }

  }

  anim();
}
