const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_SIZE = 700;
const colors = document.querySelectorAll('.controls__colors > button');
const range = document.querySelector('.controls__range input');
const mode = document.querySelector('.fill-btn');
const save = document.querySelector('.save-btn');

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

}

function startPainting() {
  painting = true;
};

function stopPainting() {
  painting = false;
};

function changeColor(event) {
  const target = event.currentTarget;
  const color = target.style.backgroundColor;

  if (filling) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.strokeStyle = color;
  }
};

function preventMenu(e) {
  e.preventDefault();
}

function saveImage(e) {
  const img = canvas.toDataURL();
  const link = document.createElement('a');

  link.href = img;
  link.download = 'PaintJS';
  link.click();
}

colors.forEach(ele => ele.addEventListener('click', changeColor));

range.addEventListener('change', e => {
  ctx.lineWidth = e.currentTarget.value;
});

mode.addEventListener('click', e => {
  if (!filling) {
    filling = true;
    e.currentTarget.innerText = 'Paint';
  } else {
    filling = false;
    e.currentTarget.innerText = 'Fill';
  }
})

save.addEventListener('click', saveImage)

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('contextmenu', preventMenu);