<template>
  <v-app-bar
    :elevation="scrolled ? 2 : 0"
    :class="{ 'nav-scrolled': scrolled }"
    class="nav-header"
    fixed
  >
    <v-container class="d-flex align-center">
      <v-spacer />

      <!-- Desktop Navigation -->
      <nav class="nav-links d-none d-md-flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ 'active': activeSection === link.id }"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Search Button -->
      <button class="nav-search-btn ml-4" @click="paletteOpen = true" aria-label="Search skills">
        <v-icon size="16">mdi-magnify</v-icon>
        <span class="nav-search-label d-none d-md-inline">Search skills</span>
        <span class="nav-search-kbd d-none d-md-inline">⌘K</span>
      </button>

      <!-- CTA Button -->
      <v-btn
        color="primary"
        variant="flat"
        size="small"
        href="#contact"
        class="nav-cta d-none d-md-flex ml-4"
      >
        Get In Touch
      </v-btn>

      <!-- Mobile Menu Button -->
      <v-btn
        icon
        variant="text"
        class="d-md-none"
        @click="mobileMenu = !mobileMenu"
        aria-label="Toggle menu"
      >
        <v-icon>{{ mobileMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-btn>
    </v-container>

    <!-- Mobile Navigation -->
    <v-expand-transition>
      <div v-if="mobileMenu" class="mobile-nav d-md-none">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-nav-link"
          @click="mobileMenu = false"
        >
          {{ link.label }}
        </a>
        <v-btn
          color="primary"
          block
          href="#contact"
          class="mt-4"
          @click="mobileMenu = false"
        >
          Get In Touch
        </v-btn>
      </div>
    </v-expand-transition>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { isOpen: paletteOpen } = useSearchPalette()

const navLinks = [
  { id: 'about', href: '#about', label: 'About' },
  { id: 'tech', href: '#tech', label: 'Tech Stack' },
  { id: 'experience', href: '#experience', label: 'Experience' },
  { id: 'projects', href: '#projects', label: 'Projects' },
]

const scrolled = ref(false)
const mobileMenu = ref(false)
const activeSection = ref('')

const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  const sections = navLinks.map(link => link.id)
  for (const section of sections.reverse()) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 150) {
        activeSection.value = section
        break
      }
    }
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    paletteOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.nav-header {
  background: transparent !important;
  transition: all 0.3s ease;

  &.nav-scrolled {
    background: rgba(10, 10, 10, 0.9) !important;
    backdrop-filter: blur(10px);
  }

  :deep(.v-toolbar__content) {
    padding: 0;
  }
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }
}

.nav-search-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(99, 102, 241, 0.12);
    border-color: rgba(99, 102, 241, 0.4);
    color: rgba(255, 255, 255, 0.85);
  }
}

.nav-search-label {
  font-size: 0.8rem;
}

.nav-search-kbd {
  font-size: 0.7rem;
  padding: 1px 5px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.4);
}

.nav-cta {
  text-transform: none;
  font-weight: 600;
}

.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link {
  display: block;
  padding: 1rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
}
</style>
