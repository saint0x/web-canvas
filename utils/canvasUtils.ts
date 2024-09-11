export const drawLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  brushSize: number
) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  fontSize: number,
  fontFamily: string = 'Arial',
  isBold: boolean = false,
  isItalic: boolean = false,
  isUnderline: boolean = false
) => {
  ctx.font = `${isItalic ? 'italic ' : ''}${isBold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);

  if (isUnderline) {
    const textWidth = ctx.measureText(text).width;
    ctx.beginPath();
    ctx.moveTo(x, y + 3);
    ctx.lineTo(x + textWidth, y + 3);
    ctx.strokeStyle = color;
    ctx.lineWidth = fontSize / 15;
    ctx.stroke();
  }
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  fill: boolean = false
) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  fill: boolean = false
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
};

export const eraseArea = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.clearRect(x, y, width, height);
};

export const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  rotation: number,
  color: string,
  fill: boolean = false
) => {
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
};

export const drawPolygon = (
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color: string,
  fill: boolean = false
) => {
  if (points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
};

export const setLineDash = (
  ctx: CanvasRenderingContext2D,
  segments: number[]
) => {
  ctx.setLineDash(segments);
};

export const resetLineDash = (ctx: CanvasRenderingContext2D) => {
  ctx.setLineDash([]);
};

export const setGlobalAlpha = (
  ctx: CanvasRenderingContext2D,
  alpha: number
) => {
  ctx.globalAlpha = alpha;
};

export const resetGlobalAlpha = (ctx: CanvasRenderingContext2D) => {
  ctx.globalAlpha = 1;
};

export const createLinearGradient = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  colorStops: { offset: number; color: string }[]
) => {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
  return gradient;
};

export const createRadialGradient = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number,
  colorStops: { offset: number; color: string }[]
) => {
  const gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));
  return gradient;
};