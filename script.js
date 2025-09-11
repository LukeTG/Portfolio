const trailContainer = document.querySelector('.trail-container');

// Performance settings
const maxTrails = 25;      // Max number of dots alive at once
const trailLifetime = 350; // ms before a dot fades out
const spawnDelay = 60;     // ms between spawns

let trails = [];
let mouseX = 0;
let mouseY = 0;
let lastSpawn = 0;

// Create the permanent hollow circle (cursor ring)
const cursorRing = document.createElement('div');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorRing.style.left = `${mouseX}px`;
    cursorRing.style.top = `${mouseY}px`;

    const now = Date.now();
    if (now - lastSpawn > spawnDelay) {
        spawnTrail(mouseX, mouseY);
        lastSpawn = now;
    }
});

function spawnTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${x - 6}px`; // center trail
    trail.style.top = `${y - 6}px`;

    trailContainer.appendChild(trail);
    trails.push(trail);

    setTimeout(() => {
        trail.remove();
        trails = trails.filter(t => t !== trail);
    }, trailLifetime);

    if (trails.length > maxTrails) {
        const oldTrail = trails.shift();
        if (oldTrail) oldTrail.remove();
    }
}
