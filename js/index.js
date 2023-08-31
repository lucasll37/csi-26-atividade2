let mouseX = 0;
let mouseY = 0;
let fire = false;
let speed = 5;
const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

let hold_x;
let hold_y;

const audioPlane = document.getElementById('plane');
const audioBomb = document.getElementById('bomb');
const audioVouCair = document.getElementById('vouCair');



audioPlane.addEventListener('ended', () => {
    audioPlane.play();
});



function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    hold_x = canvas.width/2 - 75;
    hold_y = canvas.height - 70;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
const plane = new Image();
const missile = new Image();

plane.src = 'assets/plane.png';
missile.src = 'assets/missile-cold.png';


function drawPlane() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(plane, mouseX - 75, mouseY - (50), 150, 100);
}

function drawMissile() {
    delta = Math.atan((mouseX - hold_x)/(hold_y - mouseY));
    const angleInDegrees = -90;
    var angleInRadians = angleInDegrees * (Math.PI / 180) + delta;


    if(hold_y - mouseY < 0) angleInRadians += -Math.PI;

    if(fire) {
        if(hold_y - mouseY < 0) {
            hold_x -= speed * Math.sin(delta);
            hold_y += speed * Math.cos(delta);
        }
        else {
            hold_x += speed * Math.sin(delta);
            hold_y -= speed * Math.cos(delta);
        }
        if(hold_x > canvas.width || hold_x < 0 || hold_y > canvas.height || hold_y < 0) {
            hold_x = canvas.width/2 - 75;
            hold_y = canvas.height - 70;
            fire = false;
        }
    }
    
    ctx.save();
    ctx.translate(hold_x, hold_y);
    ctx.rotate(angleInRadians);
    ctx.drawImage(missile, -75, -50, 150, 100);
    ctx.restore();
}

plane.addEventListener('load', () => drawPlane(plane));
missile.addEventListener('load', () => drawMissile(missile));

canvas.addEventListener("mousemove", function(event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
});


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ccdcf4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    drawPlane(plane);
    drawMissile(missile);

    requestAnimationFrame(update);
};

requestAnimationFrame(update);

canvas.addEventListener("click", () => {
    fire = true
    audioPlane.play();
});

