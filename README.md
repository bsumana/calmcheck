# CalmCheck+

A simple, calming mental‑wellness web app for students.

## 🎯 Goal
Provide a lightweight, offline‑first tool that helps students practice quick relaxation techniques. The app works by opening `index.html` in a browser (no server or backend required) and is built with **plain HTML, CSS, and vanilla JavaScript**.

## ✨ Features (v1)
- **Accessible tab navigation** – Home, Breathing, Grounding (keyboard‑friendly, ARIA compliant).
- **Home tab** – Welcome message, brief description, and cards that link to the other tabs.
- **Breathing tab** – Animated circle guiding two patterns:
  - Box breathing (4‑4‑4‑4)
  - 4‑7‑8 breathing
  Includes a Start/Stop button, on‑screen cue text, and a session timer.
- **Grounding tab** – 5‑4‑3‑2‑1 technique shown step‑by‑step with Next/Back buttons and a progress indicator.
- **Footer** – Disclaimer *“Screening and wellness aid, not medical advice.”* and a **Help** link that opens a modal containing emergency phone numbers (Tele‑MANAS 14416 and 112).
- **Responsive, mobile‑first layout** – works on phone‑size screens with high‑contrast colors and visible focus outlines.
- **Reduced‑motion support** – respects the OS `prefers-reduced-motion` setting, disabling the breathing animation for users who prefer it.
- **Future‑proof** – a clearly commented placeholder is left for an "Anxiety Check" tab.

## 🛠️ Tech Stack
- **HTML5** – semantic markup with `nav`, `section`, `button`, etc.
- **CSS3** – custom properties, Flexbox, media queries, dark‑mode friendly.
- **JavaScript (ES6)** – modular files:
  - `js/app.js` – core tab navigation and shared helpers.
  - `js/breathing.js` – breathing UI and timing logic.
  - `js/grounding.js` – grounding steps.
- No build step, no framework, no backend.

## 📂 Project Structure
```
calmcheck/
│
├─ index.html               # entry point, tab containers, footer
├─ css/
│   └─ style.css           # global styles + UI for breathing & grounding
├─ js/
│   ├─ app.js              # tab navigation, shared helpers
│   ├─ breathing.js        # breathing exercise logic
│   └─ grounding.js        # grounding technique logic
├─ pages/
│   └─ help.html           # help page (fallback if modal disabled)
└─ README.md                # (you are here!)
```

## 🚀 Getting Started
1. **Clone / copy the repo**
   ```powershell
   # If you have a remote repository
   git clone <your‑repo‑url>
   cd calmcheck
   ```
2. **Open the app**
   - **Fastest:** double‑click `index.html` in Explorer; the default browser will load the app.
   - **Recommended (avoids local‑file restrictions):** run a tiny static server:
     ```powershell
     cd C:\Users\bsuma\calmcheck
     python -m http.server 8000   # Python must be installed
     # then open http://localhost:8000 in your browser
     ```
3. **Explore**
   - Use the tab bar or the cards on the Home screen.
   - Try the breathing animation (Box or 4‑7‑8) and see the timer.
   - Walk through the grounding steps with Next/Back.
   - Click the **Need help now?** link – a modal with emergency numbers appears.

## 🖥️ Development / Testing
- **Live reload** – open the folder in VS Code and use the *Live Server* extension for instant reloads.
- **Accessibility checks** – focus outlines are visible; use Chrome DevTools → *Accessibility* panel to audit.
- **Reduced motion** – enable the OS setting "Reduce motion" and verify the breathing circle stops animating and the Start button becomes disabled.
- **Console** – ensure the developer console shows no errors.

## 📦 Adding the Future "Anxiety Check" Tab
1. **HTML** – In `index.html` add a new `<li>` with a button (e.g., `id="tab-anxiety"` and `aria-controls="panel-anxiety"`).
2. **Panel** – Add a matching `<section id="panel-anxiety" … hidden>` where the tab’s content will live.
3. **JS** – In `js/app.js` add an entry for the new tab in the navigation logic (commented placeholder already exists).
4. **Module** – Create `js/anxiety.js` (or similar) and load it from `index.html`.
All required steps are already marked with `TODO` comments.

## 📜 License
This project is released under the **MIT License** – feel free to copy, modify, and distribute it for any purpose.

---
*Built with love for students who need a calm moment. No medication, no login, no data collection.*