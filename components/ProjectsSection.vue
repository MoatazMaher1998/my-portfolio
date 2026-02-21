<template>
  <section id="projects" class="section projects-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="10">

          <div class="text-center mb-10">
            <p class="section-label">PROJECTS</p>
            <h2 class="section-title">
              Featured <span class="gradient-text">work</span>
            </h2>
            <p class="section-subtitle">
              Key projects and contributions that showcase my expertise
            </p>
          </div>

          <div class="projects-grid">
            <div
              v-for="project in projects"
              :key="project.title"
              class="project-card gradient-border"
              @mousemove="onCardMove"
              @mouseleave="onCardLeave"
            >
              <div class="card-top">
                <div class="card-icon" :style="{ '--ic': project.iconColor }">
                  <v-icon :color="project.iconColor" size="22">{{ project.icon }}</v-icon>
                </div>
                <span class="card-badge" :class="project.badgeType">{{ project.badge }}</span>
              </div>

              <h3 class="card-title">{{ project.title }}</h3>
              <div v-if="project.metric" class="card-metric">
                <v-icon size="14" color="#22c55e">mdi-trending-up</v-icon>
                {{ project.metric }}
              </div>

              <p class="card-desc">{{ project.description }}</p>

              <ul v-if="project.highlights?.length" class="card-highlights">
                <li v-for="h in project.highlights" :key="h" class="card-highlight-item">
                  {{ h }}
                </li>
              </ul>

              <div class="card-techs">
                <span v-for="tech in project.tech" :key="tech" class="tech-chip">{{ tech }}</span>
              </div>

              <div v-if="project.marketplaces" class="card-marketplaces">
                <p class="mp-label">
                  <v-icon size="11" color="primary">mdi-link-variant</v-icon>
                  Integrated channels
                </p>
                <div class="mp-chips">
                  <span v-for="mp in project.marketplaces" :key="mp" class="mp-chip">{{ mp }}</span>
                </div>
              </div>

              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="card-link"
              >
                <v-icon size="13">mdi-open-in-new</v-icon>
                View live
              </a>
            </div>
          </div>

          <div class="github-cta text-center mt-10">
            <v-btn
              color="primary"
              variant="outlined"
              size="large"
              href="https://github.com/MoatazMaher1998"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon start>mdi-github</v-icon>
              View GitHub Profile
            </v-btn>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
function onCardMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.015)`
  card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  card.style.setProperty('--glow', '1')
}

function onCardLeave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  card.style.transform = ''
  card.style.setProperty('--glow', '0')
}

const projects = [
  {
    title: 'iMarket Integration Hub',
    description: 'Enterprise B2B marketplace platform syncing products, orders & inventory across 9 major e-commerce channels in real time.',
    icon: 'mdi-store',
    iconColor: '#22d3ee',
    badge: 'Enterprise',
    badgeType: 'enterprise',
    metric: 'Build time reduced by 25%',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'RabbitMQ'],
    highlights: [
      'Led frontend rebuild of a B2B marketplace used by 50+ retailers',
      'Built real-time order sync across 6 marketplace integrations (Amazon, eBay…)',
      'Reduced page load time by 40% via lazy loading + CDN integration',
    ],
    marketplaces: ['Amazon', 'eBay', 'Otto', 'Kaufland', 'Decathlon', 'Allegro', 'UberEATS', 'Bol.com', 'Happy Size'],
    link: 'https://www.novomind.com/en/digital-commerce/imarket/',
  },
  {
    title: 'AI-HUB Platform',
    description: 'Unified AI model management platform integrating Gemini, OpenAI, Neuroflash & DeepL for content generation, translation and automation.',
    icon: 'mdi-robot',
    iconColor: '#a855f7',
    badge: 'Enterprise',
    badgeType: 'enterprise',
    metric: 'CI/CD release time cut by 75%',
    tech: ['Angular', 'Spring WebFlux', 'Java', 'Docker'],
    highlights: [
      'Unified AI model management platform across 4 product teams',
      'Integrated OpenAI, Azure AI & custom LLM endpoints under one API layer',
      'Built streaming response UI with Server-Sent Events',
    ],
    link: null,
  },
  {
    title: 'AI Platform',
    description: 'Reactive API gateway as a single entry point for an agentic AI solutions platform, with real-time Superset analytics.',
    icon: 'mdi-brain',
    iconColor: '#6366f1',
    badge: 'Enterprise',
    badgeType: 'enterprise',
    metric: 'Unified AI capabilities for enterprise clients',
    tech: ['Spring Boot', 'Python', 'Docker', 'PostgreSQL'],
    highlights: [
      'Internal AI tooling platform powering 3 novomind products',
      'Designed prompt pipeline architecture for multi-turn LLM conversations',
      'Deployed on AWS with auto-scaling under variable inference load',
    ],
    link: 'https://www.novomind.com/en/ai-data/ai-platform/',
  },
  {
    title: 'SkillSouq',
    description: 'Freelance marketplace connecting skill providers with clients — live video sessions, Stripe payments, CDN, and 90%+ test coverage.',
    icon: 'mdi-account-star',
    iconColor: '#22c55e',
    badge: 'Part-Time',
    badgeType: 'startup',
    metric: '90% JaCoCo coverage · Render + PostgreSQL',
    tech: ['Nuxt.js', 'Spring Boot', 'PostgreSQL', 'Stripe'],
    highlights: [
      'Freelance marketplace connecting 500+ skill providers',
      'Built end-to-end payment flow with Stripe Connect',
      'Designed and shipped solo in 4 months',
    ],
    link: 'https://skillsouq.com/',
  },
  {
    title: 'EatsAndBeats',
    description: 'Food delivery + live music streaming app — built the full backend from scratch and deployed it on AWS EC2.',
    icon: 'mdi-food-fork-drink',
    iconColor: '#f59e0b',
    badge: 'Part-Time',
    badgeType: 'startup',
    metric: 'Live on AWS EC2 with Elasticsearch',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Daily.co'],
    highlights: [
      'Food delivery + live music streaming app in one platform',
      'Integrated Daily.co for real-time video sessions during orders',
      'Handled concurrent delivery tracking with WebSockets',
    ],
    link: 'https://eatsandbeats.com/home',
  },
  {
    title: 'Sigma WMS',
    description: 'Warehouse management system with a generic approval workflow engine, service registry pattern, IP rate limiting, and JWT auth.',
    icon: 'mdi-warehouse',
    iconColor: '#818cf8',
    badge: 'Part-Time',
    badgeType: 'personal',
    metric: 'Full audit trail · refresh token rotation',
    tech: ['Angular', 'Spring Boot', 'PostgreSQL', 'Flyway'],
    highlights: [
      'Warehouse management system for logistics operations',
      'Built shipment tracking dashboard with real-time status updates',
      'DB migration system with zero-downtime deploys via Flyway',
    ],
    link: null,
  },
]
</script>

<style scoped lang="scss">
.projects-section {
  position: relative;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  padding: 1.25rem;
  background: rgba(18, 18, 18, 0.85);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.12s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(99, 102, 241, 0.12), transparent 65%);
    opacity: var(--glow, 0);
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.12);
  }
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--ic, #818cf8) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--ic, #818cf8) 30%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-badge {
  padding: 3px 9px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 4px;

  &.enterprise {
    background: rgba(99, 102, 241, 0.18);
    color: #a5b4fc;
    border: 1px solid rgba(99, 102, 241, 0.25);
  }

  &.startup {
    background: rgba(34, 211, 238, 0.15);
    color: #67e8f9;
    border: 1px solid rgba(34, 211, 238, 0.25);
  }

  &.personal {
    background: rgba(129, 140, 248, 0.15);
    color: #a5b4fc;
    border: 1px solid rgba(129, 140, 248, 0.25);
  }
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #e5e5e5;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
}

.card-metric {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: #86efac;
  font-family: 'JetBrains Mono', monospace;
}

.card-highlights {
  list-style: none;
  padding: 0;
  margin: 0 0 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-highlight-item {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  padding-left: 1.1em;
  position: relative;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: rgba(99, 102, 241, 0.7);
    font-size: 0.75rem;
    top: 0.05em;
  }
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-marketplaces {
  margin-top: 2px;
}

.mp-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.mp-chip {
  padding: 2px 8px;
  background: rgba(99, 102, 241, 0.07);
  border: 1px solid rgba(99, 102, 241, 0.18);
  border-radius: 20px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(99, 102, 241, 0.14);
    border-color: rgba(99, 102, 241, 0.35);
    color: rgba(255, 255, 255, 0.75);
  }
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: rgba(99, 102, 241, 0.7);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  margin-top: auto;
  transition: color 0.2s;

  &:hover {
    color: #818cf8;
  }
}

.github-cta {
  opacity: 0.85;
}
</style>
