// ==========================================
// 1. SYSTEM ELEMENTS & BOOT SEQUENCE
// ==========================================
const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const loginScreen = document.getElementById('login-screen');
const desktop = document.getElementById('desktop');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('login-error');

const bootLogs = [
    "Loading GRUB 2.02...",
    "Booting TEX_KERNEL_v4.19...",
    "[ <span class='boot-ok'>OK</span> ] Started System Logging Service.",
    "[ <span class='boot-ok'>OK</span> ] Mounted /dev/sda1 to /boot.",
    "[ <span class='boot-ok'>OK</span> ] Connected to TAS Hotel Network.",
    "[ <span class='boot-fail'>FAILED</span> ] Failed to start Containment Daemon Sector 4.",
    "Retrying Containment Daemon... [ <span class='boot-fail'>DENIED: ENTITY BREACH</span> ]",
    "[ <span class='boot-ok'>OK</span> ] Started Windows XP Emulator.",
    "Welcome to TEX OS."
];

async function runBootSequence() {
    for (let i = 0; i < bootLogs.length; i++) {
        bootText.innerHTML += bootLogs[i] + "<br>";
        await new Promise(r => setTimeout(r, Math.random() * 300 + 100));
    }
    await new Promise(r => setTimeout(r, 1000));
    bootScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
}

window.onload = runBootSequence;

// ==========================================
// 2. LOGIN & FULL SCREEN LOGIC
// ==========================================
loginBtn.addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    if (user === "TEX-9902" && pass === "RUIN_FOUNDATION") {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        loginScreen.classList.add('hidden');
        desktop.classList.remove('hidden');
        startClock();
    } else {
        errorMsg.classList.remove('hidden');
    }
});

function startClock() {
    setInterval(() => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('clock').innerText = hours + ':' + minutes + ' ' + ampm;
    }, 1000);
}

// ==========================================
// 3. WINDOW MANAGEMENT & DRAGGING
// ==========================================
let highestZ = 10;

function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    menu.classList.toggle('hidden');
    if (!menu.classList.contains('hidden')) {
        highestZ += 1;
        menu.style.zIndex = highestZ;
    }
}

function openWindow(id) {
    const win = document.getElementById(id);
    win.classList.remove('hidden');
    highestZ += 1;
    win.style.zIndex = highestZ;
}

function closeWindow(id) {
    document.getElementById(id).classList.add('hidden');
}

function openNotepad(title, content) {
    openWindow('window-notepad');
    document.getElementById('notepad-title').innerText = title + " - Notepad";
    document.getElementById('notepad-text').value = content;
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

// ==========================================
// 4. TAS MAIL EXPRESS
// ==========================================
const emails = {
    1: {
        subject: "The Old Pizzeria Props",
        sender: "From: Regional Director &lt;director@tas-hotels.com&gt;",
        body: "Mark,<br><br>I don't care what you found in the caves under the Multiplex. If you found old animatronic parts from Papa Bear's Palace, leave them there. The government investors paid us a lot of money to keep that area sealed off. Do NOT go past the changing door again."
    },
    2: {
        subject: "Found a weird mask device",
        sender: "From: Mark (Maintenance) &lt;maintenance@tas-hotels.com&gt;",
        body: "Boss, I'm scared. I found a heavy plastic mask on the floor near the old testing rooms. I put it on as a joke, but it did something to my head. Something poked the back of my eye. <br><br>Now there is a cartoon thing in my vision calling itself 'H.E.L.P.R'. It keeps telling me to stay away from the M.X.E.S server. What is going on?"
    },
    3: {
        subject: "AUTOMATED ALERT: COLD HARBOR",
        sender: "From: SYSTEM &lt;M.X.E.S@tex.local&gt;",
        body: "WARNING: ASOIK Containment Level Fluctuating.<br><br>If primary M.X.E.S server is shut down by unauthorized Occipital Transponder, the facility will collapse. Elevator routing will default to deep-storage sector: COLD HARBOR.<br><br>May God have mercy on whoever is in that elevator."
    }
};

window.readMail = function(id) {
    document.getElementById('mail-subject').innerHTML = emails[id].subject;
    document.getElementById('mail-sender').innerHTML = emails[id].sender;
    document.getElementById('mail-body').innerHTML = emails[id].body;
};

// ==========================================
// 5. HACKER BROWSER (TEXNet)
// ==========================================
const searchInput = document.getElementById('hacker-search-input');
const targetQuery = "Papa Bears Palace 1987 M.X.E.S incident";
let currentTypeIndex = 0;

searchInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        document.getElementById('search-results').classList.remove('hidden');
        return;
    }
    if (e.key.length !== 1) return;
    e.preventDefault();
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
});

function backToSearch() {
    document.getElementById('browser-lore').classList.add('hidden');
    document.getElementById('browser-search').classList.remove('hidden');
}

// ==========================================
// 6. TEX_SAT TERMINAL
// ==========================================
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
    await slowPrint("------------------------------------------", 5);
    await slowPrint("1) /UNLOCK_TAS_ELEVATOR");
    
    termInputLine.classList.remove('hidden');
    termInput.focus();
}

termInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value;
        termInput.value = '';
        termInputLine.classList.add('hidden');
        await slowPrint(`> ${cmd}`, 0);
        
        if (cmd === "1" || cmd === "/UNLOCK_TAS_ELEVATOR") {
            await slowPrint("SENDING SIGNAL TO TAS_HOTEL_ROUTER... DOORS OPENED.");
        } else {
            await slowPrint("UNKNOWN COMMAND.");
        }
        
        termInputLine.classList.remove('hidden');
        termInput.focus();
    }
});
