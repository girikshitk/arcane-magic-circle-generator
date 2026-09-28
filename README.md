# 🌟 Arcane - Procedural Magic Circle Generator & Grimoire

An interactive, procedural HTML5 Canvas magic circle formation studio built with vanilla JavaScript, HTML5, custom CSS design system, and Web Audio API sound synthesis.

![Arcane Magic Circle Studio](index.html)

## ✨ Features

- **4-Layer Magic Circle Formation Engine**:
  - **Layer I (Core Intent Ring)**: Renders compound Scope Sigils (*Single-Target*, *Zap*, *AoE*, *Persistent Field*) with Range/Qualifier Overlays (*Close-Range*, *Long-Range*, *Channeled*).
  - **Layer II (Elemental Ring)**: Segmented elemental rings containing stylized sigils and glowing HSL accents for *Fire*, *Water*, *Earth*, *Air*, *Light*, *Shadow*, and *Arcane*.
  - **Layer III (Parameter & Duration Ring)**: Radiant magnitude lines, Duration icons (*Lightning Bolt*, *Crescent Moon*, *Infinity*), and non-Euclidean RNG Paradox sigils (*Penrose Triangle*, *Impossible Cube*, *Hexagram Void*).
  - **Layer IV (Connective Lacing & Mantle)**: Interlocking Elder Runic script web (`ᚠ ᚢ ᚮ ᚱ ᚴ ᚼ...`) and outer mantle bindings (*Sealed*, *Transcendent*, *Active* multi-rotating rings).
- **Dynamic Incantation Generator**: Incantation length and complexity scale directly with the spell's Power Magnitude (from single-word minimal spells to grand multi-word eldritch incantations).
- **3-Spell Capacity Grimoire**: Inscribe favorite magic circles into local storage (`localStorage`). Enforces a strict 3-spell limit with auto-eviction of oldest spells.
- **Web Audio API Synth**: Pure Web Audio API synthesized crystal chime & energy swell sound effects on forging circles.
- **One-Click Windows Launcher**: Double-click `run.bat` to instantly launch the studio in your default browser.

---

## 🚀 How to Run Locally

### Option 1: Direct Batch File (Windows)
Double-click `run.bat` in the root folder.

### Option 2: Web Browser
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Brave, Safari).

---

## 🛠 Project Structure

```
├── index.html                  # Main application interface
├── index.css                   # Dark fantasy glassmorphism stylesheet
├── app.js                      # Canvas renderer, particles, audio synth & grimoire engine
├── run.bat                     # Windows batch launcher script
├── magic_circle_generator.html # Redirect alias to index.html
└── README.md                   # Repository documentation
```

---

## 📜 License
MIT License. Open-source and free to customize.
