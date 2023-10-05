const canvas = document.getElementById("canvas");
const form = document.querySelector("form");
const particlesNumber = document.querySelector(".particle_size");
const particleRadiusMin = document.querySelector(".radius_min");
const particleRadiusMax = document.querySelector(".radius_max");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 300);
const CANVAS_HEIGHT = (canvas.height = 300);
let particles = [];
let PARTICLE_SIZE = 20;
let RADIUS_MIN = 2;
let RADIUS_MAX = 50;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const size = Number(particlesNumber.value);
  const rMin = Number(particleRadiusMin.value);
  const rMax = Number(particleRadiusMax.value);
  if (!size || !rMin || !rMax) {
    alert(`Please enter a valid number`);
    particlesNumber.value = "";
    particleRadiusMin.value = "";
    particleRadiusMax.value = "";
    return;
  }
  if (rMin > rMax) {
    alert("Please Choose a valid range");
    particleRadiusMax.value = "";
    particleRadiusMin.value = "";
  }
  PARTICLE_SIZE = size;
  RADIUS_MIN = rMin;
  RADIUS_MAX = rMax;
  generateParticle(PARTICLE_SIZE);
});

function setBackground(color) {
  ctx.beginPath();
  ctx.fillStyle = color || "black";
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
  ctx.closePath();
}

function generateParticle(length) {
  particles = [];
  for (let i = 0; i < length; i++) {
    particles.push(
      new Particle(
        generateRandom(0, CANVAS_WIDTH),
        generateRandom(0, CANVAS_HEIGHT),
        generateRandom(RADIUS_MIN, RADIUS_MAX),
        "purple"
      )
    );
  }
}

function generateRandom(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "red";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setR(r) {
    this.r = r;
  }
}
generateParticle(PARTICLE_SIZE);
function update() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  setBackground("black");
  particles.forEach((particle) => {
    particle.draw();
    particle.move();
  });
  requestAnimationFrame(update);
}

update();
