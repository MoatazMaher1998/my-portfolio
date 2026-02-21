<template>
  <section id="tech" class="section tech-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <div class="text-center mb-12">
            <p class="section-label">TECH STACK</p>
            <h2 class="section-title">
              Technologies I
              <span class="gradient-text">work with</span>
            </h2>
            <p class="section-subtitle">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          <div class="tech-categories">
            <div
              v-for="category in techCategories"
              :key="category.title"
              class="tech-category gradient-border"
              @mousemove="onCardMove"
              @mouseleave="onCardLeave"
            >
              <div class="category-header">
                <v-icon :color="category.color" size="28">{{ category.icon }}</v-icon>
                <h3 class="category-title">{{ category.title }}</h3>
              </div>

              <div class="tech-grid">
                <div
                  v-for="tech in category.items"
                  :key="tech.name"
                  class="tech-item"
                >
                  <div class="tech-icon-wrapper" :style="{ '--tech-color': tech.color }">
                    <v-icon size="24">{{ tech.icon }}</v-icon>
                  </div>
                  <span class="tech-name">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="additional-skills mt-12">
            <h4 class="skills-title text-center mb-6">Also experienced with</h4>
            <div class="skills-chips">
              <span
                v-for="skill in additionalSkills"
                :key="skill"
                class="tech-chip"
              >
                {{ skill }}
              </span>
            </div>
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
  card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale(1.02)`
  card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  card.style.setProperty('--glow', '1')
}

function onCardLeave(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement
  card.style.transform = ''
  card.style.setProperty('--glow', '0')
}

const techCategories = [
  {
    title: 'Backend & Frameworks',
    icon: 'mdi-server',
    color: '#22c55e',
    items: [
      { name: 'Java', icon: 'mdi-language-java', color: '#f89820' },
      { name: 'Spring Boot', icon: 'mdi-leaf', color: '#6db33f' },
      { name: 'Spring WebFlux', icon: 'mdi-lightning-bolt', color: '#6db33f' },
      { name: 'Spring Security', icon: 'mdi-shield-check', color: '#6db33f' },
      { name: 'JPA/Hibernate', icon: 'mdi-database', color: '#59666c' },
    ]
  },
  {
    title: 'Frontend',
    icon: 'mdi-palette',
    color: '#3b82f6',
    items: [
      { name: 'Angular', icon: 'mdi-angular', color: '#dd0031' },
      { name: 'Nuxt.js', icon: 'mdi-nuxt', color: '#00dc82' },
      { name: 'Vue.js', icon: 'mdi-vuejs', color: '#4fc08d' },
      { name: 'TypeScript', icon: 'mdi-language-typescript', color: '#3178c6' },
      { name: 'JavaScript', icon: 'mdi-language-javascript', color: '#f7df1e' },
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: 'mdi-cloud',
    color: '#a855f7',
    items: [
      { name: 'Docker', icon: 'mdi-docker', color: '#2496ed' },
      { name: 'AWS EC2', icon: 'mdi-aws', color: '#ff9900' },
      { name: 'GitLab CI/CD', icon: 'mdi-gitlab', color: '#fc6d26' },
      { name: 'GitHub Actions', icon: 'mdi-github', color: '#ffffff' },
      { name: 'NGINX', icon: 'mdi-server-network', color: '#009639' },
    ]
  },
  {
    title: 'Databases & Analytics',
    icon: 'mdi-database-search',
    color: '#f59e0b',
    items: [
      { name: 'PostgreSQL', icon: 'mdi-database', color: '#336791' },
      { name: 'Elasticsearch', icon: 'mdi-magnify', color: '#fed10a' },
      { name: 'Apache Superset', icon: 'mdi-chart-bar', color: '#ff6b35' },
      { name: 'Flyway', icon: 'mdi-airplane', color: '#cc0000' },
      { name: 'Git', icon: 'mdi-git', color: '#f05032' },
    ]
  }
]

const additionalSkills = [
  'REST APIs',
  'JUnit',
  'JaCoCo',
  'Mockito',
  'Jest',
  'Stripe',
  'Daily.co',
  'Brevo',
  'Bunny.net',
  'Gradle',
  'Maven',
  'JSF / JSP',
  'HTML5',
  'CSS3 / SCSS',
  'Jira',
  "Let's Encrypt",
  'Agile / Scrum',
]
</script>

<style scoped lang="scss">
.tech-section {
  position: relative;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}

.tech-category {
  padding: 1.5rem;
  background: rgba(18, 18, 18, 0.8);
  transition: transform 0.12s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(99, 102, 241, 0.14), transparent 65%);
    opacity: var(--glow, 0);
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.15);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);

    .tech-icon-wrapper {
      background: rgba(99, 102, 241, 0.15);
      border-color: var(--tech-color);
    }
  }
}

.tech-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tech-name {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.additional-skills {
  padding: 2rem;
  background: rgba(18, 18, 18, 0.5);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skills-title {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.skills-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
</style>
