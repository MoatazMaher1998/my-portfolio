<template>
  <section id="skills" class="section skill-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="9">

          <div class="search-box" :class="{ focused: isFocused }">
            <v-icon class="search-icon" size="22">mdi-magnify</v-icon>
            <input
              v-model="query"
              class="search-input"
              placeholder="Search a skill — Angular, Docker, Stripe…"
              autocomplete="off"
              spellcheck="false"
              @focus="isFocused = true"
              @blur="isFocused = false"
            />
            <button v-if="query" class="search-clear" @click="query = ''" aria-label="Clear">
              <v-icon size="14">mdi-close</v-icon>
            </button>
          </div>

          <Transition name="fade">
            <div v-if="!trimmed" class="quick-pills">
              <span class="quick-label">Try:</span>
              <button
                v-for="s in quickSuggestions"
                :key="s"
                class="quick-pill"
                @click="query = s"
              >{{ s }}</button>
            </div>
          </Transition>

          <Transition name="slide-results">
            <div v-if="trimmed" class="results-wrap">

              <template v-if="results.length">
                <div class="results-grid">
                  <div
                    v-for="skill in results"
                    :key="skill.name"
                    class="skill-card gradient-border"
                  >
                    <div class="skill-card-top">
                      <div class="skill-name-row">
                        <span class="skill-name">{{ skill.name }}</span>
                        <span class="skill-cat" :class="skill.catClass">{{ skill.category }}</span>
                      </div>
                      <v-icon size="18" class="skill-check-icon">mdi-check-circle</v-icon>
                    </div>

                    <p class="skill-card-hint">Found in my stack — here's where it shows up:</p>

                    <div class="ctx-list">
                      <a
                        v-for="ctx in skill.contexts"
                        :key="ctx.label"
                        :href="ctx.section"
                        class="ctx-chip"
                        :class="`ctx-${ctx.type}`"
                      >
                        <v-icon size="12">{{ ctx.icon }}</v-icon>
                        {{ ctx.label }}
                      </a>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else-if="adjacentHint" class="hint-card hint-adjacent">
                <div class="hint-icon">💡</div>
                <div>
                  <p class="hint-title">"{{ query.trim() }}" isn't in my stack yet — but it might be worth exploring together 👀</p>
                  <p class="hint-body">
                    {{ adjacentHint }}
                    Browse <a href="#tech" class="inline-link">Tech Stack</a> or
                    <a href="#experience" class="inline-link">Experience</a> for the full picture.
                  </p>
                </div>
              </div>

              <div v-else class="hint-card hint-unknown">
                <div class="hint-icon">🤷</div>
                <div>
                  <p class="hint-title">"{{ query.trim() }}" isn't in my stack yet — but it might be worth exploring together 👀</p>
                  <p class="hint-body">
                    Haven't shipped with it yet. Check the
                    <a href="#tech" class="inline-link">Tech Stack</a> or
                    <a href="#experience" class="inline-link">Experience</a> sections for what I have shipped — there's quite a bit there.
                  </p>
                </div>
              </div>

            </div>
          </Transition>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { query } = useSkillQuery()
const isFocused = ref(false)
const trimmed = computed(() => query.value.trim().toLowerCase())

interface Ctx {
  type: 'team' | 'project' | 'tech'
  label: string
  section: string
  icon: string
}
interface Skill {
  name: string
  aliases: string[]
  category: string
  catClass: string
  contexts: Ctx[]
}

