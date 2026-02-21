<template>
  <section id="hero" class="hero-section">
    <canvas ref="canvasRef" class="hero-canvas" />

    <v-container class="hero-container">
      <v-row align="center" class="hero-row">

        <v-col cols="12" md="6" class="hero-text-col">
          <div class="hero-content">

            <p class="greeting animate-slide-up">
              <span class="wave">👋</span> Hello, I'm
            </p>

            <h1
              class="hero-name glitch animate-slide-up delay-1"
              data-text="Moataz Maher"
            >
              Moataz Maher
            </h1>

            <div class="typewriter-row animate-slide-up delay-2">
              <span class="typewriter-text">{{ typeText }}</span>
              <span class="type-cursor">|</span>
            </div>

            <p class="hero-desc animate-slide-up delay-3">
              Building scalable systems end-to-end — from
              <span class="hl">Angular</span> &amp; <span class="hl">Nuxt.js</span> frontends
              to <span class="hl">Java Spring Boot</span> backends and
              <span class="hl">Cloud Deployment</span>.
            </p>

            <div class="stats-bar animate-slide-up delay-4">
              <div class="stat-item">
                <span class="stat-num">3+</span>
                <span class="stat-lbl">Years Experience</span>
              </div>
              <div class="stat-sep" />
              <div class="stat-item">
                <span class="stat-num">5+</span>
                <span class="stat-lbl">Products Shipped</span>
              </div>
              <div class="stat-sep" />
              <div class="stat-item">
                <span class="stat-num">10+</span>
                <span class="stat-lbl">Integrations Built</span>
              </div>
            </div>

            <div class="cta-row animate-slide-up delay-5">
              <a href="#contact" class="btn-primary">
                <v-icon start size="18">mdi-email-outline</v-icon>
                Get In Touch
              </a>
              <a href="#projects" class="btn-outline">
                <v-icon start size="18">mdi-briefcase-outline</v-icon>
                View Projects
              </a>
            </div>

            <div class="social-row animate-slide-up delay-6">
              <a
                href="https://github.com/MoatazMaher1998"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                aria-label="GitHub"
              >
                <v-icon size="20">mdi-github</v-icon>
              </a>
              <a
                href="https://www.linkedin.com/in/moataz-maher-58a2b8146/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                aria-label="LinkedIn"
              >
                <v-icon size="20">mdi-linkedin</v-icon>
              </a>
              <a
                href="mailto:moatazmaher1998@gmail.com"
                class="social-btn"
                aria-label="Email"
              >
                <v-icon size="20">mdi-email-outline</v-icon>
              </a>
            </div>

          </div>
        </v-col>

        <v-col cols="12" md="6" class="eyes-col animate-fade-in delay-3">
          <HeroPipeline />
        </v-col>

      </v-row>
    </v-container>

    <div class="scroll-hint animate-fade-in delay-7">
      <div class="scroll-mouse">
        <div class="scroll-wheel" />
      </div>
      <span>scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTypewriter } from '~/composables/useTypewriter'

const canvasRef = ref<HTMLCanvasElement>()

const { displayed: typeText } = useTypewriter([
  'Full Stack Engineer',
  'Java Spring Boot Expert',
  'Angular · Nuxt.js · Vue.js Dev'
])

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = 0, H = 0

  function resize() {
    const parent = canvas!.parentElement!
    W = parent.offsetWidth
    H = parent.offsetHeight
    canvas!.style.width = W + 'px'
    canvas!.style.height = H + 'px'
    canvas!.width = W * dpr
    canvas!.height = H * dpr
    ctx!.scale(dpr, dpr)
  }
  resize()

  const resizeObs = new ResizeObserver(resize)
  resizeObs.observe(canvas.parentElement!)

  const count = Math.min(55, Math.floor((W * H) / 14000))

  interface Dot {
    x: number; y: number
    vx: number; vy: number
    r: number
  }

  const dots: Dot[] = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.4 + 0.5,
  }))

  let mx = -999, my = -999

  window.addEventListener('mousemove', (e) => {
    const rect = canvas!.getBoundingClientRect()
    mx = e.clientX - rect.left
    my = e.clientY - rect.top
  })

  let raf: number

  function draw() {
    ctx!.clearRect(0, 0, W, H)

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i]
      d.x += d.vx
      d.y += d.vy
      if (d.x < 0) d.x = W
      if (d.x > W) d.x = 0
      if (d.y < 0) d.y = H
      if (d.y > H) d.y = 0

      ctx!.beginPath()
      ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2)
      ctx!.fillStyle = 'rgba(129,140,248,0.55)'
      ctx!.fill()

      const mdx = d.x - mx, mdy = d.y - my
      const mdist = Math.hypot(mdx, mdy)
      if (mdist < 140) {
        ctx!.beginPath()
        ctx!.moveTo(d.x, d.y)
        ctx!.lineTo(mx, my)
        ctx!.strokeStyle = `rgba(168,85,247,${0.18 * (1 - mdist / 140)})`
        ctx!.lineWidth = 0.7
        ctx!.stroke()
      }

      for (let j = i + 1; j < dots.length; j++) {
        const e = dots[j]
        const dx = d.x - e.x, dy = d.y - e.y
        const dist = Math.hypot(dx, dy)
        if (dist < 90) {
          ctx!.beginPath()
          ctx!.moveTo(d.x, d.y)
          ctx!.lineTo(e.x, e.y)
          ctx!.strokeStyle = `rgba(99,102,241,${0.1 * (1 - dist / 90)})`
          ctx!.lineWidth = 0.4
          ctx!.stroke()
        }
      }
    }

    raf = requestAnimationFrame(draw)
  }
  draw()

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    resizeObs.disconnect()
  })
})
</script>

