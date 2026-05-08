// --- Elements ---
const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const loginScreen = document.getElementById('login-screen');
const desktop = document.getElementById('desktop');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('login-error');

// --- 1. Linux Kernel Boot Sequence ---
const bootLogs = [
    "Loading GRUB 2.02...",
    "Booting TEX_KERNEL_v4.19...",
    "[ <span class='boot-ok'>OK</span> ] Started System Logging Service.",
    "[ <span class='boot-ok'>OK</span> ] Mounted /dev/sda1 to /boot.",
    "[ <span class='boot-ok'>OK</span> ] Reached target Local File Systems.",
    "[ <span class='boot-fail'>FAILED</span> ] Failed to start Containment Daemon Sector 4.",
    "Retrying Containment Daemon... [ <span class='boot-fail'>DENIED</span> ]",
    "[ <span class='boot-ok'>OK</span> ] Started Network Manager.",
    "Starting TEX Graphic Interface...",
    "Welcome to TEX OS."
];

async function runBootSequence() {
    for (let i = 0; i < bootLogs.length; i++) {
        bootText.innerHTML += bootLogs[i] + "<br>";
        // Random fast delay like a real computer booting
        await new Promise(r => setTimeout(r, Math.random() * 300 + 100));
    }
    await new Promise(r => setTimeout(r, 1000));
    bootScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
}

// Start boot sequence immediately when page loads
window.onload = runBootSequence;

// --- 2. Login & Full Screen Logic ---
loginBtn.addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    if (user === "TEX-9902" && pass === "RUIN_FOUNDATION") {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        loginScreen.classList.add('hidden');
        desktop.classList.remove('hidden');
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// --- 3. Window Management & Dragging ---
let highestZ = 10;

function openWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('hidden');
    highestZ += 1;
    win.style.zIndex = highestZ;
}

function closeWindow(id) {
    document.getElementById(id).classList.add('hidden');
}

document.querySelectorAll('.xp-window').forEach(win => {
    win.addEventListener('mousedown', () => {
        highestZ += 1;
        win.style.zIndex = highestZ;
    });

    const titleBar = win.querySelector('.title-bar');
    let isDragging = false, startX, startY, initialLeft, initialTop;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        initialLeft = win.offsetLeft; initialTop = win.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = `${initialLeft + (e.clientX - startX)}px`;
        win.style.top = `${initialTop + (e.clientY - startY)}px`;
    });

    document.addEventListener('mouseup', () => { isDragging = false; });
});

// --- 4. Hacker Web Browser (The Typer) ---
const searchInput = document.getElementById('hacker-search-input');
const targetQuery = "TEX Company History classified incident";
let currentTypeIndex = 0;

searchInput.addEventListener('keydown', (e) => {
    // Ignore Backspace, Enter, etc.
    if (e.key === "Enter") {
        document.getElementById('search-results').classList.remove('hidden');
        return;
    }
    if (e.key.length !== 1) return; // Only trigger on letters/numbers
    
    e.preventDefault(); // Stop them from typing their own letter
    
    // Type the next letter of our secret phrase instead
    if (currentTypeIndex < targetQuery.length) {
        searchInput.value += targetQuery[currentTypeIndex];
        currentTypeIndex++;
    }
});

document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('search-results').classList.remove('hidden');
});

document.getElementById('lore-link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('browser-search').classList.add('hidden');
    document.getElementById('browser-lore').classList.remove('hidden');
    document.getElementById('browser-url').innerText = "intranet://docs/history-classified";
});

function backToSearch() {
    document.getElementById('browser-lore').classList.add('hidden');
    document.getElementById('browser-search').classList.remove('hidden');
    document.getElementById('browser-url').innerText = "intranet://search";
}

// --- 5. TEX_SAT Terminal Logic (From before) ---
const termOutput = document.getElementById('output');
const termInputLine = document.getElementById('input-line');
const termInput = document.getElementById('term-input');
const windowTerminal = document.getElementById('window-terminal');

function openTerminal() {
    openWindow('window-terminal');
    if (termOutput.innerHTML === "") runTexSatBoot();
}

async function slowPrint(text, delay = 20) {
    for (let char of text) {
        termOutput.innerHTML += char;
        windowTerminal.querySelector('.window-content').scrollTop = 9999;
        await new Promise(r => setTimeout(r, delay));
    }
    termOutput.innerHTML += "<br>";
}

async function runTexSatBoot() {
    termInputLine.classList.add('hidden');
    await slowPrint("BOOTING TEX_SAT v4.0.2...", 10);
    await slowPrint("[ OK ] KERNEL LOADED", 10);
    await slowPrint("[ OK ] UPLINK TO ROBLOX_SERVER_01 ESTABLISHED", 10);
    await slowPrint("------------------------------------------", 5);
    await slowPrint("1) /UNLOCK_FACILITY");
    
    termInputLine.classList.remove('hidden');
    termInput.focus();
}

termInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value;
        termInput.value = '';
        termInputLine.classList.add('hidden');
        await slowPrint(`> ${cmd}`, 0);
        
        if (cmd === "1" || cmd === "/UNLOCK_FACILITY") {
            await slowPrint("SENDING SIGNAL... DOORS OPENED.");
        } else {
            await slowPrint("UNKNOWN COMMAND.");
        }
        
        termInputLine.classList.remove('hidden');
        termInput.focus();
    }
});
