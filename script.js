// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');

const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

window.addEventListener('mousemove', (e) => {
    xToCursor(e.clientX - 10);
    yToCursor(e.clientY - 10);
    xToDot(e.clientX - 2);
    yToDot(e.clientY - 2);
});

// Hover effect for interactive elements
const hoverEnter = () => gsap.to(cursor, { scale: 1.5, borderColor: '#a855f7', duration: 0.2 });
const hoverLeave = () => gsap.to(cursor, { scale: 1, borderColor: '#00d4ff', duration: 0.2 });

document.querySelectorAll('a, button, input, textarea, .interactive').forEach(el => {
    el.addEventListener('mouseenter', hoverEnter);
    el.addEventListener('mouseleave', hoverLeave);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass-strong', 'py-4');
        navbar.classList.remove('py-6', 'bg-transparent');
    } else {
        navbar.classList.remove('glass-strong', 'py-4');
        navbar.classList.add('py-6', 'bg-transparent');
    }
});

// Mobile Menu
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 });
gsap.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
gsap.from('.hero-desc', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.9 });
gsap.from('.hero-buttons', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.2 });

// Scroll Animations
gsap.from('.about-text', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    x: -50, opacity: 0, duration: 1, ease: 'power3.out'
});

gsap.from('.about-card', {
    scrollTrigger: { trigger: '#about', start: 'top 70%' },
    y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
});

gsap.from('.skill-category', {
    scrollTrigger: { trigger: '#skills', start: 'top 75%' },
    y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
});

gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects', start: 'top 70%' },
    y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
});

// Timeline Line Animation
gsap.from('#timeline-line', {
    scrollTrigger: {
        trigger: '#experience',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: 1
    },
    scaleY: 0
});

// Three.js Particles
const container = document.getElementById('particle-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const particleCount = 150;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const particles = [];

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 10;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    particles.push({
        speed: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2
    });
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const points = new THREE.Points(geometry, material);
scene.add(points);

const light1 = new THREE.PointLight(0x00d4ff, 2, 10);
const light2 = new THREE.PointLight(0xa855f7, 2, 10);
scene.add(light1, light2);

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;

    const posArr = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += Math.sin(time * particles[i].speed + i) * 0.002;
        posArr[i * 3] += Math.cos(time * particles[i].speed * 0.5 + i) * 0.001;
    }
    geometry.attributes.position.needsUpdate = true;

    points.rotation.y = time * 0.02;
    points.rotation.x = time * 0.01;

    light1.position.set(Math.cos(time * 0.5) * 3, Math.sin(time * 0.5) * 3, 2);
    light2.position.set(Math.sin(time * 0.3) * 4, Math.cos(time * 0.3) * 4, 3);

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Notifications
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

function showNotification(text) {
    notificationText.innerText = text;
    notification.classList.remove('opacity-0', 'pointer-events-none');
    notification.classList.add('opacity-100');
    setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0', 'pointer-events-none');
    }, 3000);
}

document.querySelectorAll('.coming-soon').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('This link is coming soon! 🚀');
    });
});

// Form Handling
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent! (Demo)');
    e.target.reset();
});