// js/app.js – Tab navigation and shared helpers for CalmCheck+

// Helper: show a given panel and hide others
function showPanel(panelId) {
  const panels = document.querySelectorAll('section[role="tabpanel"]');
  panels.forEach(p => {
    if (p.id === panelId) {
      p.hidden = false;
    } else {
      p.hidden = true;
    }
  });
}

// Helper: update tab button ARIA attributes and tabindex
function activateTab(tabButton) {
  const tabButtons = document.querySelectorAll('.tab-list button');
  tabButtons.forEach(btn => {
    const selected = btn === tabButton;
    btn.setAttribute('aria-selected', selected);
    btn.setAttribute('tabindex', selected ? '0' : '-1');
  });
  // Show associated panel
  const panelId = tabButton.getAttribute('aria-controls');
  showPanel(panelId);
  tabButton.focus();
}

// Click handling for tabs
document.querySelectorAll('.tab-list button').forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn));
});

// Keyboard navigation for tabs (Left/Right arrows)
const tabList = document.querySelector('.tab-list');
if (tabList) {
  tabList.addEventListener('keydown', e => {
    const key = e.key;
    if (key !== 'ArrowRight' && key !== 'ArrowLeft') return;
    const tabs = Array.from(tabList.querySelectorAll('button'));
    const currentIdx = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    let newIdx = currentIdx;
    if (key === 'ArrowRight') newIdx = (currentIdx + 1) % tabs.length;
    if (key === 'ArrowLeft') newIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    activateTab(tabs[newIdx]);
    e.preventDefault();
  });
}

// Card click handling on Home tab – navigates to the appropriate tab
document.querySelectorAll('.cards .card').forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    const target = card.dataset.target; // "breathing" or "grounding"
    const tabButton = document.getElementById(`tab-${target}`);
    if (tabButton) activateTab(tabButton);
  });
});

/*
  Future extension point:
  To add an "Anxiety Check" tab, insert a new <li> with a button
  (id="tab-anxiety", aria-controls="panel-anxiety") into the .tab-list,
  add a matching <section id="panel-anxiety" ...> in the main area, and
  include any JS module (e.g., js/anxiety.js) that renders its content.
*/
