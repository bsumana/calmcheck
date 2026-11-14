// js/grounding.js – Grounding (5‑4‑3‑2‑1) technique UI and logic
// Expects a <div id="grounding-container"> in the DOM.

(function () {
  const container = document.getElementById('grounding-container');
  if (!container) return;

  const steps = [
    { count: 5, sense: 'see', prompt: 'Name five things you can see.' },
    { count: 4, sense: 'feel', prompt: 'Name four things you can feel.' },
    { count: 3, sense: 'hear', prompt: 'Name three things you can hear.' },
    { count: 2, sense: 'smell', prompt: 'Name two things you can smell.' },
    { count: 1, sense: 'taste', prompt: 'Name one thing you can taste.' },
  ];

  let currentIdx = 0;

  // Build UI
  const wrapper = document.createElement('div');
  wrapper.className = 'grounding-container';

  const promptDiv = document.createElement('div');
  promptDiv.id = 'grounding-prompt';
  promptDiv.style.fontSize = '1.2rem';
  promptDiv.style.marginBottom = '1rem';

  const progressDiv = document.createElement('div');
  progressDiv.id = 'grounding-progress';
  progressDiv.style.marginBottom = '0.5rem';

  const buttonBar = document.createElement('div');
  buttonBar.style.display = 'flex';
  buttonBar.style.gap = '0.5rem';
  buttonBar.style.justifyContent = 'center';

  const backBtn = document.createElement('button');
  backBtn.id = 'grounding-back';
  backBtn.textContent = 'Back';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'grounding-next';
  nextBtn.textContent = 'Next';

  buttonBar.appendChild(backBtn);
  buttonBar.appendChild(nextBtn);

  wrapper.appendChild(progressDiv);
  wrapper.appendChild(promptDiv);
  wrapper.appendChild(buttonBar);
  container.appendChild(wrapper);

  function render() {
    const step = steps[currentIdx];
    promptDiv.textContent = step.prompt;
    progressDiv.textContent = `Step ${currentIdx + 1} of ${steps.length} (${step.count} ${step.sense})`;
    backBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === steps.length - 1;
    // Ensure focus is on the prompt for screen‑readers
    promptDiv.tabIndex = -1;
    promptDiv.focus();
  }

  backBtn.addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      render();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIdx < steps.length - 1) {
      currentIdx++;
      render();
    }
  });

  // Keyboard support: Left/Right arrows navigate steps when focus is on buttons
  [backBtn, nextBtn].forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        nextBtn.click();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        backBtn.click();
        e.preventDefault();
      }
    });
  });

  // Initial render
  render();
})();
