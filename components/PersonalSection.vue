<template>
  <div class="personal-gate">
    <div class="gate-line" />
    <button class="gate-btn" @click="revealed = true" v-if="!revealed">
      <span class="gate-icon">🏊</span>
      <span class="gate-label">There's more to me than code</span>
      <v-icon size="18" class="gate-arrow">mdi-chevron-down</v-icon>
    </button>
    <div class="gate-line" />
  </div>

  <Transition name="reveal">
    <section v-if="revealed" id="personal" class="personal-section">
      <div class="water-overlay" />

      <v-container class="personal-container">

        <div class="text-center mb-14">
          <p class="fun-label">LIFE OUTSIDE THE IDE</p>
          <h2 class="fun-title">
            The <span class="cyan-text">other side</span> of me
          </h2>
          <p class="fun-subtitle">
            I close the laptop, dive in the pool — and yes, I'm serious about both.
          </p>
        </div>

        <v-row align="stretch" class="mb-10">

          <v-col cols="12" md="5">
            <div class="story-block">

              <div class="story-hero">
                <img src="/avatar.png" alt="Moataz Maher" class="story-avatar" />
                <div>
                  <div class="story-badge">
                    <v-icon size="20" color="#22d3ee">mdi-swim</v-icon>
                    <span>National Swimmer · Egypt</span>
                  </div>
                  <h3 class="story-heading">From the pool to production</h3>
                </div>
              </div>

              <p class="story-text">
                I was a competitive swimmer on the <strong>Egyptian National Team</strong>. The
                discipline of early-morning training, chasing milliseconds, and trusting teammates
                carries directly into how I write software — focused, deliberate, and always pushing
                the next benchmark.
              </p>
              <p class="story-text">
                Those years in the water weren't just a sport — they shaped who I am. Every sprint,
                every relay, every race is a reminder that consistency beats talent when talent doesn't
                show up.
              </p>

              <div class="story-bottom">

                <div class="brand-card">
                  <div class="brand-header">
                    <div class="brand-logo-wrap">
                      <img src="/piranha-logo.avif" alt="Piranha logo" class="brand-logo" />
                    </div>
                    <div>
                      <h4 class="brand-name">Piranha</h4>
                      <p class="brand-tagline">Swimming brand · Family business</p>
                    </div>
                  </div>
                  <p class="brand-desc">
                    Piranha is a family swimming brand I've been part of — built from a genuine love for
                    the sport. Being involved in growing a brand and building software share the same DNA:
                    vision, iteration, and not being afraid to make waves.
                  </p>
                  <div class="brand-links">
                    <a
                      href="https://piranha-swimming.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="brand-link website"
                    >
                      <v-icon size="15">mdi-web</v-icon>
                      piranha-swimming.com
                    </a>
                    <a
                      href="https://www.facebook.com/PiranhaProSwim"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="brand-link facebook"
                    >
                      <v-icon size="15">mdi-facebook</v-icon>
                      PiranhaProSwim
                    </a>
                  </div>
                </div>

                <div class="edu-achieve">
                  <v-icon size="16" color="#fbbf24">mdi-school</v-icon>
                  <div class="edu-text">
                    <span class="edu-school">Alexandria Language Schools</span>
                    <span class="edu-score">96% · 🥇 1st place, 400m Freestyle</span>
                  </div>
                </div>

                <a
                  href="https://www.facebook.com/motaz.maher.9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-pill"
                >
                  <v-icon size="16">mdi-facebook</v-icon>
                  Yes, I exist outside Intellij 👀
                </a>

              </div>
            </div>
          </v-col>

          <v-col cols="12" md="7">
            <div class="gallery">

              <div class="gallery-row single">
                <div class="gallery-item" @click="lightboxSrc = '/moataz-swimming-2.jpg'">
                  <img
                    src="/moataz-swimming-2.jpg"
                    alt="Moataz Maher — Champion celebration"
                    class="gallery-img contain-img"
                  />
                  <div class="gallery-overlay">
                    <v-icon size="22" color="white">mdi-magnify-plus-outline</v-icon>
                  </div>
                </div>
              </div>

              <div class="gallery-row single">
                <div class="gallery-item" @click="lightboxSrc = '/moataz-swimming-3.jpg'">
                  <img
                    src="/moataz-swimming-3.jpg"
                    alt="Moataz Maher — Butterfly stroke"
                    class="gallery-img pos-top"
                  />
                  <div class="gallery-overlay">
                    <v-icon size="22" color="white">mdi-magnify-plus-outline</v-icon>
                  </div>
                </div>
              </div>

              <div class="gallery-row">
                <div class="gallery-item" @click="lightboxSrc = '/moataz-swimming-4.jpg'">
                  <img
                    src="/moataz-swimming-4.jpg"
                    alt="Moataz Maher — Race start"
                    class="gallery-img"
                  />
                  <div class="gallery-overlay">
                    <v-icon size="22" color="white">mdi-magnify-plus-outline</v-icon>
                  </div>
                </div>
                <div class="gallery-item" @click="lightboxSrc = '/moataz-swimming-5.jpg'">
                  <img
                    src="/moataz-swimming-5.jpg"
                    alt="Moataz Maher — Pool"
                    class="gallery-img"
                  />
                  <div class="gallery-overlay">
                    <v-icon size="22" color="white">mdi-magnify-plus-outline</v-icon>
                  </div>
                </div>
              </div>

            </div>
          </v-col>

        </v-row>

        <div class="fun-footer">
          <p class="fun-footer-text">
            Built with <span class="cyan-text">Spring Boot</span> by day,
            cuts through the water by <span class="cyan-text">dawn</span>.
          </p>
        </div>

      </v-container>
    </section>
  </Transition>

  <Transition name="lightbox-fade">
    <div
      v-if="lightboxSrc"
      class="lightbox-backdrop"
      @click.self="lightboxSrc = null"
    >
      <button class="lightbox-close" @click="lightboxSrc = null" aria-label="Close lightbox">
        <v-icon size="24" color="white">mdi-close</v-icon>
      </button>
      <img :src="lightboxSrc" alt="Gallery image enlarged" class="lightbox-img" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const revealed = ref(false)
