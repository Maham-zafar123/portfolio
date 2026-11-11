<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '../data/portfolio'
import { useTheme } from '../composables/useTheme'
import { modKey, paletteOpen } from '../composables/usePalette'
import BrandLogo from './BrandLogo.vue'

defineProps({ scrolled: Boolean })
const { isDark, toggle } = useTheme()

// Live local time in Pakistan, a small "human" detail in the bar
const time = ref('')
let timer
const tick = () =>
  (time.value = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date()))
onMounted(() => {
  tick()
  timer = setInterval(tick, 30_000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pl-5"
      :class="scrolled ? 'glass-strong' : 'border border-transparent'"
    >
      <a href="#top" aria-label="Maham Zafar, back to top" class="min-w-0 shrink">
        <BrandLogo :compact="scrolled" />
      </a>

      <div class="hidden items-center gap-5 font-mono text-[11px] text-subtle md:flex">
        <span class="flex items-center gap-2">
          <span class="relative flex size-2">
            <span class="absolute inset-0 animate-ping-slow rounded-full bg-accent" />
            <span class="relative size-2 rounded-full bg-accent" />
          </span>
          AVAILABLE FOR WORK
        </span>
        <span class="h-3 w-px bg-line" />
        <span class="tabular-nums">{{ profile.location.toUpperCase() }} · {{ time }} PKT</span>
      </div>

      <div class="flex shrink-0 items-center gap-1">
        <button
          type="button"
          class="hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-fg/5 hover:text-fg lg:flex"
          @click="paletteOpen = true"
        >
          <i class="fa-solid fa-magnifying-glass text-[11px]" />
          <span class="flex gap-0.5"><kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd></span>
        </button>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-muted transition hover:bg-fg/5 hover:text-fg lg:hidden"
          aria-label="Open command palette"
          @click="paletteOpen = true"
        >
          <i class="fa-solid fa-magnifying-glass text-sm" />
        </button>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full text-muted transition hover:bg-fg/5 hover:text-fg"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <Transition name="swap" mode="out-in">
            <i v-if="isDark" key="sun" class="fa-regular fa-sun" />
            <i v-else key="moon" class="fa-regular fa-moon" />
          </Transition>
        </button>
        <a v-magnetic="0.25" :href="profile.resume" download class="btn-accent ml-1 !px-4 !py-2.5 sm:!px-5">
          <i class="fa-solid fa-arrow-down text-xs" /> <span class="hidden sm:inline">Resume</span><span class="sm:hidden">CV</span>
        </a>
      </div>
    </div>
  </header>
</template>
