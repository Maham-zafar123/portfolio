<script setup>
import { navLinks, profile } from '../data/portfolio'
import { modKey, paletteOpen } from '../composables/usePalette'
import BrandLogo from './BrandLogo.vue'

const year = new Date().getFullYear()
const socials = [
  { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: profile.linkedin, icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope', label: 'Email' },
]
</script>

<template>
  <footer class="relative px-3 pb-28 sm:px-5 sm:pb-32">
    <div class="glass mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
      <div class="grid gap-10 p-8 sm:p-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" aria-label="Back to top"><BrandLogo /></a>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            AI Engineer &amp; Full-Stack Developer building LLM, RAG and agentic systems, and the web apps that ship them.
          </p>
          <div class="mt-6 flex gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              v-magnetic="0.4"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noopener"
              class="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
            >
              <i :class="s.icon" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p class="eyebrow">Navigate</p>
          <ul class="mt-4 grid grid-cols-2 gap-2.5 text-sm">
            <li v-for="l in navLinks" :key="l.id">
              <a :href="`#${l.id}`" class="group inline-flex items-center gap-2 text-muted transition hover:text-fg">
                <span class="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />{{ l.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="eyebrow">Shortcuts</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a :href="profile.resume" download class="text-muted transition hover:text-fg">Download resume</a></li>
            <li><a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noopener" class="text-muted transition hover:text-fg">GitHub repositories</a></li>
            <li>
              <button type="button" class="inline-flex items-center gap-1.5 text-muted transition hover:text-fg" @click="paletteOpen = true">
                Command menu <kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Wordmark -->
      <p
        aria-hidden="true"
        class="-mb-[0.18em] bg-linear-to-b from-fg/25 to-transparent bg-clip-text px-4 text-center font-display text-[16vw] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent select-none lg:text-[13rem]"
      >
        maham zafar
      </p>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-8 py-5 font-mono text-[11px] text-subtle sm:px-12">
        <p>© {{ year }} {{ profile.name }}</p>
        <a href="#top" class="inline-flex items-center gap-2 transition hover:text-fg">Back to top <i class="fa-solid fa-arrow-up" /></a>
      </div>
    </div>
  </footer>
</template>
