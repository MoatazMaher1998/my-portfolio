<template>
  <div class="eyes-wrap" ref="wrapRef">
    <div class="bg-orb orb-a" />
    <div class="bg-orb orb-b" />

    <svg
      ref="svgRef"
      class="eyes-svg"
      viewBox="0 0 320 160"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="iris-l" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stop-color="#a5b4fc" />
          <stop offset="45%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3730a3" />
        </radialGradient>
        <radialGradient id="iris-r" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stop-color="#e9d5ff" />
          <stop offset="45%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#6b21a8" />
        </radialGradient>
        <filter id="glow-l" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-r" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="clip-l"><circle cx="80" cy="80" r="52" /></clipPath>
        <clipPath id="clip-r"><circle cx="240" cy="80" r="52" /></clipPath>
      </defs>

      <!-- LEFT EYE -->
      <g
        class="eye-g"
        :style="{
          transformOrigin: '80px 80px',
          transform: blinking ? 'scaleY(0.05)' : 'scaleY(1)',
        }"
      >
        <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(99,102,241,0.08)" stroke-width="1" />
        <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(99,102,241,0.18)" stroke-width="1.5" />
        <circle cx="80" cy="80" r="56" fill="none" stroke="rgba(99,102,241,0.28)" stroke-width="1" />
        <!-- sclera -->
        <circle cx="80" cy="80" r="52" fill="#08081a" />
        <!-- iris -->
        <circle
          :cx="80 + lx" :cy="80 + ly" r="31"
          fill="url(#iris-l)" filter="url(#glow-l)"
          clip-path="url(#clip-l)"
        />
        <!-- pupil -->
        <circle :cx="80 + lx" :cy="80 + ly" r="15" fill="#030308" clip-path="url(#clip-l)" />
        <!-- shine large -->
        <circle :cx="80 + lx + 8" :cy="80 + ly - 9" r="5.5" fill="rgba(255,255,255,0.92)" clip-path="url(#clip-l)" />
        <!-- shine small -->
        <circle :cx="80 + lx - 5" :cy="80 + ly + 8" r="2.5" fill="rgba(255,255,255,0.45)" clip-path="url(#clip-l)" />
        <!-- rim -->
        <circle cx="80" cy="80" r="52" fill="none" stroke="rgba(99,102,241,0.55)" stroke-width="2" />
      </g>

      <!-- RIGHT EYE -->
      <g
        class="eye-g"
        :style="{
          transformOrigin: '240px 80px',
          transform: blinking ? 'scaleY(0.05)' : 'scaleY(1)',
        }"
      >
        <circle cx="240" cy="80" r="68" fill="none" stroke="rgba(168,85,247,0.08)" stroke-width="1" />
        <circle cx="240" cy="80" r="62" fill="none" stroke="rgba(168,85,247,0.18)" stroke-width="1.5" />
        <circle cx="240" cy="80" r="56" fill="none" stroke="rgba(168,85,247,0.28)" stroke-width="1" />
        <circle cx="240" cy="80" r="52" fill="#08081a" />
        <circle
          :cx="240 + rx" :cy="80 + ry" r="31"
          fill="url(#iris-r)" filter="url(#glow-r)"
          clip-path="url(#clip-r)"
        />
        <circle :cx="240 + rx" :cy="80 + ry" r="15" fill="#030308" clip-path="url(#clip-r)" />
        <circle :cx="240 + rx + 8" :cy="80 + ry - 9" r="5.5" fill="rgba(255,255,255,0.92)" clip-path="url(#clip-r)" />
        <circle :cx="240 + rx - 5" :cy="80 + ry + 8" r="2.5" fill="rgba(255,255,255,0.45)" clip-path="url(#clip-r)" />
        <circle cx="240" cy="80" r="52" fill="none" stroke="rgba(168,85,247,0.55)" stroke-width="2" />
      </g>
    </svg>

    <!-- Floating code tags -->
    <div class="float-tag tag-1">
      <span class="kw">const</span> passion = <span class="num">Infinity</span>
    </div>
    <div class="float-tag tag-2">
      git push <span class="str">--force-with-lease</span>
    </div>
    <div class="float-tag tag-3">
      <span class="kw">while</span>(alive) build()
    </div>
  </div>
</template>

<script setup lang="ts">
const wrapRef = ref<HTMLElement>()
const svgRef = ref<SVGSVGElement>()

const lx = ref(0), ly = ref(0)
const rx = ref(0), ry = ref(0)
const blinking = ref(false)

const MAX_MOVE = 16

function calcPupil(ecx: number, ecy: number, mx: number, my: number, rect: DOMRect) {
  const sw = rect.width, sh = rect.height
  const ex = rect.left + (ecx / 320) * sw
  const ey = rect.top + (ecy / 160) * sh
  const dx = mx - ex, dy = my - ey
  const dist = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)
  const factor = Math.min(dist / 280, 1)
  return {
    x: Math.cos(angle) * MAX_MOVE * factor,
    y: Math.sin(angle) * MAX_MOVE * factor,
  }
}

function onMove(e: MouseEvent) {
  if (!svgRef.value) return
  const rect = svgRef.value.getBoundingClientRect()
  const l = calcPupil(80, 80, e.clientX, e.clientY, rect)
  const r = calcPupil(240, 80, e.clientX, e.clientY, rect)
  lx.value = l.x; ly.value = l.y
  rx.value = r.x; ry.value = r.y
}

let blinkTimer: ReturnType<typeof setTimeout>
function scheduleBlink() {
  blinkTimer = setTimeout(() => {
    blinking.value = true
    setTimeout(() => {
      blinking.value = false
      scheduleBlink()
    }, 130)
  }, 2600 + Math.random() * 4500)
}

onMounted(() => {
  scheduleBlink()
  window.addEventListener('mousemove', onMove)
})

onUnmounted(() => {
  clearTimeout(blinkTimer)
  window.removeEventListener('mousemove', onMove)
})
</script>

<style scoped lang="scss">
.eyes-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 280px;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(75px);
  pointer-events: none;
  animation: float 7s ease-in-out infinite;
}

.orb-a {
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%);
  top: 5%;
  left: 10%;
}

.orb-b {
  width: 210px;
  height: 210px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.35), transparent 70%);
  bottom: 5%;
  right: 8%;
  animation-delay: -3.5s;
}

.eyes-svg {
  width: 88%;
  max-width: 440px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.25));
}

.eye-g {
  transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.float-tag {
  position: absolute;
  background: rgba(8, 8, 26, 0.88);
  border: 1px solid rgba(99, 102, 241, 0.35);
  border-radius: 8px;
  padding: 5px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(229, 229, 229, 0.6);
  backdrop-filter: blur(12px);
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
}

.tag-1 {
  top: 2%;
  left: 0;
  animation: float 5s ease-in-out infinite;
}
.tag-2 {
  bottom: 6%;
  right: 0;
  animation: float 6s ease-in-out infinite;
  animation-delay: -2s;
}
.tag-3 {
  top: 18%;
  right: -4%;
  animation: float 4.5s ease-in-out infinite;
  animation-delay: -1s;
}

.kw { color: #818cf8; }
.str { color: #86efac; }
.num { color: #fb923c; }

@media (max-width: 768px) {
  .float-tag { display: none; }
  .eyes-wrap { min-height: 200px; }
}
</style>
