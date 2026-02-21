<template>
  <section id="contact" class="section contact-section">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <div class="text-center mb-12">
            <p class="section-label">CONTACT</p>
            <h2 class="section-title">
              Let's work
              <span class="gradient-text">together</span>
            </h2>
            <p class="section-subtitle">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </div>

          <v-row>
            <v-col cols="12" md="5">
              <div class="contact-info">
                <h3 class="info-title">Get in touch</h3>
                <p class="info-text">
                  I'm currently open to new opportunities and interesting projects.
                  Feel free to reach out through any of the channels below.
                </p>

                <div class="contact-items">
                  <a href="mailto:moatazmaher1998@gmail.com" class="contact-item">
                    <div class="item-icon">
                      <v-icon color="primary">mdi-email-outline</v-icon>
                    </div>
                    <div class="item-content">
                      <span class="item-label">Email</span>
                      <span class="item-value">moatazmaher1998@gmail.com</span>
                    </div>
                  </a>

                  <a href="tel:+201024502646" class="contact-item">
                    <div class="item-icon">
                      <v-icon color="primary">mdi-phone-outline</v-icon>
                    </div>
                    <div class="item-content">
                      <span class="item-label">Phone</span>
                      <span class="item-value">+20 102 450 2646</span>
                    </div>
                  </a>

                  <div class="contact-item">
                    <div class="item-icon">
                      <v-icon color="primary">mdi-map-marker-outline</v-icon>
                    </div>
                    <div class="item-content">
                      <span class="item-label">Location</span>
                      <span class="item-value">Alexandria, Egypt</span>
                    </div>
                  </div>
                </div>

                <div class="social-links">
                  <v-btn
                    icon
                    variant="outlined"
                    size="large"
                    href="https://github.com/MoatazMaher1998"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn"
                    aria-label="GitHub"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    variant="outlined"
                    size="large"
                    href="https://www.linkedin.com/in/moataz-maher-58a2b8146/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn"
                    aria-label="LinkedIn"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    variant="outlined"
                    size="large"
                    href="mailto:moatazmaher1998@gmail.com"
                    class="social-btn"
                    aria-label="Email"
                  >
                    <v-icon>mdi-email-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="7">
              <div class="contact-form-wrapper gradient-border">
                <form @submit.prevent="submitForm" class="contact-form">
                  <v-text-field
                    v-model="form.name"
                    label="Your Name"
                    variant="outlined"
                    density="comfortable"
                    required
                    class="mb-2"
                  />

                  <v-text-field
                    v-model="form.email"
                    label="Your Email"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    required
                    class="mb-2"
                  />

                  <v-text-field
                    v-model="form.subject"
                    label="Subject"
                    variant="outlined"
                    density="comfortable"
                    required
                    class="mb-2"
                  />

                  <v-textarea
                    v-model="form.message"
                    label="Your Message"
                    variant="outlined"
                    density="comfortable"
                    rows="5"
                    required
                    class="mb-4"
                  />

                  <p class="form-note">
                    <v-icon size="14">mdi-information-outline</v-icon>
                    Clicking below opens your email client with this message pre-filled.
                  </p>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="isSubmitting"
                  >
                    <v-icon start>mdi-email-fast-outline</v-icon>
                    Open Email Client
                  </v-btn>
                </form>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <footer class="footer">
      <v-container>
        <div class="footer-content">
          <p class="footer-text">
            Designed & Built by <span class="gradient-text">Moataz Maher</span>
          </p>
          <p class="footer-year">© {{ currentYear }} All rights reserved.</p>
        </div>
      </v-container>
    </footer>
  </section>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const submitForm = () => {
  const mailtoLink = `mailto:moatazmaher1998@gmail.com?subject=${encodeURIComponent(form.value.subject)}&body=${encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`)}`
  window.open(mailtoLink)
}
</script>

<style scoped lang="scss">
.contact-section {
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.05) 100%);
  padding-bottom: 0;
}

.section-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.contact-info {
  padding-right: 2rem;

  @media (max-width: 960px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.info-text {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.item-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 12px;

  :deep(.v-icon) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.item-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.social-links {
  display: flex;
  gap: 1rem;

  .social-btn {
    border-color: rgba(255, 255, 255, 0.2);

    &:hover {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }
  }
}

.contact-form-wrapper {
  padding: 2rem;
  background: rgba(18, 18, 18, 0.8);
}

.contact-form {
  :deep(.v-field) {
    background: rgba(255, 255, 255, 0.03);
  }

  :deep(.v-field--focused) {
    background: rgba(99, 102, 241, 0.05);
  }
}

.form-note {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1;

  :deep(.v-icon) {
    flex-shrink: 0;
    // Vertically center the icon relative to the text baseline
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
}

.footer {
  margin-top: 80px;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  text-align: center;
}

.footer-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.footer-year {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
}
</style>