const skills: Skill[] = [
  {
    name: 'Angular',
    aliases: ['angular', 'ng', 'angular 16', 'angular 19', 'angular16', 'angular19'],
    category: 'Frontend',
    catClass: 'cat-frontend',
    contexts: [
      { type: 'team',    label: 'iMarket Team @ Novomind',  section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'iMarket Integration Hub',  section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Nuxt.js',
    aliases: ['nuxt', 'nuxtjs', 'nuxt.js', 'nuxt3', 'nuxt 3'],
    category: 'Frontend',
    catClass: 'cat-frontend',
    contexts: [
      { type: 'team',    label: 'AI-HUB Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'AI-HUB Platform',         section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',               section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Vue.js',
    aliases: ['vue', 'vuejs', 'vue.js', 'vue3', 'vue 3'],
    category: 'Frontend',
    catClass: 'cat-frontend',
    contexts: [
      { type: 'team', label: 'iAgent Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'tech', label: 'Tech Stack',              section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'TypeScript',
    aliases: ['typescript', 'ts'],
    category: 'Frontend',
    catClass: 'cat-frontend',
    contexts: [
      { type: 'team', label: 'iMarket & AI-HUB Teams', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'tech', label: 'Tech Stack',              section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'JavaScript',
    aliases: ['javascript', 'js', 'es6', 'ecmascript'],
    category: 'Frontend',
    catClass: 'cat-frontend',
    contexts: [
      { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
    ],
  },
  {
    name: 'Java',
    aliases: ['java', 'jdk', 'jvm'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team',    label: 'All Novomind Teams',      section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'All backend projects',    section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',              section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Spring Boot',
    aliases: ['spring', 'spring boot', 'springboot', 'spring framework', 'springframework'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team',    label: 'AI-HUB, iMarket, iAgent Teams', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'All backend projects',           section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                     section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Spring WebFlux',
    aliases: ['webflux', 'spring webflux', 'reactive', 'reactor', 'reactive streams', 'non-blocking'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team',    label: 'AI Platform Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'AI Platform',                 section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                  section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Spring Security',
    aliases: ['spring security', 'security', 'authorization'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
    ],
  },
  {
    name: 'JPA / Hibernate',
    aliases: ['jpa', 'hibernate', 'orm', 'jpa/hibernate', 'jpa hibernate'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team',    label: 'iMarket Team @ Novomind',  section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'iMarket Integration Hub',  section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',               section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'REST APIs',
    aliases: ['rest', 'rest api', 'restful', 'http api', 'api design'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team',    label: 'All Novomind Teams',   section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'All backend projects', section: '#projects',   icon: 'mdi-briefcase-outline'     },
    ],
  },
  {
    name: 'JWT',
    aliases: ['jwt', 'json web token', 'token auth', 'refresh token'],
    category: 'Security',
    catClass: 'cat-backend',
    contexts: [
      { type: 'project', label: 'Sigma WMS',             section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'team',    label: 'Multiple projects',     section: '#experience', icon: 'mdi-account-group-outline' },
    ],
  },
  {
    name: 'JSF / JSP',
    aliases: ['jsf', 'jsp', 'java server faces', 'java server pages', 'primefaces'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team', label: 'iAgent Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    ],
  },
  {
    name: 'Gradle',
    aliases: ['gradle', 'gradle build'],
    category: 'Backend',
    catClass: 'cat-backend',
    contexts: [
      { type: 'team', label: 'iAgent Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    ],
  },
  {
    name: 'Docker',
    aliases: ['docker', 'container', 'containers', 'containerization', 'dockerfile', 'docker compose'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'team',    label: 'iAgent, EatsAndBeats, SkillSouq', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'Multiple projects',               section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                      section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'AWS EC2',
    aliases: ['aws', 'amazon web services', 'ec2', 'aws ec2', 'amazon cloud', 's3', 'aws s3', 'cloud'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'project', label: 'EatsAndBeats',     section: '#projects', icon: 'mdi-briefcase-outline' },
      { type: 'tech',    label: 'Tech Stack',        section: '#tech',     icon: 'mdi-chip'              },
    ],
  },
  {
    name: 'GitLab CI/CD',
    aliases: ['gitlab', 'gitlab ci', 'ci/cd', 'cicd', 'pipeline', 'continuous integration', 'continuous deployment'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'team',    label: 'AI-HUB & iMarket Teams @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'AI-HUB Platform, iMarket Hub',      section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                         section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'GitHub Actions',
    aliases: ['github actions', 'github ci', 'actions workflow', 'gh actions'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'project', label: 'EatsAndBeats, SkillSouq, Sigma WMS', section: '#projects', icon: 'mdi-briefcase-outline' },
      { type: 'tech',    label: 'Tech Stack',                          section: '#tech',     icon: 'mdi-chip'              },
    ],
  },
  {
    name: 'NGINX',
    aliases: ['nginx', 'reverse proxy', 'web server', 'nginx proxy'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'project', label: 'EatsAndBeats',     section: '#projects', icon: 'mdi-briefcase-outline' },
      { type: 'tech',    label: 'Tech Stack',        section: '#tech',     icon: 'mdi-chip'              },
    ],
  },
  {
    name: "Let's Encrypt / HTTPS",
    aliases: ["let's encrypt", 'letsencrypt', 'ssl', 'tls', 'https', 'certificate'],
    category: 'Cloud / DevOps',
    catClass: 'cat-cloud',
    contexts: [
      { type: 'project', label: 'EatsAndBeats', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'PostgreSQL',
    aliases: ['postgresql', 'postgres', 'psql', 'relational db', 'sql', 'rdbms'],
    category: 'Database',
    catClass: 'cat-database',
    contexts: [
      { type: 'team',    label: 'AI Platform Team @ Novomind',     section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'SkillSouq, Sigma WMS, AI Platform', section: '#projects', icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                      section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Elasticsearch',
    aliases: ['elasticsearch', 'elastic', 'elk', 'search engine', 'full-text search'],
    category: 'Database',
    catClass: 'cat-database',
    contexts: [
      { type: 'project', label: 'EatsAndBeats', section: '#projects', icon: 'mdi-briefcase-outline' },
      { type: 'tech',    label: 'Tech Stack',    section: '#tech',     icon: 'mdi-chip'              },
    ],
  },
  {
    name: 'Apache Superset',
    aliases: ['superset', 'apache superset', 'analytics dashboard', 'bi', 'business intelligence', 'data viz'],
    category: 'Analytics',
    catClass: 'cat-database',
    contexts: [
      { type: 'team',    label: 'AI Platform Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'AI Platform',                 section: '#projects',   icon: 'mdi-briefcase-outline'     },
      { type: 'tech',    label: 'Tech Stack',                  section: '#tech',       icon: 'mdi-chip'                  },
    ],
  },
  {
    name: 'Flyway',
    aliases: ['flyway', 'db migration', 'database migration', 'schema migration'],
    category: 'Database',
    catClass: 'cat-database',
    contexts: [
      { type: 'project', label: 'SkillSouq, Sigma WMS', section: '#projects', icon: 'mdi-briefcase-outline' },
      { type: 'tech',    label: 'Tech Stack',            section: '#tech',     icon: 'mdi-chip'              },
    ],
  },
  {
    name: 'JUnit',
    aliases: ['junit', 'junit5', 'unit test', 'unit testing', 'junit 5'],
    category: 'Testing',
    catClass: 'cat-testing',
    contexts: [
      { type: 'team', label: 'AI Platform Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    ],
  },
  {
    name: 'JaCoCo',
    aliases: ['jacoco', 'code coverage', 'test coverage', 'coverage report'],
    category: 'Testing',
    catClass: 'cat-testing',
    contexts: [
      { type: 'project', label: 'SkillSouq (90%+ coverage), Sigma WMS', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'Mockito',
    aliases: ['mockito', 'mocking', 'mock', 'test mock'],
    category: 'Testing',
    catClass: 'cat-testing',
    contexts: [
      { type: 'tech', label: 'Tech Stack (Additional)', section: '#tech', icon: 'mdi-chip' },
    ],
  },
  {
    name: 'Jest',
    aliases: ['jest', 'js testing', 'frontend testing', 'component testing'],
    category: 'Testing',
    catClass: 'cat-testing',
    contexts: [
      { type: 'team',    label: 'iMarket Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'iMarket Integration Hub', section: '#projects',   icon: 'mdi-briefcase-outline'     },
    ],
  },
  {
    name: 'Stripe',
    aliases: ['stripe', 'payment', 'payments', 'payment gateway', 'billing'],
    category: 'Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'project', label: 'SkillSouq', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'Daily.co',
    aliases: ['daily', 'daily.co', 'video call', 'live video', 'webrtc', 'video session'],
    category: 'Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'project', label: 'SkillSouq (live sessions)', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'Brevo',
    aliases: ['brevo', 'sendinblue', 'transactional email', 'email service', 'smtp'],
    category: 'Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'project', label: 'SkillSouq', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'Bunny.net',
    aliases: ['bunny', 'bunny.net', 'cdn', 'file storage', 'content delivery'],
    category: 'Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'project', label: 'SkillSouq (CDN + storage)', section: '#projects', icon: 'mdi-briefcase-outline' },
    ],
  },
  {
    name: 'AI APIs',
    aliases: ['ai', 'gemini', 'openai', 'gpt', 'chatgpt', 'deepl', 'neuroflash', 'llm', 'artificial intelligence', 'machine learning', 'ml'],
    category: 'AI / Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'team',    label: 'AI-HUB Team @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'AI-HUB Platform',         section: '#projects',   icon: 'mdi-briefcase-outline'     },
    ],
  },
  {
    name: 'Marketplace Integrations',
    aliases: ['amazon', 'ebay', 'otto', 'kaufland', 'allegro', 'decathlon', 'ubereats', 'bol.com', 'happy size', 'marketplace', 'ecommerce', 'e-commerce'],
    category: 'Integrations',
    catClass: 'cat-integration',
    contexts: [
      { type: 'team',    label: 'iMarket Team @ Novomind',  section: '#experience', icon: 'mdi-account-group-outline' },
      { type: 'project', label: 'iMarket Integration Hub',  section: '#projects',   icon: 'mdi-briefcase-outline'     },
    ],
  },
]

const adjacentSkillHints: Record<string, string> = {
  react:       'given my Vue.js and Nuxt.js background, React would be a smooth transition.',
  reactjs:     'given my Vue.js and Nuxt.js background, React would be a smooth transition.',
  'react.js':  'given my Vue.js and Nuxt.js background, React would be a smooth transition.',
  nextjs:      'as a Nuxt.js developer, Next.js shares a lot of the same mental model.',
  'next.js':   'as a Nuxt.js developer, Next.js shares a lot of the same mental model.',
  svelte:      'a natural step for someone who works with Vue and TypeScript.',
  kubernetes:  'the natural next layer on top of Docker and AWS experience.',
  k8s:         'the natural next layer on top of Docker and AWS experience.',
  terraform:   'a great complement to existing Docker and AWS EC2 work.',
  redis:       'a natural addition alongside PostgreSQL for caching use cases.',
  mongodb:     'would complement the PostgreSQL and Elasticsearch data background.',
  dynamodb:    'an interesting shift from PostgreSQL given the AWS background.',
  graphql:     'an interesting complement to existing REST API design experience.',
  apollo:      'an interesting complement to existing REST API design experience.',
  kafka:       'a great next step given experience with data pipelines and async systems.',
  rabbitmq:    'a natural evolution from synchronous REST API integrations.',
  python:      'a natural addition to the Java/TypeScript skill set.',
  go:          'increasingly popular for high-performance microservices alongside Java.',
  golang:      'increasingly popular for high-performance microservices alongside Java.',
  rust:        'growing fast in systems programming — an interesting exploration.',
  kotlin:      'a natural fit as a modern JVM language alongside Java and Spring Boot.',
  'c#':        'similar paradigms to Java — would translate quickly.',
  dotnet:      'similar paradigms to Java Spring — would translate quickly.',
  '.net':      'similar paradigms to Java Spring — would translate quickly.',
  jenkins:     'another CI/CD system — similar concepts to GitLab and GitHub Actions.',
  ansible:     'a useful complement to the Docker and NGINX infrastructure work.',
}

const results = computed<Skill[]>(() => {
  if (!trimmed.value) return []
  return skills.filter(s =>
    s.aliases.some(a => a.includes(trimmed.value) || trimmed.value.includes(a))
  )
})

const adjacentHint = computed<string | null>(() => {
  if (results.value.length) return null
  for (const [key, hint] of Object.entries(adjacentSkillHints)) {
    if (key.includes(trimmed.value) || trimmed.value.includes(key)) return hint
  }
  return null
})

const quickSuggestions = [
  'Angular', 'Nuxt.js', 'Spring Boot', 'WebFlux',
  'Docker', 'PostgreSQL', 'Stripe', 'AI APIs',
]
</script>

<style scoped lang="scss">
.skill-section {
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(12, 12, 28, 0.75);
  border: 1.5px solid rgba(99, 102, 241, 0.28);
  border-radius: 18px;
  padding: 18px 22px;
  backdrop-filter: blur(14px);
  transition: border-color 0.25s, box-shadow 0.25s;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);

  &.focused {
    border-color: rgba(99, 102, 241, 0.65);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 0 4px 32px rgba(0, 0, 0, 0.25);
  }
}

.search-icon {
  color: rgba(99, 102, 241, 0.6);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1.1rem;
  color: #e5e5e5;
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: rgba(255, 255, 255, 0.28);
    font-style: italic;
  }
}

.search-clear {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 6px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  transition: background 0.15s;

  &:hover { background: rgba(255, 255, 255, 0.15); }
}

.quick-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'JetBrains Mono', monospace;
}

.quick-pill {
  padding: 5px 13px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;

  &:hover {
    background: rgba(99, 102, 241, 0.18);
    border-color: rgba(99, 102, 241, 0.5);
    color: #a5b4fc;
  }
}

.results-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.skill-card {
  background: rgba(18, 18, 18, 0.88);
  padding: 1.4rem 1.5rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(99, 102, 241, 0.15);
  }
}

.skill-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 0.6rem;
}

.skill-name-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-check-icon {
  color: #22c55e;
  opacity: 0.8;
  flex-shrink: 0;
  margin-top: 2px;
}

.skill-card-hint {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 0.85rem;
  font-style: italic;
}

.skill-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #e5e5e5;
}

.skill-cat {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.cat-frontend   { background: rgba(59, 130, 246, 0.15);  color: #93c5fd;  border: 1px solid rgba(59,130,246,0.2);   }
  &.cat-backend    { background: rgba(34, 197, 94, 0.12);   color: #86efac;  border: 1px solid rgba(34,197,94,0.2);    }
  &.cat-cloud      { background: rgba(168, 85, 247, 0.12);  color: #d8b4fe;  border: 1px solid rgba(168,85,247,0.2);   }
  &.cat-database   { background: rgba(245, 158, 11, 0.12);  color: #fcd34d;  border: 1px solid rgba(245,158,11,0.2);   }
  &.cat-testing    { background: rgba(236, 72, 153, 0.12);  color: #f9a8d4;  border: 1px solid rgba(236,72,153,0.2);   }
  &.cat-integration{ background: rgba(34, 211, 238, 0.12);  color: #67e8f9;  border: 1px solid rgba(34,211,238,0.2);   }
}

.ctx-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ctx-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;

  &.ctx-team {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.25);
    color: #a5b4fc;
    &:hover { background: rgba(99,102,241,0.2); border-color: #818cf8; }
  }
  &.ctx-project {
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.22);
    color: #86efac;
    &:hover { background: rgba(34,197,94,0.16); border-color: #22c55e; }
  }
  &.ctx-tech {
    background: rgba(245, 158, 11, 0.08);
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: #fcd34d;
    &:hover { background: rgba(245,158,11,0.15); border-color: #f59e0b; }
  }
}

.hint-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border-radius: 14px;

  &.hint-adjacent {
    background: rgba(245, 158, 11, 0.05);
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  &.hint-unknown {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.07);
  }
}

.hint-icon {
  font-size: 1.6rem;
  line-height: 1;
  flex-shrink: 0;
}

.hint-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 4px;
}

.hint-body {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;

  strong { color: rgba(255,255,255,0.85); }
}

.inline-link {
  color: #818cf8;
  text-decoration: none;
  &:hover { text-decoration: underline; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-results-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.slide-results-enter-from { opacity: 0; transform: translateY(8px); }
</style>
