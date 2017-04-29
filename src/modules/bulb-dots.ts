export function dotsCanvas() {
  const canvasElement = <HTMLCanvasElement>document.getElementById('canvas'),
    canvas = canvasElement.getContext('2d'),
    h = canvasElement.height = window.innerHeight,
    w = canvasElement.width = window.innerWidth;

  const options = {
    bulbSize: 50,
    bulbLightColor: '#fcfcfc',
    bgc: 'rgba(66,124,245,opacity)',
    bgcRedrawOpacity: 0.05,
    blinkChance: 0.3
  };
  const bulbs = [],
    baseRad = Math.PI * 2,
    wAmount = Math.floor(w / options.bulbSize),
    hAmount = Math.floor(h / options.bulbSize);

  let tick = 0;

  function randomColor() {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
  }

  class Bulb {
    x: number;
    y: number;
    radius: number;
    color: string;

    reset(xPos: number, yPos: number) {
      this.radius = options.bulbSize / 2;
      this.color = options.bulbLightColor;
      this.x = xPos * options.bulbSize + this.radius;
      this.y = yPos * options.bulbSize + this.radius;
    }

    spark() {
      canvas.fillStyle = randomColor();
      canvas.beginPath();
      canvas.arc(this.x, this.y, this.radius, 0, baseRad);
      canvas.fill();
    }
  }
  function initStuff() {
    for (let i = 0; i < hAmount; i++) {
      const lineData = [];
      for (let j = 0; j < wAmount; j++) {
        lineData.push(new Bulb());
      }
      bulbs.push(lineData);
    }
    for (let i = 0; i < hAmount; i++) {
      for (let j = 0; j < wAmount; j++) {
        bulbs[ i ][ j ].reset(j, i);
      }
    }
    // console.log(bulbs);
    loop();
  }

  initStuff();

  function loop() {
    tick++;
    canvas.fillStyle = options.bgc.replace('opacity', options.bgcRedrawOpacity + '');
    canvas.fillRect(0, 0, w, h);
    if (Math.random() < options.blinkChance) {
      const randomW = Math.floor(Math.random() * wAmount);
      const randomH = Math.floor(Math.random() * hAmount);
      bulbs[ randomH ][ randomW ].spark();
    }
    requestAnimationFrame(loop);
  }
}
