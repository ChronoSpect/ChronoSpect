// Particle background effect (small circle instead of particles)
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cursorCircle = {
  x: -100,
  y: -100,
  size: 20,
  color: 'rgba(0, 255, 255, 0.7)'
};

// Function to update the position of the cursor circle
function updateCursorPosition(e) {
  cursorCircle.x = e.clientX;
  cursorCircle.y = e.clientY;
}

// Draw the cursor circle on the canvas
function drawCursorCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.fillStyle = cursorCircle.color;
  ctx.beginPath();
  ctx.arc(cursorCircle.x, cursorCircle.y, cursorCircle.size, 0, Math.PI * 2);
  ctx.fill();
}

// Update canvas every frame
function animateCanvas() {
  drawCursorCircle();
  requestAnimationFrame(animateCanvas);
}

// Listen for mousemove events to update the cursor position
window.addEventListener('mousemove', updateCursorPosition);

// Start the canvas animation loop
animateCanvas();

// Handle hover effects for individual letters of ChronoSpect
const chronoSpect = document.getElementById("hoverEffect");
const letters = chronoSpect.innerText.split('');
chronoSpect.innerHTML = '';  // Clear the original text

// Add individual span elements for each letter
letters.forEach(letter => {
  const span = document.createElement("span");
  span.innerText = letter;
  chronoSpect.appendChild(span);
});

// Show "Enter" button when hovering near ChronoSpect text
const enterBtn = document.querySelector('.enter-btn');

chronoSpect.addEventListener('mouseenter', () => {
  enterBtn.classList.add('visible');
});

// Scroll to next section on "Enter" button click
enterBtn.addEventListener('click', () => {
  const nextSection = document.getElementById('div-2');
  nextSection.scrollIntoView({ behavior: 'smooth' });
});
