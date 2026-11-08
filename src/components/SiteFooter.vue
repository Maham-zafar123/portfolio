<script setup>
import { navLinks, profile } from '../data/portfolio'
import { paletteOpen, modKey } from '../composables/usePalette'
import BrandLogo from './BrandLogo.vue'

const year = new Date().getFullYear()
const socials = [
  { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: profile.linkedin, icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope', label: 'Email' },
]
</script>

<template>
  <footer class="relative isolate overflow-hidden border-t border-line bg-surface">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-40 left-1/2 h-80 w-[48rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
      <div class="dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)] opacity-60" />
    </div>

    <div class="container-x">
      <!-- CTA band -->
      <div class="flex flex-col items-start justify-between gap-6 border-b border-line py-12 sm:py-14 md:flex-row md:items-center">
        <div>
          <p class="font-mono text-xs text-accent-ink">// what's next?</p>
          <h2 class="mt-2 text-3xl font-semibold tracking-tighter text-fg sm:text-4xl">
            Have a project or role in mind? <span class="text-gradient">Let's talk.</span>
          </h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="#contact" class="btn-accent group">
            Get in touch <i class="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" />
          </a>
          <a :href="profile.resume" download class="btn-outline"><i class="fa-solid fa-download" /> CV</a>
        </div>
      </div>

      <!-- Columns -->
      <div class="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#top" aria-label="Maham Zafar, back to top">
            <BrandLogo height="h-14" />
          </a>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Software &amp; AI Engineer building LLM, RAG and agentic systems, and the full-stack apps around them.
          </p>
          <div class="mt-5 flex gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noopener"
              class="grid size-10 place-items-center rounded-xl border border-line bg-bg/60 text-muted transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-ink"
            >
              <i :class="s.icon" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 class="font-mono text-[11px] tracking-widest text-subtle uppercase">Navigate</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="l in navLinks" :key="l.id">
              <a :href="`#${l.id}`" class="group inline-flex items-center gap-2 text-muted transition hover:text-fg">
                <span class="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />{{ l.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 class="font-mono text-[11px] tracking-widest text-subtle uppercase">Resources</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a :href="profile.resume" download class="text-muted transition hover:text-fg">Download CV</a></li>
            <li><a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noopener" class="text-muted transition hover:text-fg">GitHub repositories</a></li>
            <li><a :href="profile.linkedin" target="_blank" rel="noopener" class="text-muted transition hover:text-fg">LinkedIn profile</a></li>
            <li>
              <button type="button" class="inline-flex items-center gap-1.5 text-muted transition hover:text-fg" @click="paletteOpen = true">
                Quick search <kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-mono text-[11px] tracking-widest text-subtle uppercase">Contact</h3>
          <ul class="mt-4 space-y-3 text-sm">
            <li>
              <a :href="`mailto:${profile.email}`" class="flex items-center gap-2.5 break-all text-muted transition hover:text-fg">
                <i class="fa-regular fa-envelope w-4 text-accent-ink" /> {{ profile.email }}
              </a>
            </li>
            <li class="flex items-center gap-2.5 text-muted"><i class="fa-solid fa-location-dot w-4 text-accent-ink" /> {{ profile.location }}</li>
            <li class="flex items-center gap-2.5 text-muted">
              <span class="relative flex w-4 justify-center">
                <span class="absolute size-2 animate-ping-slow rounded-full bg-emerald-400" />
                <span class="relative size-2 rounded-full bg-emerald-400" />
              </span>
              Available for new opportunities
            </li>
          </ul>
        </div>
      </div>

      <!-- Wordmark -->
      <p
        aria-hidden="true"
        class="bg-linear-to-b from-fg/15 to-fg/[0.02] bg-clip-text text-center text-[15vw] leading-[0.85] font-semibold tracking-tighter whitespace-nowrap text-transparent select-none lg:text-[10.5rem]"
      >
        maham zafar
      </p>

      <!-- Bottom bar -->
      <div class="border-t border-line py-6 text-center font-mono text-[11px] text-subtle">
        <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
