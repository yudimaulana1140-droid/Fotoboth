// --- Web Audio API Synth Sound & Background Audio Generator ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let isPlaying = false;
let bgOscillatorGroup = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Cute sound chime effect when clicking buttons
function playCuteChime() {
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + index * 0.08);
        osc.stop(audioCtx.currentTime + index * 0.08 + 0.35);
    });
}

// Procedural Soft Melody Generator for Background Music
let musicInterval;
function toggleAudio() {
    initAudio();
    const icon = document.getElementById('music-icon');
    const text = document.getElementById('music-text');

    if (!isPlaying) {
        isPlaying = true;
        icon.className = "fa-solid fa-heart animate-spin text-rose-500";
        text.innerText = "Musik On 🎵";
        startSoftMelody();
    } else {
        isPlaying = false;
        icon.className = "fa-solid fa-music animate-bounce text-rose-500";
        text.innerText = "Putar Musik 🎵";
        clearInterval(musicInterval);
    }
}

function startSoftMelody() {
    const chordNotes = [
        [261.63, 329.63, 392.00], // C
        [220.00, 261.63, 329.63], // Am
        [174.61, 220.00, 261.63], // F
        [196.00, 246.94, 293.66]  // G
    ];
    let chordIdx = 0;

    function playChord() {
        if (!isPlaying) return;
        const notes = chordNotes[chordIdx];
        notes.forEach(freq => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 2.5);
        });
        chordIdx = (chordIdx + 1) % chordNotes.length;
    }

    playChord();
    musicInterval = setInterval(playChord, 2600);
}

function createParticle() {
    const container = document.getElementById('particle-container');
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const items = ['❤️', '💖', '🌸', '✨', '💕', '🌸', '🌺'];
    particle.innerText = items[Math.floor(Math.random() * items.length)];

    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 5 + 5 + 's';
    particle.style.fontSize = Math.random() * 18 + 14 + 'px';

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 10000);
}
setInterval(createParticle, 350);

function openSurat() {
    playCuteChime();

    const envelopeCard = document.getElementById('envelope-card');
    const secretContent = document.getElementById('secret-content');

    envelopeCard.style.opacity = '0';
    envelopeCard.style.transform = 'scale(0.9)';

    setTimeout(() => {
        envelopeCard.classList.add('hidden');
        secretContent.classList.remove('hidden');
        secretContent.classList.add('flex');
        
        secretContent.scrollIntoView({ behavior: 'smooth' });
    }, 400);
}

let moveCount = 0;
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.getElementById('btn-container');

    const maxX = window.innerWidth < 640 ? 110 : 180;
    const maxY = 90;

    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;

    noBtn.style.position = 'absolute';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    moveCount++;
    if (moveCount === 3) {
        noBtn.innerText = "Yakin enggak? 😜";
    } else if (moveCount === 6) {
        noBtn.innerText = "Gak bakal bisa di-klik 🤪";
    } else if (moveCount === 10) {
        noBtn.innerText = "Pilih yang hijau aja! 🥰";
    }
}

function sayYes() {
    playCuteChime();

    // Fire Confetti Cannon
    confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#ffd166', '#38ef7d']
    });

    setTimeout(() => {
        confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 300);

    // Display Modal
    const modal = document.getElementById('celebration-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    playCuteChime();
    const modal = document.getElementById('celebration-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
