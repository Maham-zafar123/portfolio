<script setup>
defineProps({
  index: String,
  eyebrow: String,
  title: String,
  accent: String,
  description: String,
})
</script>

<template>
  <div v-reveal class="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
    <div>
      <p class="flex items-center gap-3 font-mono text-xs text-accent-ink">
        <span>[{{ index }}]</span>
        <span class="h-px w-10 bg-accent/60" />
        <span class="tracking-[0.2em] uppercase">{{ eyebrow }}</span>
      </p>
      <h2 class="mt-5 max-w-3xl text-4xl font-semibold tracking-tighter text-balance text-fg sm:text-5xl lg:text-6xl">
        {{ title }} <span v-if="accent" class="text-gradient">{{ accent }}</span>
      </h2>
    </div>
    <p v-if="description" class="max-w-sm text-muted lg:pb-2 lg:text-right">{{ description }}</p>
  </div>
</template>
