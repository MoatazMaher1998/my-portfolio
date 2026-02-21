<template>
  <section id="experience" class="section experience-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="10">

          <div class="text-center mb-12">
            <p class="section-label">EXPERIENCE</p>
            <h2 class="section-title">
              My professional <span class="gradient-text">journey</span>
            </h2>
          </div>

          <div class="timeline">
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-marker">
                <div class="marker-dot" :class="{ current: exp.current }" />
                <div v-if="index < experiences.length - 1" class="marker-line" />
              </div>

              <div class="timeline-content gradient-border">
                <div class="content-header">
                  <div class="header-left">
                    <h3 class="job-title">{{ exp.title }}</h3>
                    <p class="company">
                      <v-icon size="15" class="mr-1">mdi-domain</v-icon>
                      <a
                        v-if="exp.companyUrl"
                        :href="exp.companyUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="company-link"
                      >{{ exp.company }}</a>
                      <span v-else>{{ exp.company }}</span>
                      <span v-if="exp.type" class="job-type">{{ exp.type }}</span>
                    </p>
                  </div>
                  <div class="header-right">
                    <span class="period">
                      <v-icon size="13" class="mr-1">mdi-calendar-outline</v-icon>
                      {{ exp.period }}
                    </span>
                    <a
                      v-if="exp.link && !exp.teams"
                      :href="exp.link"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="team-link"
                    >
                      View product
                      <v-icon size="12" class="ml-1">mdi-open-in-new</v-icon>
                    </a>
                  </div>
                </div>

                <div v-if="exp.teams" class="teams">
                  <div v-for="team in exp.teams" :key="team.name" class="team">
                    <div class="team-header">
                      <h4 class="team-name">
                        <v-icon size="14" color="primary" class="mr-1">mdi-account-group-outline</v-icon>
                        {{ team.name }}
                      </h4>
                      <a
                        v-if="team.link"
                        :href="team.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="team-link"
                      >
                        View product
                        <v-icon size="12" class="ml-1">mdi-open-in-new</v-icon>
                      </a>
                    </div>
                    <ul class="achievements">
                      <li v-for="(a, i) in team.achievements" :key="i">{{ a }}</li>
                    </ul>
                    <div v-if="team.tech" class="chip-row">
                      <span v-for="t in team.tech" :key="t" class="tech-chip">{{ t }}</span>
                    </div>
                  </div>
                </div>

                <template v-else>
                  <ul class="achievements">
                    <li v-for="(a, i) in exp.achievements" :key="i">{{ a }}</li>
                  </ul>
                  <div v-if="exp.tech" class="chip-row">
                    <span v-for="t in exp.tech" :key="t" class="tech-chip">{{ t }}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="education-wrap mt-12">
            <h3 class="edu-heading text-center mb-6">
              <v-icon class="mr-2" color="primary">mdi-school-outline</v-icon>
              Education
            </h3>
            <div class="edu-card gradient-border">
              <div class="edu-inner">
                <div class="edu-left">
                  <h4 class="edu-degree">Bachelor of Science in Computer and Communication Engineering</h4>
                  <p class="edu-uni">
                    <v-icon size="15" class="mr-1">mdi-bank-outline</v-icon>
                    Faculty of Engineering, Alexandria University
                  </p>
                  <div class="edu-meta">
                    <span>
                      <v-icon size="13" class="mr-1">mdi-calendar-outline</v-icon>
                      2016 – 2021
                    </span>
                    <span>
                      <v-icon size="13" class="mr-1">mdi-medal-outline</v-icon>
                      Grade: Very Good
                    </span>
                  </div>
                </div>
                <div class="edu-badge">
                  <v-icon size="42" color="primary" style="opacity:0.3">mdi-school</v-icon>
                </div>
              </div>
            </div>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const experiences = [
  {
    title: 'Mid-Level Full Stack Engineer',
    company: 'Novomind',
    companyUrl: 'https://www.novomind.com',
    period: '2022 – Present',
    current: true,
    teams: [
      {
        name: 'AI Platform Team',
        link: 'https://www.novomind.com/en/ai-data/ai-platform/',
        achievements: [
          'Built and maintained the API gateway using Spring WebFlux as the single entry point for all platform traffic',
          'Maintained and enhanced backend services powering an agentic AI solutions platform for enterprise clients',
          'Built Apache Superset dashboards backed by custom PostgreSQL views for real-time operational analytics',
          'Wrote unit tests to enforce code quality and coverage standards across platform services',
          'Planned and initiated integration of AI Hub into the AI Platform to unify AI capabilities under a single product',
        ],
        tech: ['Spring WebFlux', 'Spring Boot', 'PostgreSQL', 'Apache Superset', 'JUnit'],
      },
      {
        name: 'AI-HUB Team',
        link: null,
        achievements: [
          'Designed and developed frontend features using Nuxt.js with high-quality UI enhancements and performance improvements',
          'Developed and optimized backend services using Java Spring Boot, focusing on performance tuning and scalability',
          'Integrated Gemini, OpenAI, Neuroflash, and DeepL for AI-driven content generation and translation',
          'Reduced CI/CD release time by 75% (5–6 hours → 1–2 hours) through pipeline parallelization and caching',
          'Managed production releases using GitLab CI/CD with versioning and controlled deployment strategies',
        ],
        tech: ['Nuxt.js', 'Spring Boot', 'GitLab CI/CD', 'AI APIs'],
      },
      {
        name: 'iMarket Team',
        link: 'https://www.novomind.com/en/digital-commerce/imarket/',
        achievements: [
          'Built and maintained frontend using Angular 16–19 with component testing via Jest',
          'Designed REST APIs and implemented JPA/Hibernate for reliable marketplace data synchronization',
          'Fully integrated iMarket with Amazon, eBay, Otto, Kaufland, Decathlon, Allegro, UberEATS, Bol.com, Happy Size',
          'Built high-performance, memory-efficient synchronization processes for products, orders, and state transitions',
          'Optimized GitLab CI/CD pipeline reducing build time by 25%, with automated deployment and Teams notifications',
          'Mentored junior developers and led code reviews within Agile workflows',
        ],
        tech: ['Angular 16–19', 'Spring Boot', 'JPA/Hibernate', 'Jest', 'GitLab CI/CD'],
      },
      {
        name: 'iAgent Team',
        link: 'https://www.novomind.com/en/products/novomind-iagent/',
        achievements: [
          'Maintained core iAgent product using Java Spring Boot, JSF, JSP, and Vue.js',
          'Developed Gradle-based Spring Boot service to integrate iAgent with a Dockerized similarity search engine',
          'Built multi-threaded integration layer using REST APIs and JAR-based interfaces',
        ],
        tech: ['Spring Boot', 'JSF', 'Vue.js', 'Docker', 'Gradle'],
      },
    ],
  },
  {
    title: 'Full Stack Developer & Technical Owner',
    company: 'EatsAndBeats',
    companyUrl: 'https://eatsandbeats.com/home',
    link: 'https://eatsandbeats.com/home',
    type: 'Part-Time',
    period: '2025 (Part-Time)',
    current: false,
    achievements: [
      'Built complete backend architecture from scratch using Java Spring Boot with authentication and user management',
      'Led CI/CD pipeline setup with GitHub Actions for automated Docker builds and deployments',
      'Deployed on AWS EC2 with Elasticsearch integration and Docker orchestration',
      'Configured NGINX reverse proxy with custom domain and HTTPS via Let\'s Encrypt',
    ],
    tech: ['Spring Boot', 'AWS EC2', 'Docker', 'Elasticsearch', 'NGINX', 'GitHub Actions'],
  },
  {
    title: 'Backend Architect & Developer',
    company: 'SkillSouq',
    companyUrl: 'https://skillsouq.com/',
    link: 'https://skillsouq.com/',
    type: 'Part-Time',
    period: '2025 – Mar 2026 (Part-Time)',
    current: false,
    achievements: [
      'Sole developer — designed and implemented full backend architecture from scratch using Java Spring Boot',
      'Integrated Stripe for payment processing and Wise for international instructor payouts with multi-currency support',
      'Integrated Daily.co for live video sessions with role-based room permissions and secure short-lived join tokens',
      'Integrated Brevo for transactional emails and Bunny.net for CDN and file storage',
      'Implemented a payment provider factory pattern supporting multiple providers through a unified abstraction',
      'Enforced 90% minimum test coverage with JaCoCo; GitHub Actions CI reports coverage on every PR',
      'Deployed containerized backend on Render with PostgreSQL and Flyway database migrations',
    ],
    tech: ['Spring Boot', 'PostgreSQL', 'Docker', 'Render', 'Stripe', 'Daily.co', 'JaCoCo', 'Flyway'],
  },
  {
    title: 'Backend Developer',
    company: 'Sigma',
    companyUrl: null,
    type: 'Part-Time',
    period: 'Mar 2026 – Apr 2026',
    current: false,
    achievements: [
      'Built a warehouse management system backend from scratch using Java Spring Boot and PostgreSQL',
      'Implemented a generic approval workflow supporting create, edit, and delete operations with a full audit trail',
      'Designed a service registry pattern allowing any entity type to plug into the approval flow via a common interface',
      'Added IP-based rate limiting with stricter thresholds for authentication endpoints',
      'Applied Flyway for database schema migrations and role-based caching for performance',
      'Secured the application with JWT authentication and refresh token rotation',
    ],
    tech: ['Spring Boot', 'PostgreSQL', 'Flyway', 'JWT', 'JaCoCo', 'GitHub Actions'],
  },
]
</script>

