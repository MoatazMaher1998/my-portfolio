<template>
  <div class="pipeline-wrap">
    <div class="blob blob-a" />
    <div class="blob blob-b" />

    <!-- SVG: orbit track + animated particles + center emblem -->
    <svg class="orbit-svg" viewBox="0 0 320 320" overflow="visible">
      <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(99,102,241,0.05)" stroke-width="1" />
      <circle cx="160" cy="160" r="128" fill="none" stroke="rgba(99,102,241,0.08)" stroke-width="1" />
      <circle cx="160" cy="160" r="114" fill="none" stroke="rgba(99,102,241,0.12)" stroke-width="1.5" />

      <circle
        cx="160" cy="160" r="100"
        fill="none"
        stroke="rgba(99,102,241,0.28)"
        stroke-width="1.5"
        stroke-dasharray="6 5"
      />

      <path id="orbit-path" d="M 160,60 A 100,100 0 1,1 159.9999,60" fill="none" />

      <circle r="5.5" fill="#818cf8" opacity="0.9">
        <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear">
          <mpath href="#orbit-path" />
        </animateMotion>
      </circle>

      <circle r="3.5" fill="#a855f7" opacity="0.75">
        <animateMotion dur="6s" begin="-2s" repeatCount="indefinite" calcMode="linear">
          <mpath href="#orbit-path" />
        </animateMotion>
      </circle>

      <circle r="2.5" fill="#22d3ee" opacity="0.6">
        <animateMotion dur="6s" begin="-4s" repeatCount="indefinite" calcMode="linear">
          <mpath href="#orbit-path" />
        </animateMotion>
      </circle>

      <circle cx="160" cy="160" r="50" fill="rgba(6,6,22,0.97)" />
      <circle cx="160" cy="160" r="50" fill="none" stroke="rgba(99,102,241,0.5)" stroke-width="1.5" />
      <circle cx="160" cy="160" r="40" fill="none" stroke="rgba(99,102,241,0.12)" stroke-width="1" />

      <text
        x="160" y="156"
        text-anchor="middle"
        font-family="Inter, sans-serif"
        font-weight="800"
        font-size="20"
        fill="#e5e5e5"
      >MM</text>
      <text
        x="160" y="172"
        text-anchor="middle"
        font-family="JetBrains Mono, monospace"
        font-size="7"
        fill="rgba(129,140,248,0.7)"
        letter-spacing="1.5"
      >full stack</text>
    </svg>

    <div class="nodes-layer">
      <div
        v-for="node in nodes"
        :key="node.id"
        class="p-node"
        :class="{ active: hovered === node.id }"
        :style="{ left: node.left + 'px', top: node.top + 'px', '--c': node.color }"
        @mouseenter="hovered = node.id"
        @mouseleave="hovered = null"
      >
        <div class="p-circle">
          <v-icon size="19" :color="node.color">{{ node.icon }}</v-icon>
        </div>

        <span class="p-label">{{ node.label }}</span>

        <Transition name="tip">
          <div v-if="hovered === node.id" class="p-tip" :class="node.tipSide">
            <p class="p-tip-title">{{ node.label }}</p>
            <div class="p-tip-techs">
              <span v-for="t in node.techs" :key="t">{{ t }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hovered = ref<string | null>(null)

// Half-size of the node div (44px) used to center it on its orbit point
const R = 100, CX = 160, CY = 160, HALF = 22

function orbit(angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  const nx = CX + R * Math.cos(rad)
  const ny = CY + R * Math.sin(rad)
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const tipSide =
    dx > 0.4 ? 'tip-right'
    : dx < -0.4 ? 'tip-left'
    : dy < 0 ? 'tip-top'
    : 'tip-bottom'
  return { left: nx - HALF, top: ny - HALF, tipSide }
}

const nodes = [
  {
    id: 'code',
    label: 'Frontend',
    icon: 'mdi-monitor-dashboard',
    color: '#818cf8',
    techs: ['Angular 16–19', 'Nuxt.js', 'Vue.js', 'TypeScript'],
    ...orbit(0),
  },
  {
    id: 'api',
    label: 'Backend',
    icon: 'mdi-api',
    color: '#a855f7',
    techs: ['Java', 'Spring Boot', 'Spring WebFlux', 'REST APIs'],
    ...orbit(72),
  },
  {
    id: 'data',
    label: 'Data',
    icon: 'mdi-database-outline',
    color: '#22d3ee',
    techs: ['PostgreSQL', 'Elasticsearch', 'Apache Superset'],
    ...orbit(144),
  },
  {
    id: 'ship',
    label: 'Ship',
    icon: 'mdi-rocket-launch-outline',
    color: '#f59e0b',
    techs: ['Docker', 'AWS EC2', 'NGINX', 'Render'],
    ...orbit(216),
  },
  {
    id: 'live',
    label: 'Live',
    icon: 'mdi-check-circle-outline',
    color: '#22c55e',
    techs: ['Production releases', 'Monitoring', 'Superset analytics'],
    ...orbit(288),
  },
]
</script>

<style scoped lang="scss">
.pipeline-wrap {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 0 auto;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
  animation: float 7s ease-in-out infinite;
}
.blob-a {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%);
  top: 10%;
  left: 15%;
}
.blob-b {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%);
  bottom: 10%;
  right: 10%;
  animation-delay: -3.5s;
}

