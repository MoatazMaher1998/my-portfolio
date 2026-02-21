<template>
  <div class="portfolio">
    <NavHeader />
    <SearchPalette />

    <main>
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <PersonalSection />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Moataz Maher | Full Stack Engineer',
  meta: [
    { name: 'description', content: 'Full Stack Engineer with 3+ years of experience building scalable systems. Expert in Java Spring Boot, Angular, Nuxt.js, and cloud deployment.' }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>',
    }
  ]
})
</script>

<style scoped>
.portfolio {
  min-height: 100vh;
}

main {
  position: relative;
  z-index: 1;
}
</style>
