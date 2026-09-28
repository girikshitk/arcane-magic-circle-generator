/**
 * Arcane Magic Circle Studio Engine
 * Dynamic Incantation Engine scaling complexity with spell magnitude.
 */

// --- Data Constants & Definitions ---
const ELEMENTS = [
    { id: 'fire', name: 'Fire', color: '#ff4500', glow: '#ff7a33', school: 'Evocation', desc: 'Active Flame' },
    { id: 'water', name: 'Water', color: '#00bfff', glow: '#66d9ff', school: 'Elementalism', desc: 'Undulating Wave' },
    { id: 'earth', name: 'Earth', color: '#10b981', glow: '#34d399', school: 'Transmutation', desc: 'Crystalline Structure' },
    { id: 'air', name: 'Air', color: '#38bdf8', glow: '#7dd3fc', school: 'Evocation', desc: 'Spiraling Vortex' },
    { id: 'light', name: 'Light', color: '#fbbf24', glow: '#fcd34d', school: 'Abjuration', desc: 'Radiant Sunburst' },
    { id: 'shadow', name: 'Shadow', color: '#a855f7', glow: '#c084fc', school: 'Necromancy', desc: 'Eclipsed Void' },
    { id: 'arcane', name: 'Arcane', color: '#ec4899', glow: '#f472b6', school: 'Sorcery', desc: 'Geometric Paradox' }
];

const SCOPES = [
    { id: 'single', name: 'Single-Target', desc: 'Solid filled center point' },
    { id: 'zap', name: 'Zap Discharge', desc: 'Linear discharge line' },
    { id: 'aoe', name: 'Area of Effect', desc: 'Expanding concentric wave' },
    { id: 'field', name: 'Persistent Field', desc: 'Spiraling helix radius' }
];

const QUALIFIERS = [
    { id: 'close', name: 'Close-Range', desc: 'Closed spiked barrier' },
    { id: 'long', name: 'Long-Range', desc: 'Directional arrow vector' },
    { id: 'channeled', name: 'Channeled', desc: 'Oscillating sine wave' }
];

const MAGNITUDES = [
    { id: 'minimal', name: 'Minimal', lines: 2, scale: 0.7 },
    { id: 'moderate', name: 'Moderate', lines: 4, scale: 0.9 },
    { id: 'high', name: 'High', lines: 7, scale: 1.1 },
    { id: 'transcendent', name: 'Transcendent', lines: 12, scale: 1.4 }
];

const DURATIONS = [
    { id: 'instant', name: 'Instant', symbol: 'lightning', desc: 'Lightning Bolt' },
    { id: 'short', name: 'Short-Term', symbol: 'moon', desc: 'Crescent Moon' },
    { id: 'sustained', name: 'Sustained', symbol: 'spiral_infinity', desc: 'Spiral & Infinity' },
    { id: 'eternal', name: 'Eternal', symbol: 'triple_infinity', desc: 'Permanent Infinity' }
];

const RNG_VARIABLES = [
    { id: 'flux', name: 'Power Flux', type: 'penrose_triangle', desc: 'Fluctuating Magnitude' },
    { id: 'target', name: 'Chain Target', type: 'impossible_cube', desc: 'Chain Target Chance' },
    { id: 'status', name: 'Status Effect', type: 'hexagram_void', desc: 'Burn/Stun Infusion' }
];

const MANTLES = [
    { id: 'sealed', name: 'Sealed', behavior: 'solid_rune_border' },
    { id: 'transcendent', name: 'Transcendent', behavior: 'bleeding_energy' },
    { id: 'active', name: 'Active', behavior: 'multi_rotating_rings' }
];

const RUNIC_CHARS = ['ᚠ', 'ᚢ', 'ᚮ', 'ᚱ', 'ᚴ', 'ᚼ', 'ᚾ', 'ᛁ', 'ᛅ', 'ᛏ', 'ᛘ', 'ᛚ', 'ᛦ', '☉', '☽', '☿', '♀', '♂', '♃', '♄', '🜂', '🜄', '🜁', '🜃', '⚝', '✵', '✦', '✧'];

