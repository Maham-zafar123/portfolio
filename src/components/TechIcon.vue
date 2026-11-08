<script setup>
import { computed } from 'vue'
import { iconFor } from '../data/icons'

const props = defineProps({ name: String, size: { type: String, default: 'size-4' } })
const icon = computed(() => iconFor(props.name))
</script>

<template>
  <img
    v-if="icon.type === 'img'"
    :src="icon.src"
    alt=""
    loading="lazy"
    class="shrink-0 object-contain"
    :class="[size, { 'dark:invert': icon.invert }]"
  />
  <span
    v-else-if="icon.type === 'mask'"
    aria-hidden="true"
    class="inline-block shrink-0"
    :class="size"
    :style="{
      backgroundColor: icon.color || 'currentColor',
      mask: `url(${icon.src}) center / contain no-repeat`,
      WebkitMask: `url(${icon.src}) center / contain no-repeat`,
    }"
  />
  <span v-else aria-hidden="true" class="inline-grid shrink-0 place-items-center text-accent-ink" :class="size">
    <i :class="icon.className" class="text-[0.85em]" />
  </span>
</template>
