<script setup>
import { navLinks } from './data/portfolio'
import { useScroll } from './composables/useScroll'
import Preloader from './components/Preloader.vue'
import CustomCursor from './components/CustomCursor.vue'
import BackdropScene from './components/BackdropScene.vue'
import NavBar from './components/NavBar.vue'
import DockNav from './components/DockNav.vue'
import CommandPalette from './components/CommandPalette.vue'
import HeroSection from './components/HeroSection.vue'
import ExpertiseSection from './components/ExpertiseSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { scrollY, progress, activeId } = useScroll(navLinks.map((l) => l.id))
</script>

<template>
  <Preloader />
  <CustomCursor />
  <BackdropScene />

  <NavBar :scrolled="scrollY > 24" />
  <DockNav :active-id="activeId" :progress="progress" />
  <CommandPalette />

  <main>
    <HeroSection />
    <ExpertiseSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <EducationSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
