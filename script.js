const trailContainer = document.querySelector('.trail-container');

// Settings
const maxTrails = 100;
const trailLifetime = 500;
const spawnDelay = 1;
const trailSize = 12;

let trails = [];
let mouseX = 0;
let mouseY = 0;

// Cursor ring
const cursorRing = document.createElement('div');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorRing);

// Mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Smooth cursor ring movement
let ringX = 0, ringY = 0;
function moveRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(moveRing);
}
moveRing();

// Create a trail dot
function createTrail() {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${mouseX - trailSize / 2}px`;
    trail.style.top = `${mouseY - trailSize / 2}px`;

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

// Trail spawning loop
function loop() {
    createTrail();
    setTimeout(() => requestAnimationFrame(loop), spawnDelay);
}
requestAnimationFrame(loop);
