// App State
let currentSync = 98;
let perfScore = 99.2;

function updateMemoryUsage() {
    const percent = Math.floor(Math.random() * 30) + 60; // 60–90%
    const circle = document.getElementById('memory-circle');
    const radius = 58;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    document.getElementById('memory-percent').innerText = percent + '%';
}

function renderBars() {
    const chart = document.getElementById('bar-chart');
    if (!chart) return;
    chart.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const height = Math.floor(Math.random() * 80) + 20;
        const bar = document.createElement('div');
        bar.className = 'flex-1 bg-os-lime/20 rounded-sm relative overflow-hidden';
        bar.innerHTML = `<div class="absolute bottom-0 w-full bg-os-lime transition-all duration-500" style="height: ${height}%"></div>`;
        chart.appendChild(bar);
    }
}

function refreshStats() {
    perfScore = (Math.random() * (99.9 - 95.0) + 95.0).toFixed(1);
    const scoreEl = document.getElementById('perf-score');
    if (scoreEl) scoreEl.innerText = perfScore;
    renderBars();
    if (window.showToast) window.showToast('Stats recalibrated.');
}

function initBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootBar = document.querySelector('.boot-bar');
    const bootText = document.getElementById('boot-text');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => bootScreen.remove(), 500);
            }, 500);
        }
        bootBar.style.width = progress + '%';
        const tasks = ["Loading Neural Kernels...", "Syncing Memory Matrix...", "Establishing Neural Links...", "Finalizing UI..."];
        bootText.innerText = tasks[Math.floor(progress / 26)];
    }, 100);
}

// Reduced Motion Support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) window.lucide.createIcons();
    initBootSequence();
    renderBars();

    // Periodic Updates
    setInterval(() => {
        // Update Latency
        const lat = Math.floor(Math.random() * 20) + 5;
        const latEl = document.getElementById('footer-latency');
        if (latEl) latEl.innerText = lat + 'ms';

        // Sync Pulse
        currentSync = (97 + Math.random()).toFixed(1);
        const syncValEl = document.getElementById('sync-val');
        const syncBarEl = document.getElementById('sync-bar');
        if (syncValEl) syncValEl.innerText = currentSync + '%';
        if (syncBarEl) syncBarEl.style.width = currentSync + '%';

        // Memory Update (Fix: Animate circle)
        updateMemoryUsage();
    }, 5000);
});

// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.transform = 'scale(0)';
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 300);
    }, 100);
});

window.refreshStats = refreshStats;

// Perspective Hover Effect
document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (xc - x) / 10;
        const dy = (y - yc) / 10;
        card.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Wave Chart Implementation
function updateWaveChart() {
    const chart = document.getElementById('bar-chart');
    if (!chart) return;

    // Replace bars with SVG if not already present
    if (!chart.querySelector('svg')) {
        chart.innerHTML = `
            <div class="wave-container">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style="width: 100%; height: 100%;">
                    <path class="wave-path" d="M0,10 Q25,10 50,10 T100,10"></path>
                </svg>
            </div>
        `;
    }

    const path = chart.querySelector('.wave-path');
    let d = "M0,10 ";
    for (let i = 0; i <= 10; i++) {
        const x = i * 10;
        const y = 5 + Math.random() * 10;
        if (i === 0) d += `M${x},${y} `;
        else {
            const prevX = (i - 1) * 10;
            const cpX = (prevX + x) / 2;
            d += `Q${cpX},${y} ${x},${y} `;
        }
    }
    path.setAttribute('d', d);
}

// Update wave chart periodically
setInterval(updateWaveChart, 2000);
updateWaveChart();
window.scrollMarketplace = function (dir) {
    const carousel = document.getElementById('agent-carousel');
    const scrollAmount = 300;
    carousel.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
}
window.deployAgent = function (name) {
    if (window.showToast) window.showToast(`Deploying ${name} to cluster-01...`);
    setTimeout(() => { if (window.showToast) window.showToast(`${name} active and running.`); }, 1500);
}
window.activateAgent = function () {
    if (window.showToast) window.showToast('Initializing Global Agent Interface...');
    setTimeout(() => { if (window.showToast) window.showToast('Agent Matrix Synchronized.'); }, 1000);
}
