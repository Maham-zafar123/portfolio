<script setup>
// The MZ logo artwork (public/images). White "Maham" for dark mode,
// navy "Maham" for light mode. compact = smaller once the nav bar is scrolled.
defineProps({ compact: Boolean })

// Served from public/ via relative paths (see `base` in vite.config.js)
const lightLogo = 'images/logo-full-light.png'
const darkLogo = 'images/logo-full-dark.png'
</script>

<template>
  <span class="group inline-flex max-w-full [perspective:600px]" aria-label="Maham Zafar">
    <span
      class="relative inline-flex max-w-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateY(-10deg)_rotateX(6deg)_scale(1.03)]"
    >
      <img
        :src="lightLogo"
        alt="Maham Zafar"
        class="w-auto max-w-full object-contain object-left transition-[height] duration-500 dark:hidden"
        :class="compact ? 'h-8 sm:h-11' : 'h-9 sm:h-14'"
      />
      <img
        :src="darkLogo"
        alt="Maham Zafar"
        class="hidden w-auto max-w-full object-contain object-left drop-shadow-[0_6px_18px_color-mix(in_oklab,var(--accent)_30%,transparent)] transition-[height] duration-500 dark:block"
        :class="compact ? 'h-8 sm:h-11' : 'h-9 sm:h-14'"
      />
    </span>
  </span>
</template>
