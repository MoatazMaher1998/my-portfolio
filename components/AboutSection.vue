<template>
  <section id="about" class="section about-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <div class="text-center mb-12">
            <p class="section-label">ABOUT ME</p>
            <h2 class="section-title">
              Passionate about building
              <span class="gradient-text">impactful software</span>
            </h2>
          </div>

          <v-row align="center" :class="{ 'flex-column-reverse': $vuetify.display.smAndDown }">
            <v-col cols="12" md="7">
              <div class="about-content">
                <p class="about-text">
                  I'm a <strong>Full Stack Engineer</strong> based in Alexandria, Egypt, with 3+ years of
                  experience building production-grade systems across enterprise and startup environments.
                  I work across the full stack — from Angular and Nuxt.js frontends to Java Spring Boot
                  backends, cloud deployment, and real-time data pipelines.
                </p>

                <p class="about-text">
                  At <strong>Novomind</strong>, I've contributed across four teams — AI Platform, AI-HUB,
                  iMarket, and iAgent — integrating AI providers (Gemini, OpenAI, DeepL), building marketplace
                  connections with Amazon, eBay, Otto and more, and cutting CI/CD release time by
                  <strong>75%</strong>.
                </p>

                <p class="about-text">
                  Outside my full-time role I've independently built <strong>EatsAndBeats</strong> and
                  <strong>SkillSouq</strong> from the ground up — complete systems with payments, video
                  sessions, CDN integration, and cloud deployment. I'm currently pursuing the
                  <strong>AWS Solutions Architect Associate (SAA-C03)</strong> certification to deepen
                  my cloud architecture expertise.
                </p>

                <div class="quick-facts">
                  <div class="fact">
                    <v-icon color="primary" size="20">mdi-map-marker</v-icon>
                    <span>Alexandria, Egypt</span>
                  </div>
                  <div class="fact">
                    <v-icon color="primary" size="20">mdi-school</v-icon>
                    <span>BSc Computer Engineering</span>
                  </div>
                  <div class="fact">
                    <v-icon color="primary" size="20">mdi-translate</v-icon>
                    <span>Arabic & English</span>
                  </div>
                </div>

                <v-btn
                  color="primary"
                  variant="outlined"
                  size="large"
                  class="mt-6"
                  href="/Moataz_Maher_Mid_Level_Full_Stack_Stack.pdf"
                  download
                >
                  <v-icon start>mdi-download</v-icon>
                  Download Resume
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="5">
              <div class="profile-card gradient-border glow">
                <div class="profile-inner">
                  <div class="profile-avatar">
                    <v-icon size="80" color="primary">mdi-account-circle</v-icon>
                  </div>
                  <h3 class="profile-name">Moataz Maher Farhoud</h3>
                  <p class="profile-title">Full Stack Engineer</p>
                  <p class="profile-company">@ Novomind</p>

                  <v-divider class="my-4" />

                  <div class="profile-stats">
                    <div class="profile-stat">
                      <span class="stat-value">3+</span>
                      <span class="stat-label">Years Exp</span>
                    </div>
                    <div class="profile-stat">
                      <span class="stat-value">4</span>
                      <span class="stat-label">Teams</span>
                    </div>
                    <div class="profile-stat">
                      <span class="stat-value">2</span>
                      <span class="stat-label">Startups</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.about-section {
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.03) 50%, transparent 100%);
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.about-content {
  padding-right: 2rem;

  @media (max-width: 960px) {
    padding-right: 0;
    margin-top: 2rem;
  }
}

.about-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;

  strong {
    color: rgba(255, 255, 255, 0.95);
  }
}

.quick-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;

  .fact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
  }
}

.profile-card {
  padding: 2rem;
  text-align: center;

  @media (max-width: 960px) {
    max-width: 350px;
    margin: 0 auto;
  }
}

.profile-inner {
  position: relative;
  z-index: 1;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.profile-title {
  font-size: 1rem;
  color: #a5b4fc;
  margin-bottom: 0.25rem;
}

.profile-company {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

.profile-stats {
  display: flex;
  justify-content: space-around;

  .profile-stat {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #6366f1;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