const lightboxSrc = ref<string | null>(null)
</script>

<style scoped lang="scss">
.personal-gate {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  max-width: 640px;
  margin: 0 auto;
}

.gate-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.25), transparent);
}

.gate-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(8, 145, 178, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.3);
  border-radius: 50px;
  padding: 12px 22px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s;
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(8, 145, 178, 0.18);
    border-color: rgba(34, 211, 238, 0.7);
    color: #22d3ee;
    transform: translateY(-2px);
  }

  .gate-icon { font-size: 1.1rem; }

  .gate-arrow {
    animation: bounce-y 1.8s ease-in-out infinite;
  }
}

@keyframes bounce-y {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(4px); }
}

.personal-section {
  position: relative;
  background: linear-gradient(180deg, #050f1a 0%, #071422 30%, #061220 70%, #040c18 100%);
  overflow: hidden;
  padding: 80px 0 60px;
}

.water-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 40% at 20% 0%, rgba(8, 145, 178, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 50% 50%, rgba(34, 211, 238, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

.personal-container {
  position: relative;
  z-index: 1;
}

.fun-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #22d3ee;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.fun-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #e5e5e5;
  margin-bottom: 1rem;
  line-height: 1.15;
}

.cyan-text {
  background: linear-gradient(135deg, #22d3ee, #0891b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fun-subtitle {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

// Left column: flex column so story-bottom can push to the bottom
.story-block {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 2rem;

  @media (max-width: 960px) {
    padding-right: 0;
    height: auto;
    margin-bottom: 2rem;
  }
}

.story-hero {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.story-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.45);
  flex-shrink: 0;
}

.story-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.25);
  border-radius: 50px;
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #67e8f9;
  margin-bottom: 0.6rem;
}

.story-heading {
  font-size: 1.3rem;
  font-weight: 700;
  color: #e5e5e5;
  line-height: 1.3;
}

.story-text {
  font-size: 0.95rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.62);
  margin-bottom: 1rem;

  strong { color: rgba(255, 255, 255, 0.9); }
}

// Pushed to bottom of left column — aligns with last gallery row
.story-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 0.5rem;
}

.brand-card {
  background: rgba(8, 145, 178, 0.07);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
}

.brand-logo-wrap {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: transparent;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  filter: brightness(1.1);
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #22d3ee;
  margin-bottom: 2px;
}

.brand-tagline {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
}

.brand-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.85rem;
}

.brand-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;

  &.website {
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid rgba(34, 211, 238, 0.3);
    color: #67e8f9;
    &:hover { background: rgba(34, 211, 238, 0.2); border-color: #22d3ee; }
  }

  &.facebook {
    background: rgba(24, 119, 242, 0.1);
    border: 1px solid rgba(24, 119, 242, 0.3);
    color: #93c5fd;
    &:hover { background: rgba(24, 119, 242, 0.2); border-color: rgba(24, 119, 242, 0.6); }
  }
}

.edu-achieve {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(251, 191, 36, 0.06);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 12px;
  padding: 8px 14px;
}

.edu-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.4;
}

.edu-school {
  font-size: 0.83rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.edu-score {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.5);
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(24, 119, 242, 0.08);
  border: 1px solid rgba(24, 119, 242, 0.25);
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #93c5fd;
  text-decoration: none;
  transition: all 0.2s;
  align-self: flex-start;

  &:hover {
    background: rgba(24, 119, 242, 0.18);
    border-color: rgba(24, 119, 242, 0.5);
  }
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.gallery-row {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  &.single { grid-template-columns: 1fr; }
}

.gallery-item {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(34, 211, 238, 0.18);
  background: rgba(8, 145, 178, 0.07);
  cursor: pointer;

  .gallery-row.single > & { height: 260px; }
  .gallery-row:not(.single) > & { height: 210px; }

  @media (max-width: 960px) {
    .gallery-row.single > & { height: 210px; }
    .gallery-row:not(.single) > & { height: 170px; }
  }

  @media (max-width: 600px) {
    .gallery-row.single > & { height: 170px; }
    .gallery-row:not(.single) > & { height: 140px; }
  }

  &:hover .gallery-overlay { opacity: 1; }
  &:hover .gallery-img { transform: scale(1.04); }
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.4s ease;

  &.pos-top    { object-position: center 25%; }
  &.contain-img { object-fit: contain; }
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
  }
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  user-select: none;
  pointer-events: none;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active { transition: opacity 0.25s ease; }
.lightbox-fade-enter-from,
.lightbox-fade-leave-to { opacity: 0; }

.fun-footer {
  text-align: center;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(34, 211, 238, 0.1);
}

.fun-footer-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.35);
  font-style: italic;
}

.reveal-enter-active {
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
</style>
