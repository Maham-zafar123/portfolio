<script setup>
import { computed } from 'vue'
import { navLinks } from './data/portfolio'
import { useScroll } from './composables/useScroll'
import NavBar from './components/NavBar.vue'
import CommandPalette from './components/CommandPalette.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { scrollY, progress, activeId } = useScroll(navLinks.map((l) => l.id))
const ring = 2 * Math.PI * 20
const ringOffset = computed(() => ring * (1 - progress.value))
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
    :style="{ transform: `scaleX(${progress})` }"
  />

  <NavBar :scrolled="scrollY > 16" :active-id="activeId" />
  <CommandPalette />

  <main class="overflow-x-clip">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <EducationSection />
    <ContactSection />
  </main>

  <SiteFooter />

  <!-- Back to top with scroll-progress ring -->
  <Transition name="slide-down">
    <a
      v-if="scrollY > 600"
      href="#top"
      aria-label="Back to top"
      class="group fixed right-5 bottom-5 z-50 grid size-12 place-items-center rounded-full border border-line bg-surface/80 text-fg backdrop-blur-xl transition hover:-translate-y-1"
    >
      <svg class="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" :stroke-dasharray="ring" :stroke-dashoffset="ringOffset" />
      </svg>
      <i class="fa-solid fa-arrow-up text-sm transition-transform group-hover:-translate-y-0.5" />
    </a>
  </Transition>
</template>
