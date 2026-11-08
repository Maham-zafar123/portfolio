<script setup>
import { ref, watch } from 'vue'
import { navLinks, profile } from '../data/portfolio'
import { useTheme } from '../composables/useTheme'
import { modKey, paletteOpen } from '../composables/usePalette'
import BrandLogo from './BrandLogo.vue'

defineProps({ scrolled: Boolean, activeId: String })
const { isDark, toggle } = useTheme()
const open = ref(false)

watch(open, (v) => document.body.classList.toggle('overflow-hidden', v))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
    :class="scrolled || open ? 'border-line/80 bg-bg/75 backdrop-blur-xl' : 'border-transparent'"
  >
    <nav
      class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 lg:px-8"
      :class="scrolled || open ? 'h-16 sm:h-[4.5rem]' : 'h-20 sm:h-24'"
    >
      <a href="#top" aria-label="Maham Zafar, back to top" class="shrink-0" @click="open = false">
        <BrandLogo :height="scrolled || open ? 'h-11 sm:h-12' : 'h-12 sm:h-[3.75rem] lg:h-12 xl:h-[3.75rem]'" />
      </a>

      <ul class="hidden items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1 shadow-sm shadow-black/5 backdrop-blur lg:flex">
        <li v-for="(link, i) in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="flex items-center gap-1.5 rounded-full px-2.5 py-2 font-mono text-[13px] transition-colors duration-300 xl:px-4"
            :class="activeId === link.id ? 'bg-fg text-bg' : 'text-muted hover:text-fg'"
          >
            <span class="hidden opacity-50 2xl:inline">0{{ i + 1 }}</span>{{ link.label.toLowerCase() }}
          </a>
        </li>
      </ul>

      <div class="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          class="hidden items-center gap-2 rounded-full border border-line bg-surface/60 py-2 pr-2 pl-3.5 text-xs text-muted transition hover:border-fg/30 hover:text-fg 2xl:flex"
          @click="paletteOpen = true"
        >
          <i class="fa-solid fa-magnifying-glass text-[11px]" /> Search
          <span class="flex gap-0.5"><kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd></span>
        </button>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg 2xl:hidden"
          aria-label="Open command palette"
          @click="paletteOpen = true"
        >
          <i class="fa-solid fa-magnifying-glass text-sm" />
        </button>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-fg"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <Transition name="fade" mode="out-in">
            <i v-if="isDark" key="sun" class="fa-regular fa-sun" />
            <i v-else key="moon" class="fa-regular fa-moon" />
          </Transition>
        </button>
        <a :href="profile.resume" download class="btn-accent ml-1.5 hidden !px-5 !py-2.5 sm:inline-flex">
          <i class="fa-solid fa-download" /> CV
        </a>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-fg transition hover:bg-surface-2 lg:hidden"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span class="relative block h-3 w-4">
            <span class="absolute left-0 h-px w-4 bg-current transition-all duration-300" :class="open ? 'top-1.5 rotate-45' : 'top-0'" />
            <span class="absolute top-1.5 left-0 h-px w-4 bg-current transition-opacity duration-300" :class="{ 'opacity-0': open }" />
            <span class="absolute left-0 h-px w-4 bg-current transition-all duration-300" :class="open ? 'top-1.5 -rotate-45' : 'top-3'" />
          </span>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="open" class="h-[calc(100svh-4rem)] overflow-y-auto sm:h-[calc(100svh-4.5rem)] border-t border-line bg-bg lg:hidden">
        <ul class="container-x py-6">
          <li
            v-for="(link, i) in navLinks"
            :key="link.id"
            class="animate-rise border-b border-line"
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            <a :href="`#${link.id}`" class="flex items-baseline gap-4 py-4 text-3xl font-semibold tracking-tight text-fg" @click="open = false">
              <span class="font-mono text-xs text-accent-ink">0{{ i + 1 }}</span>{{ link.label }}
            </a>
          </li>
          <li class="animate-rise pt-8 [animation-delay:350ms]">
            <a :href="profile.resume" download class="btn-accent w-full"><i class="fa-solid fa-download" /> Download CV</a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
