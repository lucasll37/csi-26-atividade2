let mouseX = 0;
let mouseY = 0;

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const plane = new Image();
const missile = new Image();

plane.src = 'assets/plane.png';
missile.src = 'assets/missile.png';


function drawPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plane, mouseX - 75, mouseY - (50), 150, 100);
}

function drawMissile() {
    const angleInDegrees = 45;
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    // ctx.save();
    // ctx.translate(canvas.width/2 - 75, canvas.height - 100);
    // ctx.rotate(angleInRadians);
    ctx.drawImage(missile, canvas.width/2 - 75, canvas.height - 100, 150, 100);
    // ctx.restore();
}

plane.addEventListener('load', () => drawPlane(plane));
missile.addEventListener('load', () => drawMissile(missile));

canvas.addEventListener("mousemove", function(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
    drawPlane(plane);
    drawMissile(missile);
});


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();