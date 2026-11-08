<script setup>
defineProps({ height: { type: String, default: 'h-10 sm:h-12' } })

// Served from public/ via a relative path (see `base` in vite.config.js)
const lightLogo = 'images/logo-light.png'
const darkLogo = 'images/logo-dark.png'
</script>

<template>
  <!-- Separate artwork per theme: dark text for light mode, light text for dark mode -->
  <span class="inline-flex transition-transform duration-300 hover:scale-[1.03]">
    <img :src="lightLogo" alt="Maham Zafar — AI · Software Engineer" class="w-auto transition-[height] duration-500 dark:hidden" :class="height" />
    <img :src="darkLogo" alt="Maham Zafar — AI · Software Engineer" class="hidden w-auto transition-[height] duration-500 dark:block" :class="height" />
  </span>
</template>
