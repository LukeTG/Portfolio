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
    mouseX = e.pageX;
    mouseY = e.pageY;
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
    "Luke1.JPG",
    "Luke2.jpg",
    "Luke3.jpg",
    "Luke4.JPG"
];

let currentImageIndex = 0;

imageElement.addEventListener('click', () => {
    imageElement.classList.add("hidden");

    const nextIndex = (currentImageIndex + 1) % images.length;
    const newSrc = images[nextIndex];

    const img = new Image();
    img.src = newSrc;
    img.onload = () => {
        currentImageIndex = nextIndex;
        imageElement.src = newSrc;
        imageElement.classList.remove("hidden");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const heroPage = document.getElementById("hero_page");
    const workPage = document.getElementById("work_page");

    const heroSwitch = document.getElementById("page-switch");
    const workSwitch = document.getElementById("page-switch2");

    heroSwitch.addEventListener("click", () => {
        // Show work page, hide hero page
        workPage.style.display = "block";
        heroPage.style.display = "none";

        // Swap headers visibility
        heroSwitch.style.display = "none";
        workSwitch.style.display = "inline"; // or "block" if you prefer
    });

    workSwitch.addEventListener("click", () => {
        // Show hero page, hide work page
        heroPage.style.display = "block";
        workPage.style.display = "none";

        // Swap headers visibility
        workSwitch.style.display = "none";
        heroSwitch.style.display = "inline"; // or "block"
    });
});