// Words categorized by complexity
const INCANTATION_SHORT = ['Ignis', 'Fulgar', 'Vortex', 'Sanctum', 'Aether', 'Umbra', 'Lux', 'Pyros', 'Zephyr', 'Kael', 'Crux', 'Aegis'];
const INCANTATION_MEDIUM = ['Veritas', 'Manifesto', 'Dominus', 'Arcana', 'Formis', 'Oblivion', 'Resonus', 'Sovereign', 'Imperium', 'Resonatum'];
const INCANTATION_GRAND = ['Khronos', 'Aethelgard', 'Evokatus', 'Annihilatum', 'Excommunicamus', 'Transcendia', 'Primordium', 'Astralium', 'Hierarchia', 'Omnipotens'];

// --- Web Audio Synthesizer ---
class ArcaneAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    playForgeSound() {
        if (this.isMuted) return;
        this.init();

        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(360, now + 0.6);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);

        const chime = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chime.type = 'triangle';
        chime.frequency.setValueAtTime(880, now + 0.15);
        chime.frequency.exponentialRampToValueAtTime(1760, now + 0.7);

        chimeGain.gain.setValueAtTime(0.01, now + 0.15);
        chimeGain.gain.linearRampToValueAtTime(0.15, now + 0.25);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        chime.connect(chimeGain);
        chimeGain.connect(this.ctx.destination);
        chime.start(now + 0.15);
        chime.stop(now + 1.4);
    }
}

// --- Particle Engine ---
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
    }

    init(count) {
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 220;
        return {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 - 0.2,
            radius: Math.random() * 2.5 + 0.8,
            alpha: Math.random() * 0.8 + 0.2,
            life: Math.random() * 100 + 50,
            maxLife: 150
        };
    }

    updateAndDraw(ctx, color) {
        ctx.save();
        this.particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.alpha = (p.life / p.maxLife) * 0.8;

            if (p.life <= 0) {
                this.particles[idx] = this.createParticle();
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.fill();
        });
        ctx.restore();
    }
}