<style scoped lang="scss">
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 80px 0 60px;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-container {
  position: relative;
  z-index: 1;
}

.hero-row {
  min-height: calc(100vh - 160px);
}

.hero-text-col {
  padding: 24px 16px;
}

.hero-content {
  max-width: 560px;
}

.greeting {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 10px;
  font-family: 'JetBrains Mono', monospace;

  .wave {
    display: inline-block;
    animation: wave 2.5s ease-in-out infinite;
    transform-origin: 70% 70%;
  }
}

.hero-name {
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.08;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #e5e5e5 0%, #818cf8 45%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.glitch {
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: inherit;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
  }
  &::before {
    animation: glitch-a 7s infinite linear;
  }
  &::after {
    animation: glitch-b 7s infinite linear;
    animation-delay: 0.1s;
  }
}

.typewriter-row {
  display: flex;
  align-items: center;
  gap: 1px;
  height: 2rem;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-family: 'JetBrains Mono', monospace;
}

.typewriter-text {
  color: #818cf8;
  font-weight: 500;
}

.type-cursor {
  color: #a855f7;
  font-weight: 300;
  animation: blink-cur 1s step-end infinite;
  margin-left: 1px;
}

.hero-desc {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.75;
  margin-bottom: 28px;

  .hl {
    color: #a5b4fc;
    font-weight: 500;
  }
}

.stats-bar {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 28px;
  padding: 14px 20px;
  background: rgba(12, 12, 28, 0.65);
  border: 1px solid rgba(99, 102, 241, 0.22);
  border-radius: 14px;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 2px;
}

.stat-num {
  font-size: 1.55rem;
  font-weight: 700;
  background: linear-gradient(135deg, #818cf8, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-lbl {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  text-align: center;
}

.stat-sep {
  width: 1px;
  height: 38px;
  background: rgba(99, 102, 241, 0.2);
  flex-shrink: 0;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  box-shadow: 0 4px 22px rgba(99, 102, 241, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.55);
    color: #fff;
  }
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  background: rgba(12, 12, 28, 0.6);
  color: rgba(229, 229, 229, 0.85);
  border: 1px solid rgba(99, 102, 241, 0.38);
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(168, 85, 247, 0.7);
    background: rgba(99, 102, 241, 0.1);
    color: rgba(229, 229, 229, 0.95);
  }
}

.social-row {
  display: flex;
  gap: 8px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(99, 102, 241, 0.28);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s, transform 0.2s, background 0.2s;

  &:hover {
    border-color: #818cf8;
    color: #818cf8;
    transform: translateY(-2px);
    background: rgba(99, 102, 241, 0.1);
  }
}

.eyes-col {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  padding: 24px 16px;
}

.scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.72rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  animation: float 2.8s ease-in-out infinite;
  z-index: 2;
}

.scroll-mouse {
  width: 22px;
  height: 34px;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 3px;
  height: 7px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  animation: scroll-w 1.9s ease-in-out infinite;
}

@keyframes wave {
  0%, 60%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
}

@keyframes blink-cur {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes scroll-w {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}

@keyframes glitch-a {
  0%, 87%, 100% { opacity: 0; }
  88% {
    opacity: 0.75;
    clip-path: polygon(0 18%, 100% 18%, 100% 36%, 0 36%);
    transform: translate(-3px, 0);
  }
  89% {
    opacity: 0.75;
    clip-path: polygon(0 52%, 100% 52%, 100% 68%, 0 68%);
    transform: translate(3px, 0);
  }
  90% { opacity: 0; }
}

@keyframes glitch-b {
  0%, 87%, 100% { opacity: 0; }
  88% {
    opacity: 0.65;
    clip-path: polygon(0 60%, 100% 60%, 100% 78%, 0 78%);
    transform: translate(3px, 0);
  }
  89% {
    opacity: 0.65;
    clip-path: polygon(0 10%, 100% 10%, 100% 28%, 0 28%);
    transform: translate(-3px, 0);
  }
  90% { opacity: 0; }
}

@media (max-width: 960px) {
  .hero-section {
    padding: 100px 0 70px;
  }

  .hero-row {
    flex-direction: column-reverse;
  }

  .eyes-col {
    min-height: 220px;
    padding: 16px;
  }

  .hero-content {
    max-width: 100%;
  }

  .stats-bar {
    padding: 12px 14px;
  }

  .cta-row {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .cta-row {
    flex-direction: column;
  }

  .btn-primary,
  .btn-outline {
    justify-content: center;
  }
}
</style>
