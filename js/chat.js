const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const thinkingIndicator = document.getElementById('thinking');

function createMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `flex gap-4 message-anim ${isUser ? 'flex-row-reverse' : ''}`;

    const iconBg = isUser ? 'bg-os-purple/20' : 'bg-os-cyan/20';
    const iconColor = isUser ? 'text-os-purple' : 'text-os-cyan';
    const iconName = isUser ? 'user' : 'bot';
    const alignment = isUser ? 'rounded-tr-none' : 'rounded-tl-none';
    const borderColor = isUser ? 'border-os-purple/20' : 'border-white/10';

    div.innerHTML = `
        <div class="w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0">
            <i data-lucide="${iconName}" class="w-5 h-5 ${iconColor}"></i>
        </div>
        <div class="bg-white/5 border ${borderColor} p-4 rounded-2xl ${alignment} max-w-[80%]">
            <p class="text-sm leading-relaxed">${text}</p>
        </div>
    `;

    chatWindow.appendChild(div);
    if (window.lucide) window.lucide.createIcons();

    // Bug Fix: Request animation frame to ensure scroll happens after render
    requestAnimationFrame(() => {
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    });
}

async function handleSend() {
    const val = chatInput.value.trim();
    if (!val) return;

    createMessage(val, true);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    thinkingIndicator.classList.remove('hidden');
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        thinkingIndicator.classList.add('hidden');
        const responses = [
            "Neural pathways updated. Analyzing cross-channel data for the specified parameters.",
            "Logic flow optimized. Would you like me to deploy the Content Weaver agent to finalize the output?",
            "Command acknowledged. Accessing secure memory bank for historical context...",
            "System check complete. All integration nodes are firing within nominal range."
        ];
        createMessage(responses[Math.floor(Math.random() * responses.length)]);
    }, 1500);
}

// Listeners
chatInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

window.handleSend = handleSend;
window.createMessage = createMessage;
