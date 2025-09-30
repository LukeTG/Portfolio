const trailContainer = document.querySelector('.trail-container');

const maxTrails = 100;
const trailLifetime = 500;
const spawnDelay = 16;
const trailSize = 12;

let trails = [];
let mouseX = 0;
let mouseY = 0;

const cursorRing = document.createElement('div');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorRing);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;  // switched to clientX
    mouseY = e.clientY;
});

let ringX = 0, ringY = 0;
function moveRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(moveRing);
}
moveRing();

let isMouseDown = false;
document.addEventListener('mousedown', () => {
    isMouseDown = true;
    cursorRing.classList.add('active');
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    cursorRing.classList.remove('active');
});

function createTrail() {
    const trail = document.createElement('div');
    trail.classList.add('trail');

    if (isMouseDown) {
        trail.classList.add('active');
    }

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

let lastTrailTime = 0;
function trailLoop() {
    const now = Date.now();
    if (now - lastTrailTime > spawnDelay) {
        createTrail();
        lastTrailTime = now;
    }
    requestAnimationFrame(trailLoop);
}
trailLoop();

const imageElement = document.getElementById("fading-image");

const images = [
    "Photo/Luke1.JPG",
    "Photo/Luke2.jpg",
    "Photo/Luke3.jpg",
    "Photo/Luke4.JPG"
];

let currentImageIndex = 0;

imageElement.addEventListener('click', () => {
    // Fade out
    imageElement.classList.add("hidden");

    // Wait for the CSS transition to complete before switching
    setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % images.length;
        const newSrc = images[nextIndex];

        const img = new Image();
        img.src = newSrc;

        img.onload = () => {
            currentImageIndex = nextIndex;
            imageElement.src = newSrc;

            // Fade back in
            imageElement.classList.remove("hidden");
        };
    }, 1000); // match this to the CSS fade duration (1s = 1000ms)
});


document.addEventListener("DOMContentLoaded", () => {
    const heroPage = document.getElementById("hero_page");
    const makeyPage = document.getElementById("makey_page");
    const eduPage = document.getElementById("edu_page");
    const musicPage = document.getElementById("music_page");

    const heroSwitch = document.getElementById("page-switch");
    const makeySwitch = document.getElementById("page-switch2");
    const eduSwitch = document.getElementById("page-switch3");
    const musicSwitch = document.getElementById("page-switch4");

    heroSwitch.addEventListener("click", () => {
        eduPage.style.display = "block";
        heroPage.style.display = "none";

        heroSwitch.style.display = "none";
        eduSwitch.style.display = "block";
    });

    makeySwitch.addEventListener("click", () => {
        heroPage.style.display = "block";
        makeyPage.style.display = "none";

        makeySwitch.style.display = "none";
        heroSwitch.style.display = "block";
    });
    musicSwitch.addEventListener("click", () => {
        makeyPage.style.display = "block";
        musicPage.style.display = "none";

        musicSwitch.style.display = "none";
        makeySwitch.style.display = "block";
    });
    eduSwitch.addEventListener("click", () => {
        eduPage.style.display = "none";
        musicPage.style.display = "block";

        eduSwitch.style.display = "none";
        musicSwitch.style.display = "block";
    });
}); // Properly closed

document.addEventListener('click', function (e) {
    const ring = document.createElement('div');
    ring.classList.add('ring');

    const size = 100; // base size before scaling
    ring.style.width = ring.style.height = `${size}px`;

    // Position centered on click point
    ring.style.left = `${e.clientX - size / 2}px`;
    ring.style.top = `${e.clientY - size / 2}px`;

    document.body.appendChild(ring);

    // Remove ring after animation ends
    ring.addEventListener('animationend', () => {
        ring.remove();
    });
});
