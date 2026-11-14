// js/breathing.js – Breathing exercise UI and logic
// This script assumes the presence of a <div id="breathing-container"> in the DOM.

(function () {
  // Create UI elements
  const container = document.getElementById('breathing-container');
  if (!container) return;

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'breathing-container';

  // Mode selector
  const modeLabel = document.createElement('label');
  modeLabel.textContent = 'Mode:';
  modeLabel.htmlFor = 'breathing-mode';

  const modeSelect = document.createElement('select');
  modeSelect.id = 'breathing-mode';
  const options = [
    { value: 'box', text: 'Box breathing (4‑4‑4‑4)' },
    { value: '4478', text: '4‑7‑8 breathing' },
  ];
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o.value;
    opt.textContent = o.text;
    modeSelect.appendChild(opt);
  });

  // Text cue
  const cue = document.createElement('div');
  cue.id = 'breathing-cue';
  cue.style.fontSize = '1.2rem';
  cue.style.marginTop = '0.5rem';
  cue.textContent = '';

  // Circle
  const circle = document.createElement('div');
  circle.className = 'breathing-circle';

  // Controls (Start/Stop)
  const startBtn = document.createElement('button');
  startBtn.id = 'breathing-start';
  startBtn.textContent = 'Start';

  // Timer display
  const timer = document.createElement('div');
  timer.id = 'breathing-timer';
  timer.style.marginTop = '0.5rem';
  timer.textContent = '00:00';

  // Assemble
  wrapper.appendChild(modeLabel);
  wrapper.appendChild(modeSelect);
  wrapper.appendChild(startBtn);
  wrapper.appendChild(timer);
  wrapper.appendChild(circle);
  wrapper.appendChild(cue);
  container.appendChild(wrapper);

  // State variables
  let intervalId = null;
  let startTime = null;
  let stepIndex = 0; // 0 = inhale, 1 = hold, 2 = exhale, 3 = hold (for box) or last hold for 4‑7‑8

  // Timing definitions (in seconds)
  const patterns = {
    box: [4, 4, 4, 4], // inhale, hold, exhale, hold
    '4478': [4, 7, 8, 0], // inhale, hold, exhale, (no final hold)
  };

  // Helper to update cue text based on pattern & step
  function updateCue(pattern, idx) {
    const phases = ['Breathe in', 'Hold', 'Breathe out', 'Hold'];
    const text = phases[idx] || '';
    cue.textContent = text;
  }

  // Helper to set animation duration based on current pattern
  function setAnimationDuration(pattern) {
    // Total cycle duration is sum of durations used for animation (inhale+exhale)
    const inhale = pattern[0];
    const exhale = pattern[2];
    const total = inhale + exhale;
    // CSS variable holds the full cycle length; we will map the animation to match inhale+exhale
    circle.style.setProperty('--breath-duration', `${total}s`);
  }

  function start() {
    const mode = modeSelect.value;
    const pattern = patterns[mode];
    if (!pattern) return;
    // Reset state
    stepIndex = 0;
    startTime = Date.now();
    updateCue(pattern, stepIndex);
    setAnimationDuration(pattern);
    circle.classList.add('animate');
    startBtn.textContent = 'Stop';

    // Timer update every second
    intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      timer.textContent = `${mins}:${secs}`;

      // Determine where we are in the cycle
      const totalCycle = pattern.reduce((a, b) => a + b, 0);
      const secsIntoCycle = (elapsed % totalCycle);
      let accum = 0;
      for (let i = 0; i < pattern.length; i++) {
        accum += pattern[i];
        if (secsIntoCycle < accum) {
          if (i !== stepIndex) {
            stepIndex = i;
            updateCue(pattern, stepIndex);
          }
          break;
        }
      }
    }, 500);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
    circle.classList.remove('animate');
    startBtn.textContent = 'Start';
    cue.textContent = '';
    timer.textContent = '00:00';
  }

  startBtn.addEventListener('click', () => {
    if (intervalId) {
      stop();
    } else {
      start();
    }
  });

  // React to reduced‑motion preference – the CSS already disables animation, but we also stop the interval if user prefers reduced motion.
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    // If user prefers reduced motion, keep UI static and just show timer/cue without animation.
    startBtn.disabled = true;
    startBtn.title = 'Disabled due to reduced‑motion preference';
  }
})();
