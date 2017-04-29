export function drawingCanvas() {
  const
    canvasElement = <HTMLCanvasElement>document.getElementById('canvas'),
    canvas = canvasElement.getContext('2d'),
    options = {
      radius: 35,
      color: 'hsl(hue,100%,40%)'
    };
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  let
    tick = 0,
    currentHue = 0,
    painting = false;


  canvasElement.addEventListener('mousedown', () => {
    canvas.beginPath();
    painting = true;
  });
  canvasElement.addEventListener('mouseup', () => {
    canvas.closePath();
    painting = false;
  });
  canvasElement.addEventListener('mousemove', (e) => {
    if (painting) {
      const
        posX = e.pageX,
        posY = e.pageY;
      ++tick;
      if (!(tick % 10)) {
        if (currentHue !== 356) {
          currentHue++;
        } else {
          currentHue = 0;
        }
      }
      const currentColor = options.color.replace('hue', currentHue.toString());
      canvas.strokeStyle = currentColor;
      canvas.lineTo(posX, posY);
      canvas.lineWidth = 5;
      canvas.stroke();
    }
  });

}

