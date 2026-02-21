<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="isOpen"
        class="palette-backdrop"
        @click.self="isOpen = false"
        @keydown.esc="isOpen = false"
      >
        <div class="palette-modal" role="dialog" aria-modal="true" aria-label="Skill search">

          <div class="palette-header">
            <v-icon size="20" class="palette-icon">mdi-magnify</v-icon>
            <input
              ref="inputRef"
              v-model="query"
              class="palette-input"
              placeholder="Search my stack — Angular, Docker, Stripe…"
              autocomplete="off"
              spellcheck="false"
            />
            <button class="palette-esc" @click="isOpen = false">ESC</button>
          </div>

          <div class="palette-body">
            <Transition name="fade" mode="out-in">

              <div v-if="!trimmed" class="palette-idle">
                <p class="palette-idle-label">Quick picks</p>
                <div class="palette-pills">
                  <button
                    v-for="s in quickSuggestions"
                    :key="s"
                    class="palette-pill"
                    @click="query = s"
                  >{{ s }}</button>
                </div>
              </div>

              <div v-else-if="results.length" class="palette-results">
                <div
                  v-for="skill in results"
                  :key="skill.name"
                  class="palette-result"
                >
                  <div class="palette-result-head">
                    <span class="palette-result-name">{{ skill.name }}</span>
                    <span class="palette-result-cat" :class="skill.catClass">{{ skill.category }}</span>
                    <v-icon size="14" class="palette-check">mdi-check-circle</v-icon>
                  </div>
                  <div class="palette-ctx-row">
                    <a
                      v-for="ctx in skill.contexts"
                      :key="ctx.label"
                      :href="ctx.section"
                      class="palette-ctx"
                      :class="`ctx-${ctx.type}`"
                      @click="isOpen = false"
                    >
                      <v-icon size="11">{{ ctx.icon }}</v-icon>
                      {{ ctx.label }}
                    </a>
                  </div>
                </div>
              </div>

              <div v-else class="palette-not-found">
                <span class="palette-nf-icon">🤷</span>
                <p class="palette-nf-title">"{{ query.trim() }}" isn't in my stack yet</p>
                <p class="palette-nf-sub">But it might be worth exploring together 👀</p>
              </div>

            </Transition>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen } = useSearchPalette()
const { query } = useSkillQuery()
const inputRef = ref<HTMLInputElement>()

const trimmed = computed(() => query.value.trim().toLowerCase())

