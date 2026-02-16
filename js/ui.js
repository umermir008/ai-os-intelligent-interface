// UI State & Selectors
const sidebar = document.getElementById('sidebar');
const settingsPanel = document.getElementById('settings-panel');
const toastContainer = document.getElementById('toast-container');

function toggleSidebar() {
    sidebar.classList.toggle('-left-full');
    sidebar.classList.toggle('left-0');
}

function toggleSettings() {
    settingsPanel.classList.toggle('translate-x-full');
}

function setActiveTab(el) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('tab-active', 'text-white');
        item.classList.add('text-slate-400', 'hover:text-white');
    });
    el.classList.add('tab-active', 'text-white');
    el.classList.remove('text-slate-400');
    if (window.innerWidth < 1024) toggleSidebar();
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'glass p-3 px-5 rounded-2xl border-l-4 border-os-cyan text-xs font-bold pointer-events-auto transition-all transform translate-x-12 opacity-0 shadow-xl';
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-x-12', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-x-12', 'opacity-0');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function setTheme(mode) {
    const darkBtn = document.getElementById('theme-dark');
    const lightBtn = document.getElementById('theme-light');
    
    if(mode === 'dark') {
        document.body.classList.remove('light-mode');
        darkBtn.className = "flex-1 py-2 bg-os-cyan text-os-bg rounded-lg text-xs font-bold";
        lightBtn.className = "flex-1 py-2 text-slate-400 text-xs font-bold";
        showToast('Theme set to Neural Dark.');
    } else {
        document.body.classList.add('light-mode');
        lightBtn.className = "flex-1 py-2 bg-os-cyan text-os-bg rounded-lg text-xs font-bold";
        darkBtn.className = "flex-1 py-2 text-slate-400 text-xs font-bold";
        showToast('Neural Light mode active.');
    }
}

function toggleSwitch(el) {
    const dot = el.querySelector('div');
    const isOff = el.classList.contains('bg-white/10');
    
    if(isOff) {
        el.classList.remove('bg-white/10');
        el.classList.add('bg-os-cyan', 'shadow-[0_0_10px_rgba(0,245,255,0.3)]');
        dot.classList.remove('left-0.5');
        dot.classList.add('right-0.5');
        dot.classList.remove('bg-white/50');
        dot.classList.add('bg-white');
    } else {
        el.classList.add('bg-white/10');
        el.classList.remove('bg-os-cyan', 'shadow-[0_0_10px_rgba(0,245,255,0.3)]');
        dot.classList.add('left-0.5');
        dot.classList.remove('right-0.5');
        dot.classList.add('bg-white/50');
        dot.classList.remove('bg-white');
    }
    showToast('System parameter toggled.');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('API Key copied to matrix clipboard.');
    }).catch(() => {
        showToast('Clipboard access denied.');
    });
}

function closeModal(status) {
    document.getElementById('config-modal').classList.add('hidden');
    document.getElementById('config-modal').classList.remove('flex');
    if(status === 'success') showToast('Node logic updated.');
}

function configNode(type) {
    document.getElementById('modal-title').innerText = type + ' Node';
    document.getElementById('node-id').innerText = '0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    document.getElementById('config-modal').classList.remove('hidden');
    document.getElementById('config-modal').classList.add('flex');
}

// Mobile UX Guard: Fixes layout glitch when resizing
window.addEventListener('resize', () => {
    if(window.innerWidth >= 1024){
        sidebar.classList.remove('-left-full');
        sidebar.classList.add('left-0');
    } else {
        sidebar.classList.add('-left-full');
        sidebar.classList.remove('left-0');
    }
});

// Export UI components globally for simplicity in this prototype
window.toggleSidebar = toggleSidebar;
window.toggleSettings = toggleSettings;
window.setActiveTab = setActiveTab;
window.showToast = showToast;
window.setTheme = setTheme;
window.toggleSwitch = toggleSwitch;
window.copyToClipboard = copyToClipboard;
window.closeModal = closeModal;
window.configNode = configNode;