<style scoped lang="scss">
.experience-section {
  background: linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%);
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
  }
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1a1a2e;
  border: 2.5px solid #6366f1;
  z-index: 1;
  flex-shrink: 0;

  &.current {
    background: #6366f1;
    box-shadow: 0 0 18px rgba(99, 102, 241, 0.55);
  }
}

.marker-line {
  width: 2px;
  flex: 1;
  min-height: 24px;
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.1));
  margin-top: 6px;
}

.timeline-content {
  flex: 1;
  padding: 1.5rem;
  background: rgba(18, 18, 18, 0.85);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.job-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #e5e5e5;
  line-height: 1.3;
}

.company {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}

.company-link {
  color: #a5b4fc;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #818cf8;
    text-decoration: underline;
  }
}

.job-type {
  padding: 2px 8px;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(168, 85, 247, 0.18);
  color: #c4b5fd;
  border-radius: 4px;
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.period {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
  font-family: 'JetBrains Mono', monospace;
}

.teams {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.team {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border-left: 3px solid rgba(99, 102, 241, 0.5);
}

.team-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0.75rem;
}

.team-name {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: #a5b4fc;
}

.team-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  color: rgba(99, 102, 241, 0.7);
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  transition: color 0.2s;

  &:hover {
    color: #818cf8;
  }
}

.achievements {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 1.2rem;
    margin-bottom: 0.45rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.65;

    &::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: #6366f1;
      font-size: 0.7rem;
      top: 4px;
    }
  }
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 0.875rem;
}

.edu-heading {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
}

.edu-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.75rem 2rem;
  background: rgba(18, 18, 18, 0.85);
}

.edu-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.edu-left {
  flex: 1;
}

.edu-degree {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 0.6rem;
  line-height: 1.4;
}

.edu-uni {
  display: flex;
  align-items: center;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.75rem;
}

.edu-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.45);
    font-family: 'JetBrains Mono', monospace;
    gap: 3px;
  }
}
</style>