.orbit-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 18px rgba(99, 102, 241, 0.2));
}

.nodes-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.p-node {
  position: absolute;
  width: 44px;
  height: 44px;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.p-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(6, 6, 22, 0.92);
  border: 1.5px solid color-mix(in srgb, var(--c) 50%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
}

.p-node.active .p-circle {
  transform: scale(1.2);
  border-color: var(--c);
  box-shadow: 0 0 16px color-mix(in srgb, var(--c) 50%, transparent);
}

.p-label {
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(229, 229, 229, 0.55);
  white-space: nowrap;
  transition: color 0.2s;
  pointer-events: none;
}
.p-node.active .p-label {
  color: var(--c);
}

.p-tip {
  position: absolute;
  background: rgba(6, 6, 22, 0.95);
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 10px;
  padding: 10px 12px;
  backdrop-filter: blur(12px);
  z-index: 10;
  min-width: 130px;
  pointer-events: none;
  white-space: nowrap;
}

.p-tip-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--c);
  margin: 0 0 6px;
  font-family: 'JetBrains Mono', monospace;
}

.p-tip-techs {
  display: flex;
  flex-direction: column;
  gap: 3px;

  span {
    font-size: 10px;
    color: rgba(229, 229, 229, 0.65);
    font-family: 'JetBrains Mono', monospace;

    &::before {
      content: '▸ ';
      color: var(--c, #818cf8);
      opacity: 0.8;
    }
  }
}

.tip-top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tip-bottom { top: calc(100% + 18px); left: 50%; transform: translateX(-50%); }
.tip-right { left: calc(100% + 10px); top: 50%; transform: translateY(-50%); }
.tip-left { right: calc(100% + 10px); top: 50%; transform: translateY(-50%); }

.tip-enter-active,
.tip-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
  transform: scale(0.92) translateX(-50%);
}
.tip-enter-from.tip-right,
.tip-leave-to.tip-right {
  transform: scale(0.92) translateY(-50%);
}
.tip-enter-from.tip-left,
.tip-leave-to.tip-left {
  transform: scale(0.92) translateY(-50%);
}

@media (max-width: 600px) {
  .pipeline-wrap {
    // Scale down uniformly so HTML nodes stay aligned with SVG orbit.
    // Negative margin compensates for the height collapsed by the transform.
    transform: scale(0.72);
    transform-origin: top center;
    margin-bottom: calc(320px * (1 - 0.72) * -1);
  }
}
</style>
