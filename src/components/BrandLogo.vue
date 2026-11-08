<script setup>
defineProps({ height: { type: String, default: 'h-10 sm:h-12' } })
</script>

<template>
  <!-- Separate artwork per theme: dark text for light mode, light text for dark mode -->
  <span class="inline-flex transition-transform duration-300 hover:scale-[1.03]">
    <img src="/images/logo-light.png" alt="Maham Zafar — AI · Software Engineer" class="w-auto transition-[height] duration-500 dark:hidden" :class="height" />
    <img src="/images/logo-dark.png" alt="Maham Zafar — AI · Software Engineer" class="hidden w-auto transition-[height] duration-500 dark:block" :class="height" />
  </span>
</template>