// --- Main App Class ---
class ArcaneApp {
    constructor() {
        this.canvas = document.getElementById('magicCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.audio = new ArcaneAudioEngine();
        this.particles = new ParticleSystem();

        this.config = null;
        this.animationFrameId = null;
        this.timestamp = 0;

        this.initEvents();
        this.generateRandomCircle();
    }

    initEvents() {
        document.getElementById('forge-btn')?.addEventListener('click', () => {
            this.generateRandomCircle();
            this.audio.playForgeSound();
        });

        document.getElementById('audio-toggle')?.addEventListener('click', (e) => {
            const isMuted = this.audio.toggleMute();
            e.currentTarget.classList.toggle('active', !isMuted);
        });

        document.getElementById('save-grimoire-btn')?.addEventListener('click', () => {
            this.saveToGrimoire();
        });

        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetView = tab.dataset.tab;
                
                document.getElementById('view-studio').classList.toggle('hidden', targetView !== 'studio');
                document.getElementById('view-grimoire').classList.toggle('hidden', targetView !== 'grimoire');
                
                if (targetView === 'grimoire') {
                    this.renderGrimoireGrid();
                }
            });
        });

        const container = document.querySelector('.canvas-wrapper');
        if (container) {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                container.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
            });
            container.addEventListener('mouseleave', () => {
                container.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
            });
        }
    }

    generateRandomCircle() {
        const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const numEls = Math.random() > 0.55 ? 2 : 1;
        const shuffledEls = [...ELEMENTS].sort(() => 0.5 - Math.random());

        this.config = {
            elements: shuffledEls.slice(0, numEls),
            scope: sample(SCOPES),
            qualifier: sample(QUALIFIERS),
            magnitude: sample(MAGNITUDES),
            duration: sample(DURATIONS),
            rng: sample(RNG_VARIABLES),
            mantle: sample(MANTLES),
            rotationSpeed: 1.0,
            glowIntensity: 1.5,
            lineWidth: 2,
            seed: Math.random() * 10000
        };

        this.updateSpellUI();
        this.startLoop();
    }

    // Dynamic Incantation Generator scaling length & complexity with Magnitude
    generateIncantation(c) {
        const seed = c.seed;
        const getWord = (arr, offset) => arr[Math.floor((seed * offset) % arr.length)];
        const elName = c.elements[0].name;

        if (c.magnitude.id === 'minimal') {
            // Shorter spells -> Single word incantations!
            const word = getWord(INCANTATION_SHORT, 3);
            return `"${word}!"`;
        } else if (c.magnitude.id === 'moderate') {
            // Moderate power -> 2 to 3 words
            const w1 = getWord(INCANTATION_SHORT, 2);
            const w2 = getWord(INCANTATION_MEDIUM, 5);
            return `"${w1} ${elName} ${w2}"`;
        } else if (c.magnitude.id === 'high') {
            // High power -> 4 to 5 words
            const w1 = getWord(INCANTATION_SHORT, 2);
            const w2 = getWord(INCANTATION_MEDIUM, 4);
            const w3 = getWord(INCANTATION_MEDIUM, 7);
            const w4 = getWord(INCANTATION_GRAND, 9);
            return `"${w1} ${elName} ${w2} ${w3} ${w4}"`;
        } else {
            // Transcendent power -> 6 to 7 words complex imposing grand incantation!
            const w1 = getWord(INCANTATION_GRAND, 1);
            const w2 = getWord(INCANTATION_SHORT, 3);
            const w3 = getWord(INCANTATION_MEDIUM, 5);
            const w4 = getWord(INCANTATION_GRAND, 7);
            const w5 = getWord(INCANTATION_MEDIUM, 11);
            const w6 = getWord(INCANTATION_GRAND, 13);
            return `"${w1} ${w2} ${elName} ${w3} ${w4} ${w5} ${w6}!"`;
        }
    }

    updateSpellUI() {
        const c = this.config;
        const primaryEl = c.elements[0];
        const secondaryEl = c.elements[1];

        // Dynamic Incantation based on Power Magnitude
        const incantation = this.generateIncantation(c);

        const elTitle = primaryEl.name + (secondaryEl ? '-' + secondaryEl.name : '');
        const name = `${c.magnitude.name} ${elTitle} ${c.scope.name.split(' ')[0]}`;

        const nameEl = document.getElementById('spell-name');
        if (nameEl) {
            nameEl.textContent = name;
            nameEl.style.textShadow = `0 0 15px ${primaryEl.glow}90`;
            nameEl.style.color = '#ffffff';
        }

        const detailsEl = document.getElementById('spell-details');
        if (detailsEl) {
            let elsHtml = c.elements.map(e => `<span style="color:${e.glow}; font-weight:600;">${e.name}</span>`).join(" & ");
            detailsEl.innerHTML = `
                <div class="detail-row">
                    <span class="detail-label">Designation:</span>
                    <span class="detail-value" style="color:#fff; font-weight:700;">${name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Core Intent:</span>
                    <span class="detail-value">${c.qualifier.name} ${c.scope.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Essence:</span>
                    <span class="detail-value">${elsHtml}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Power Level:</span>
                    <span class="detail-value" style="color:${primaryEl.glow}; font-weight:700;">Lv.${c.magnitude.lines} ${c.magnitude.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span class="detail-value">${c.duration.name} (${c.duration.desc})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">RNG Paradox:</span>
                    <span class="detail-value">${c.rng.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Mantle Binding:</span>
                    <span class="detail-value">${c.mantle.name}</span>
                </div>
                <div class="detail-row" style="margin-top:0.4rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.08);">
                    <span class="detail-label">Incantation:</span>
                    <span class="detail-value" style="font-style:italic; color:${primaryEl.glow}; font-weight:600;">${incantation}</span>
                </div>
            `;
        }

        const canvasContainer = document.querySelector('.canvas-wrapper');
        if (canvasContainer) {
            canvasContainer.style.boxShadow = `0 0 60px rgba(0, 0, 0, 0.9) inset, 0 0 40px ${primaryEl.glow}30`;
        }
    }

    // --- Drawing Helper Utilities ---
    withGlow(color, blur, fn) {
        this.ctx.save();
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur * 1.5;
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        fn();
        this.ctx.restore();
    }

    drawPolygon(r, sides, rot = 0) {
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const a = rot + (i * 2 * Math.PI) / sides;
            const x = r * Math.cos(a);
            const y = r * Math.sin(a);
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawStar(cx, cy, spikes, outerRadius, innerRadius, rot = 0) {
        let angleStep = Math.PI / spikes;
        let currentAngle = rot - Math.PI / 2;

        this.ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = cx + Math.cos(currentAngle) * r;
            const y = cy + Math.sin(currentAngle) * r;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
            currentAngle += angleStep;
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // --- Canvas Formation Layers ---
    renderLayer1_Core(t) {
        const color = this.config.elements[0].glow;
        const r = 38 * this.config.magnitude.scale;

        this.withGlow(color, 18, () => {
            this.ctx.lineWidth = 2;

            if (this.config.qualifier.id === 'close') {
                this.drawPolygon(r, 8, t * 0.001);
                for (let i = 0; i < 8; i++) {
                    const angle = (i * Math.PI) / 4 + (t * 0.001);
                    const sx = Math.cos(angle) * r;
                    const sy = Math.sin(angle) * r;
                    const ex = Math.cos(angle) * (r - 10);
                    const ey = Math.sin(angle) * (r - 10);
                    this.ctx.beginPath(); this.ctx.moveTo(sx, sy); this.ctx.lineTo(ex, ey); this.ctx.stroke();
                }
            } else if (this.config.qualifier.id === 'long') {
                this.ctx.save();
                this.ctx.rotate(t * 0.002);
                this.ctx.beginPath();
                this.ctx.moveTo(-r * 1.3, 0); this.ctx.lineTo(r * 1.3, 0);
                this.ctx.moveTo(0, -r * 1.3); this.ctx.lineTo(0, r * 1.3);
                this.ctx.stroke();
                this.drawPolygon(r, 4, Math.PI / 4);
                this.ctx.restore();
            } else if (this.config.qualifier.id === 'channeled') {
                this.ctx.beginPath(); this.ctx.arc(0, 0, r, 0, Math.PI * 2); this.ctx.stroke();
                this.ctx.beginPath();
                for (let w = -r; w <= r; w += 4) {
                    const waveY = Math.sin(w * 0.2 + t * 0.006) * 8;
                    if (w === -r) this.ctx.moveTo(w, waveY);
                    else this.ctx.lineTo(w, waveY);
                }
                this.ctx.stroke();
            }

            if (this.config.scope.id === 'single') {
                this.ctx.beginPath(); this.ctx.arc(0, 0, 8, 0, Math.PI * 2); this.ctx.fill();
            } else if (this.config.scope.id === 'zap') {
                this.ctx.beginPath(); this.ctx.arc(0, 0, 6, 0, Math.PI * 2); this.ctx.fill();
                this.ctx.beginPath(); this.ctx.moveTo(-r * 1.1, 0); this.ctx.lineTo(r * 1.1, 0); this.ctx.stroke();
            } else if (this.config.scope.id === 'aoe') {
                this.ctx.beginPath(); this.ctx.arc(0, 0, 6, 0, Math.PI * 2); this.ctx.fill();
                for (let i = 1; i <= 3; i++) {
                    const waveR = (i * 10 + (t * 0.03)) % (r * 0.9);
                    this.ctx.beginPath(); this.ctx.arc(0, 0, Math.max(8, waveR), 0, Math.PI * 2);
                    this.ctx.globalAlpha = 1 - (waveR / (r * 0.9));
                    this.ctx.stroke();
                }
                this.ctx.globalAlpha = 1.0;
            } else if (this.config.scope.id === 'field') {
                this.ctx.beginPath();
                for (let i = 0; i < 80; i++) {
                    const angle = 0.12 * i - (t * 0.003);
                    const helixR = 0.35 * i;
                    const x = helixR * Math.cos(angle);
                    const y = helixR * Math.sin(angle);
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.stroke();
            }
        });
    }

    renderLayer2_Elements(t) {
        const rInner = 48 * this.config.magnitude.scale;
        const rOuter = 110 * this.config.magnitude.scale;
        const segs = this.config.elements.length;
        const angleStep = (Math.PI * 2) / segs;

        this.ctx.save();
        this.ctx.rotate(t * 0.0004);

        for (let i = 0; i < segs; i++) {
            const el = this.config.elements[i];
            const startAngle = i * angleStep;
            const endAngle = (i + 1) * angleStep;
            const midAngle = startAngle + (angleStep / 2);

            this.withGlow(el.glow, 20, () => {
                this.ctx.lineWidth = 2;
                this.ctx.beginPath(); this.ctx.arc(0, 0, rOuter, startAngle + 0.04, endAngle - 0.04); this.ctx.stroke();
                this.ctx.beginPath(); this.ctx.arc(0, 0, rInner, startAngle + 0.04, endAngle - 0.04); this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.moveTo(Math.cos(startAngle) * rInner, Math.sin(startAngle) * rInner);
                this.ctx.lineTo(Math.cos(startAngle) * rOuter, Math.sin(startAngle) * rOuter);
                this.ctx.stroke();

                this.ctx.save();
                this.ctx.rotate(midAngle);
                this.ctx.translate(rInner + (rOuter - rInner) / 2, 0);

                if (el.id === 'fire') {
                    this.drawStar(0, 0, 5, 18, 7, t * 0.002);
                } else if (el.id === 'water') {
                    this.ctx.beginPath();
                    for (let w = -16; w <= 16; w += 4) {
                        this.ctx.lineTo(w, Math.sin(w * 0.4 + t * 0.005) * 8);
                    }
                    this.ctx.stroke();
                } else if (el.id === 'earth') {
                    this.drawPolygon(0, 0, 16, 6, Math.PI / 2);
                    this.drawPolygon(0, 0, 8, 6, Math.PI / 2);
                } else if (el.id === 'air') {
                    this.ctx.beginPath();
                    this.ctx.arc(-8, 0, 8, 0, Math.PI, true);
                    this.ctx.arc(8, 0, 8, Math.PI, 0, true);
                    this.ctx.stroke();
                } else if (el.id === 'light') {
                    this.drawStar(0, 0, 8, 20, 5, -t * 0.001);
                } else if (el.id === 'shadow') {
                    this.ctx.beginPath(); this.ctx.arc(0, 0, 12, 0, Math.PI * 2); this.ctx.fill();
                    this.ctx.globalCompositeOperation = 'destination-out';
                    this.ctx.beginPath(); this.ctx.arc(5, 5, 10, 0, Math.PI * 2); this.ctx.fill();
                    this.ctx.globalCompositeOperation = 'source-over';
                } else if (el.id === 'arcane') {
                    this.drawPolygon(0, 0, 16, 3, t * 0.003);
                    this.drawPolygon(0, 0, 16, 3, -t * 0.003 + Math.PI);
                }

                this.ctx.restore();
            });
        }
        this.ctx.restore();
    }

    renderLayer3_Parameters(t) {
        const rInner = 120;
        const rOuter = 210;
        const color = this.config.elements[0].glow;
        const numLines = this.config.magnitude.lines * 2;
        const angleStep = (Math.PI * 2) / numLines;

        this.ctx.save();
        this.ctx.rotate(-t * 0.0003);

        this.withGlow(color, 16, () => {
            this.ctx.lineWidth = 1.5;
            this.ctx.setLineDash([6, 12]);
            for (let i = 0; i < numLines; i++) {
                const angle = i * angleStep;
                this.ctx.beginPath();
                this.ctx.moveTo(Math.cos(angle) * rInner, Math.sin(angle) * rInner);
                this.ctx.lineTo(Math.cos(angle) * rOuter, Math.sin(angle) * rOuter);
                this.ctx.stroke();
            }
            this.ctx.setLineDash([]);

            // Duration Icons
            this.ctx.save();
            this.ctx.rotate(t * 0.0008);
            for (let i = 0; i < this.config.magnitude.lines; i++) {
                this.ctx.save();
                this.ctx.rotate(i * ((Math.PI * 2) / this.config.magnitude.lines));
                this.ctx.translate(rOuter - 20, 0);

                if (this.config.duration.id === 'instant') {
                    this.ctx.beginPath();
                    this.ctx.moveTo(-4, -10); this.ctx.lineTo(4, -2);
                    this.ctx.lineTo(-2, 0); this.ctx.lineTo(4, 10);
                    this.ctx.stroke();
                } else if (this.config.duration.id === 'short') {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, 8, Math.PI / 4, Math.PI * 1.75);
                    this.ctx.stroke();
                } else if (this.config.duration.id === 'sustained') {
                    this.ctx.beginPath();
                    this.ctx.ellipse(-5, 0, 6, 3.5, 0, 0, Math.PI * 2);
                    this.ctx.ellipse(5, 0, 6, 3.5, 0, 0, Math.PI * 2);
                    this.ctx.stroke();
                } else if (this.config.duration.id === 'eternal') {
                    this.ctx.beginPath();
                    this.ctx.ellipse(-6, 0, 5, 3, 0, 0, Math.PI * 2);
                    this.ctx.ellipse(6, 0, 5, 3, 0, 0, Math.PI * 2);
                    this.ctx.stroke();
                }

                this.ctx.restore();
            }
            this.ctx.restore();

            // RNG Paradox Shapes
            for (let i = 0; i < 4; i++) {
                this.ctx.save();
                this.ctx.rotate((Math.PI / 2) * i + Math.PI / 4);
                this.ctx.translate(rInner + 45, 0);

                if (this.config.rng.id === 'flux') {
                    this.drawPolygon(0, 0, 18, 3, t * 0.002);
                    this.drawPolygon(0, 3, 12, 3, -t * 0.002);
                } else if (this.config.rng.id === 'target') {
                    this.ctx.beginPath(); this.ctx.arc(-7, 0, 11, 0, Math.PI * 2); this.ctx.stroke();
                    this.ctx.beginPath(); this.ctx.arc(7, 0, 11, 0, Math.PI * 2); this.ctx.stroke();
                } else if (this.config.rng.id === 'status') {
                    this.drawStar(0, 0, 6, 18, 9, t * 0.001);
                    this.ctx.beginPath(); this.ctx.arc(0, 0, 4, 0, Math.PI * 2); this.ctx.fill();
                }

                this.ctx.restore();
            }
        });

        this.ctx.restore();
    }

    renderLayer4_Mantle(t) {
        const rOuterBase = 240;
        const color1 = this.config.elements[0].glow;
        const color2 = this.config.elements[1] ? this.config.elements[1].glow : '#ffffff';

        this.ctx.save();
        this.withGlow(color1, 24, () => {
            
            this.ctx.save();
            this.ctx.rotate(t * 0.0002);
            this.ctx.font = '11px "Cinzel", serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            const charCount = 28;
            const step = (Math.PI * 2) / charCount;
            for (let i = 0; i < charCount; i++) {
                const angle = i * step;
                const rune = RUNIC_CHARS[(i + Math.floor(this.config.seed)) % RUNIC_CHARS.length];
                this.ctx.save();
                this.ctx.rotate(angle);
                this.ctx.translate(0, -rOuterBase + 12);
                this.ctx.fillText(rune, 0, 0);
                this.ctx.restore();
            }
            this.ctx.restore();

            if (this.config.mantle.id === 'sealed') {
                this.ctx.lineWidth = 3;
                this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase, 0, Math.PI * 2); this.ctx.stroke();
                this.ctx.lineWidth = 1.5;
                this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase + 12, 0, Math.PI * 2); this.ctx.stroke();
            } else if (this.config.mantle.id === 'transcendent') {
                this.ctx.lineWidth = 2;
                this.ctx.rotate(t * 0.0002);
                for (let i = 0; i < 12; i++) {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, rOuterBase, i * (Math.PI / 6), i * (Math.PI / 6) + Math.PI / 8);
                    this.ctx.stroke();
                }

                this.ctx.globalAlpha = 0.6 + Math.sin(t * 0.004) * 0.3;
                this.ctx.lineWidth = 10;
                this.withGlow(color2, 35, () => {
                    this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase + 22, 0, Math.PI * 2); this.ctx.stroke();
                });
                this.ctx.globalAlpha = 1.0;
            } else if (this.config.mantle.id === 'active') {
                this.ctx.lineWidth = 2;
                this.ctx.save();
                this.ctx.rotate(t * 0.002);
                this.ctx.setLineDash([25, 20]);
                this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase, 0, Math.PI * 2); this.ctx.stroke();
                this.ctx.restore();

                this.ctx.save();
                this.ctx.rotate(-t * 0.003);
                this.ctx.setLineDash([45, 25, 6, 25]);
                this.withGlow(color2, 12, () => {
                    this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase + 14, 0, Math.PI * 2); this.ctx.stroke();
                });
                this.ctx.restore();

                this.ctx.save();
                this.ctx.rotate(t * 0.004);
                this.ctx.setLineDash([120, 240]);
                this.ctx.lineWidth = 4;
                this.ctx.beginPath(); this.ctx.arc(0, 0, rOuterBase + 28, 0, Math.PI * 2); this.ctx.stroke();
                this.ctx.restore();
                this.ctx.setLineDash([]);
            }
        });

        this.ctx.restore();
    }

    renderFrame(timestamp) {
        this.timestamp = timestamp;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

        const primaryColor = this.config.elements[0].glow;
        this.particles.updateAndDraw(this.ctx, primaryColor);

        this.renderLayer4_Mantle(timestamp);
        this.renderLayer3_Parameters(timestamp);
        this.renderLayer2_Elements(timestamp);
        this.renderLayer1_Core(timestamp);

        this.ctx.restore();

        this.animationFrameId = requestAnimationFrame((t) => this.renderFrame(t));
    }

    startLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.particles.init(40);
        this.animationFrameId = requestAnimationFrame((t) => this.renderFrame(t));
    }

    // --- Grimoire Management (STRICT CAPACITY LIMIT: 3 SPELLS MAXIMUM) ---
    saveToGrimoire() {
        let grimoire = JSON.parse(localStorage.getItem('arcane_grimoire') || '[]');
        const spellName = document.getElementById('spell-name').textContent;

        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = 300;
        thumbCanvas.height = 300;
        const tCtx = thumbCanvas.getContext('2d');
        tCtx.drawImage(this.canvas, 0, 0, 300, 300);

        const item = {
            id: Date.now(),
            name: spellName,
            config: JSON.parse(JSON.stringify(this.config)),
            thumbnail: thumbCanvas.toDataURL('image/png'),
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        let message = `✨ Spell "${spellName}" inscribed into your Grimoire!`;

        if (grimoire.length >= 3) {
            const evicted = grimoire.pop();
            message += `\n⚠️ Grimoire limit (3 spells) reached. Oldest spell "${evicted.name}" was replaced.`;
        }

        grimoire.unshift(item);
        localStorage.setItem('arcane_grimoire', JSON.stringify(grimoire));

        alert(message);
        this.renderGrimoireGrid();
    }

    renderGrimoireGrid() {
        const container = document.getElementById('grimoire-cards-container');
        if (!container) return;

        const grimoire = JSON.parse(localStorage.getItem('arcane_grimoire') || '[]');
        
        const countBadge = document.getElementById('grimoire-count-badge');
        if (countBadge) {
            countBadge.textContent = `${grimoire.length} / 3 Spells`;
            countBadge.style.color = grimoire.length === 3 ? '#f59e0b' : '#94a3b8';
        }

        if (grimoire.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
                    <p class="font-cinzel" style="font-size: 1.2rem; margin-bottom: 0.5rem; color: #fff;">Your Grimoire is empty</p>
                    <p style="font-size: 0.85rem;">Inscribe generated circles into your Grimoire (Holds up to 3 spells max).</p>
                </div>
            `;
            return;
        }

        container.innerHTML = grimoire.map((item, idx) => `
            <div class="grimoire-card" data-id="${item.id}">
                <div class="grimoire-card-header">
                    <span style="font-size:0.7rem; text-transform:uppercase; color:var(--gold-accent); font-weight:700;">Slot ${idx + 1} of 3</span>
                    <span style="font-size:0.7rem; color:var(--text-dim);">${item.date}</span>
                </div>
                <div class="grimoire-thumb">
                    <img src="${item.thumbnail}" alt="${item.name}" />
                </div>
                <div>
                    <h3 class="font-cinzel" style="font-size: 1rem; color: #fff; line-height:1.2;">${item.name}</h3>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top:0.2rem;">${item.config.elements[0].name} • ${item.config.qualifier.name}</p>
                </div>
                <div class="grimoire-actions">
                    <button class="btn-secondary load-spell-btn" data-id="${item.id}" style="flex:1; padding: 0.55rem; font-size:0.8rem;">Load Circle</button>
                    <button class="btn-secondary delete-spell-btn" data-id="${item.id}" style="padding: 0.55rem; color: #f43f5e; font-weight:bold;">✕</button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.load-spell-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const item = grimoire.find(g => g.id === id);
                if (item) {
                    this.config = item.config;
                    this.updateSpellUI();
                    this.startLoop();
                    document.querySelector('.tab-btn[data-tab="studio"]').click();
                }
            });
        });

        container.querySelectorAll('.delete-spell-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const updated = grimoire.filter(g => g.id !== id);
                localStorage.setItem('arcane_grimoire', JSON.stringify(updated));
                this.renderGrimoireGrid();
            });
        });
    }
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    window.app = new ArcaneApp();
});
