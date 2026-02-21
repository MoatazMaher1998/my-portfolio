<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="c-dot" ref="dotRef" />
      <div class="c-ring" ref="ringRef" :class="{ hover: isHovering, click: isClicking }" />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
const dotRef = ref<HTMLElement>()
const ringRef = ref<HTMLElement>()
const isHovering = ref(false)
const isClicking = ref(false)

let raf: number
let mx = -200, my = -200
let rx = -200, ry = -200

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], .v-btn, .v-chip'

onMounted(() => {
  const style = document.createElement('style')
  style.id = 'cursor-hide'
  style.textContent = '@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }'
  document.head.appendChild(style)

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX
    my = e.clientY
    if (dotRef.value) {
      dotRef.value.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }
  })

  document.addEventListener('mouseover', (e) => {
    if ((e.target as Element)?.closest?.(INTERACTIVE)) isHovering.value = true
  })
  document.addEventListener('mouseout', (e) => {
    if ((e.target as Element)?.closest?.(INTERACTIVE)) isHovering.value = false
  })
  document.addEventListener('mousedown', () => { isClicking.value = true })
  document.addEventListener('mouseup', () => { isClicking.value = false })

  const loop = () => {
    rx += (mx - rx) * 0.11
    ry += (my - ry) * 0.11
    if (ringRef.value) {
      ringRef.value.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
    }
    raf = requestAnimationFrame(loop)
  }
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.getElementById('cursor-hide')?.remove()
})
</script>

<style scoped>
.c-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  background: #818cf8;
  border-radius: 50%;
  pointer-events: none;
  z-index: 100001;
  will-change: transform;
}

.c-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  border: 1.5px solid rgba(129, 140, 248, 0.65);
  border-radius: 50%;
  pointer-events: none;
  z-index: 100000;
  will-change: transform;
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.c-ring.hover {
  width: 52px;
  height: 52px;
  border-color: rgba(168, 85, 247, 0.9);
  background: rgba(99, 102, 241, 0.07);
}

.c-ring.click {
  width: 22px;
  height: 22px;
  background: rgba(99, 102, 241, 0.25);
  border-color: rgba(168, 85, 247, 0.9);
}

@media (pointer: coarse) {
  .c-dot,
  .c-ring {
    display: none;
  }
}
</style>
