const output = document.getElementById('output');
const input = document.getElementById('user-input');
let loginStep = 0;

async function slowPrint(text, delay = 20) {
    for (let char of text) {
        output.innerHTML += char;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, delay));
    }
    output.innerHTML += "\n";
}

async function boot() {
    await slowPrint("[    0.000000] TEX_KERNEL_LOADER_v4.0.2", 5);
    await slowPrint("[    0.412123] MOUNTING REMOTE_STORAGE... OK", 5);
    await slowPrint("[    0.923111] ESTABLISHING UPLINK... OK", 5);
    await slowPrint("\n--- AUTHORIZED PERSONNEL ONLY ---", 10);
    await slowPrint("ENTER TEX_ID:", 30);
}

input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        await slowPrint(`> ${val}`, 0);

        if (loginStep === 0) {
            if (val === "TEX-9902" || val === "TEX_OVERRIDE_000") {
                await slowPrint("PASSWORD REQUIRED:");
                loginStep = 1;
            } else {
                await slowPrint("INVALID ID.");
            }
        } else if (loginStep === 1) {
            if (val === "RUIN_FOUNDATION") {
                await slowPrint("ACCESS GRANTED. REDIRECTING TO MAINFRAME...");
                // Here is where we switch to the Map/Radar View
                setTimeout(() => { document.body.innerHTML = "<h1>LIVE MAP LOADING...</h1>"; }, 2000);
            } else {
                await slowPrint("WRONG PASSWORD.");
            }
        }
    }
});

boot();
