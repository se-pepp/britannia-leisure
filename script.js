// --- Elements ---
const loginScreen = document.getElementById('login-screen');
const desktop = document.getElementById('desktop');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('login-error');

const windowFiles = document.getElementById('window-files');
const windowTerminal = document.getElementById('window-terminal');
const iconFiles = document.getElementById('icon-files');
const fileTexSat = document.getElementById('file-tex-sat');

const termOutput = document.getElementById('output');
const termInputLine = document.getElementById('input-line');
const termInput = document.getElementById('term-input');

// --- 1. Login Logic ---
loginBtn.addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    
    if (user === "TEX-9902" && pass === "RUIN_FOUNDATION") {
        loginScreen.classList.add('hidden');
        desktop.classList.remove('hidden');
    } else {
        errorMsg.classList.remove('hidden');
    }
});

// --- 2. Window Management (Double Clicks) ---
function closeWindow(id) {
    document.getElementById(id).classList.add('hidden');
}

// Double click desktop icon -> Opens File Manager
iconFiles.addEventListener('dblclick', () => {
    windowFiles.classList.remove('hidden');
});

// Double click TEX_SAT.exe -> Opens Terminal
fileTexSat.addEventListener('dblclick', () => {
    windowTerminal.classList.remove('hidden');
    runTexSatBoot();
});

// --- 3. TEX_SAT Terminal Logic ---
async function slowPrint(text, delay = 20) {
    for (let char of text) {
        termOutput.innerHTML += char;
        windowTerminal.querySelector('.window-content').scrollTop = 9999;
        await new Promise(r => setTimeout(r, delay));
    }
    termOutput.innerHTML += "<br>";
}

async function runTexSatBoot() {
    termOutput.innerHTML = ""; // Clear screen
    termInputLine.classList.add('hidden'); // Hide input while booting
    
    await slowPrint("BOOTING TEX_SAT v4.0.2...", 10);
    await slowPrint("[ OK ] KERNEL LOADED", 10);
    await slowPrint("[ OK ] UPLINK TO ROBLOX_SERVER_01 ESTABLISHED", 10);
    await slowPrint("------------------------------------------", 5);
    await slowPrint("1) /UNLOCK_FACILITY");
    await slowPrint("2) /VIEW_LIVE_RADAR");
    await slowPrint("3) /TRIGGER_ALARM");
    
    termInputLine.classList.remove('hidden');
    termInput.focus();
}

// Handle Terminal Commands
termInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value;
        termInput.value = '';
        termInputLine.classList.add('hidden'); // Hide input while processing
        
        await slowPrint(`> ${cmd}`, 0);
        
        if (cmd === "1" || cmd === "/UNLOCK_FACILITY") {
            await slowPrint("SENDING SIGNAL... DOORS OPENED.");
            // We will add Firebase connection here later!
        } else if (cmd === "2" || cmd === "/VIEW_LIVE_RADAR") {
            await slowPrint("LAUNCHING EXTERNAL RADAR WINDOW...");
            window.open("https://tex-research.github.io/map", "_blank");
        } else {
            await slowPrint("UNKNOWN COMMAND. TRY '1' OR '2'.");
        }
        
        termInputLine.classList.remove('hidden');
        termInput.focus();
    }
});