watch(isOpen, (val) => {
  if (val) {
    nextTick(() => inputRef.value?.focus())
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

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
  { name: 'Angular', aliases: ['angular', 'ng', 'angular 16', 'angular 19', 'angular16', 'angular19'], category: 'Frontend', catClass: 'cat-frontend', contexts: [
    { type: 'team', label: 'iMarket @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'iMarket', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Nuxt.js', aliases: ['nuxt', 'nuxtjs', 'nuxt.js', 'nuxt3', 'nuxt 3'], category: 'Frontend', catClass: 'cat-frontend', contexts: [
    { type: 'team', label: 'AI-HUB @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'AI-HUB', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Vue.js', aliases: ['vue', 'vuejs', 'vue.js', 'vue3', 'vue 3'], category: 'Frontend', catClass: 'cat-frontend', contexts: [
    { type: 'team', label: 'iAgent @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'TypeScript', aliases: ['typescript', 'ts'], category: 'Frontend', catClass: 'cat-frontend', contexts: [
    { type: 'team', label: 'iMarket & AI-HUB', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Java', aliases: ['java', 'jdk', 'jvm'], category: 'Backend', catClass: 'cat-backend', contexts: [
    { type: 'team', label: 'All Novomind Teams', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Spring Boot', aliases: ['spring', 'spring boot', 'springboot', 'spring framework'], category: 'Backend', catClass: 'cat-backend', contexts: [
    { type: 'team', label: 'AI-HUB, iMarket, iAgent', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'All backend projects', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Spring WebFlux', aliases: ['webflux', 'spring webflux', 'reactive', 'reactor'], category: 'Backend', catClass: 'cat-backend', contexts: [
    { type: 'team', label: 'AI Platform @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'AI Platform', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'PostgreSQL', aliases: ['postgresql', 'postgres', 'psql', 'sql'], category: 'Database', catClass: 'cat-database', contexts: [
    { type: 'team', label: 'AI Platform @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'SkillSouq, Sigma, AI Platform', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Docker', aliases: ['docker', 'container', 'containers', 'dockerfile'], category: 'Cloud / DevOps', catClass: 'cat-cloud', contexts: [
    { type: 'team', label: 'iAgent, EatsAndBeats, SkillSouq', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'Multiple projects', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'AWS EC2', aliases: ['aws', 'amazon web services', 'ec2', 's3', 'cloud'], category: 'Cloud / DevOps', catClass: 'cat-cloud', contexts: [
    { type: 'project', label: 'EatsAndBeats', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'GitLab CI/CD', aliases: ['gitlab', 'ci/cd', 'cicd', 'pipeline'], category: 'Cloud / DevOps', catClass: 'cat-cloud', contexts: [
    { type: 'team', label: 'AI-HUB & iMarket @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Stripe', aliases: ['stripe', 'payment', 'payments', 'billing'], category: 'Integrations', catClass: 'cat-integration', contexts: [
    { type: 'project', label: 'SkillSouq', section: '#projects', icon: 'mdi-briefcase-outline' },
  ]},
  { name: 'Daily.co', aliases: ['daily', 'daily.co', 'video call', 'webrtc', 'video'], category: 'Integrations', catClass: 'cat-integration', contexts: [
    { type: 'project', label: 'EatsAndBeats', section: '#projects', icon: 'mdi-briefcase-outline' },
  ]},
  { name: 'AI APIs', aliases: ['ai', 'gemini', 'openai', 'gpt', 'llm', 'machine learning', 'ml'], category: 'AI', catClass: 'cat-integration', contexts: [
    { type: 'team', label: 'AI-HUB @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'project', label: 'AI-HUB Platform', section: '#projects', icon: 'mdi-briefcase-outline' },
  ]},
  { name: 'Elasticsearch', aliases: ['elasticsearch', 'elastic', 'elk', 'full-text search'], category: 'Database', catClass: 'cat-database', contexts: [
    { type: 'project', label: 'EatsAndBeats', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Flyway', aliases: ['flyway', 'db migration', 'database migration'], category: 'Database', catClass: 'cat-database', contexts: [
    { type: 'project', label: 'SkillSouq, Sigma WMS', section: '#projects', icon: 'mdi-briefcase-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'Brevo', aliases: ['brevo', 'sendinblue', 'email', 'smtp'], category: 'Integrations', catClass: 'cat-integration', contexts: [
    { type: 'project', label: 'SkillSouq', section: '#projects', icon: 'mdi-briefcase-outline' },
  ]},
  { name: 'Bunny.net', aliases: ['bunny', 'bunny.net', 'cdn', 'file storage'], category: 'Integrations', catClass: 'cat-integration', contexts: [
    { type: 'project', label: 'SkillSouq', section: '#projects', icon: 'mdi-briefcase-outline' },
  ]},
  { name: 'Apache Superset', aliases: ['superset', 'apache superset', 'analytics', 'bi', 'business intelligence'], category: 'Analytics', catClass: 'cat-database', contexts: [
    { type: 'team', label: 'AI Platform @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
  { name: 'JUnit / Mockito', aliases: ['junit', 'mockito', 'unit test', 'testing', 'jacoco'], category: 'Testing', catClass: 'cat-testing', contexts: [
    { type: 'team', label: 'AI Platform @ Novomind', section: '#experience', icon: 'mdi-account-group-outline' },
    { type: 'tech', label: 'Tech Stack', section: '#tech', icon: 'mdi-chip' },
  ]},
]

const results = computed<Skill[]>(() => {
  if (!trimmed.value) return []
  return skills.filter(s =>
    s.aliases.some(a => a.includes(trimmed.value) || trimmed.value.includes(a))
  )
})

const quickSuggestions = ['Angular', 'Nuxt.js', 'Spring Boot', 'Docker', 'PostgreSQL', 'Stripe', 'AI APIs']
</script>

<style scoped lang="scss">
.palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}

.palette-modal {
  width: 100%;
  max-width: 620px;
  margin: 0 1rem;
  background: rgba(14, 14, 28, 0.97);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 18px;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.1);
  overflow: hidden;
}

.palette-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.palette-icon {
  color: rgba(99, 102, 241, 0.6);
  flex-shrink: 0;
}

.palette-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1.05rem;
  color: #e5e5e5;
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
    font-style: italic;
  }
}

.palette-esc {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
  transition: background 0.15s;
  flex-shrink: 0;

  &:hover { background: rgba(255, 255, 255, 0.1); }
}

.palette-body {
  padding: 16px 20px;
  max-height: 55vh;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.3); border-radius: 2px; }
}

.palette-idle-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.palette-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.palette-pill {
  padding: 5px 14px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: rgba(99, 102, 241, 0.18);
    border-color: rgba(99, 102, 241, 0.5);
    color: #a5b4fc;
  }
}

.palette-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.palette-result {
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: rgba(99, 102, 241, 0.08);
    border-color: rgba(99, 102, 241, 0.2);
  }
}

.palette-result-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.palette-result-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #e5e5e5;
}

.palette-check {
  color: #22c55e;
  opacity: 0.8;
  margin-left: auto;
  flex-shrink: 0;
}

.palette-result-cat {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.cat-frontend   { background: rgba(59,130,246,0.15);  color: #93c5fd; border: 1px solid rgba(59,130,246,0.2); }
  &.cat-backend    { background: rgba(34,197,94,0.12);   color: #86efac; border: 1px solid rgba(34,197,94,0.2); }
  &.cat-cloud      { background: rgba(168,85,247,0.12);  color: #d8b4fe; border: 1px solid rgba(168,85,247,0.2); }
  &.cat-database   { background: rgba(245,158,11,0.12);  color: #fcd34d; border: 1px solid rgba(245,158,11,0.2); }
  &.cat-testing    { background: rgba(236,72,153,0.12);  color: #f9a8d4; border: 1px solid rgba(236,72,153,0.2); }
  &.cat-integration{ background: rgba(34,211,238,0.12);  color: #67e8f9; border: 1px solid rgba(34,211,238,0.2); }
}

.palette-ctx-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.palette-ctx {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s;

  &.ctx-team    { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.22); color: #a5b4fc; &:hover { background: rgba(99,102,241,0.2); } }
  &.ctx-project { background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2);   color: #86efac; &:hover { background: rgba(34,197,94,0.16); } }
  &.ctx-tech    { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.18); color: #fcd34d; &:hover { background: rgba(245,158,11,0.15); } }
}

.palette-not-found {
  text-align: center;
  padding: 2rem 1rem;
}

.palette-nf-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.palette-nf-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 4px;
}

.palette-nf-sub {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
}

.palette-enter-active,
.palette-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.palette-enter-from,
.palette-leave-to { opacity: 0; transform: scale(0.97) translateY(-8px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
