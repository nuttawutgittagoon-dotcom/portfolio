/* ===================================
   UI Sound Effects (Web Audio API)
   Generates subtle sci-fi sounds without external files
   =================================== */

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const SoundFX = {
    // Subtle Hover "Blip"
    hover: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Low volume
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    },

    // Click "Active" Sound
    click: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    },

    // Success "Chime" (for form submit)
    success: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const now = audioCtx.currentTime;

        // Arpeggio C E G C
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.location = 1; // Square-ish
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.05, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.4);
        });
    }
};

// Auto-attach sound events to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactives = document.querySelectorAll('a, button, .clickable, input, textarea');

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => SoundFX.hover());
        el.addEventListener('mousedown', () => SoundFX.click());
    });
});
