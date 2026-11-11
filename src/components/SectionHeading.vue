<script setup>
import { computed } from 'vue'

// Big split-word title: each word slides up out of its own mask when scrolled into view.
const props = defineProps({
  index: String,
  eyebrow: String,
  title: String,
  accent: String,
  description: String,
  center: Boolean,
})
const words = computed(() => [
  ...props.title.split(' ').map((w) => ({ w, accent: false })),
  ...(props.accent ? props.accent.split(' ').map((w) => ({ w, accent: true })) : []),
])
</script>

<template>
  <div v-reveal:clip class="mb-10 lg:mb-14" :class="center ? 'text-center' : ''">
    <div class="flex items-center gap-3" :class="center ? 'justify-center' : ''">
      <span class="grid size-8 place-items-center rounded-full border border-line font-mono text-[10px] text-fg">{{ index }}</span>
      <span class="eyebrow">{{ eyebrow }}</span>
      <span v-if="!center" class="h-px max-w-40 flex-1 bg-linear-to-r from-line to-transparent" />
    </div>
    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end" :class="center ? 'justify-items-center lg:grid-cols-1' : ''">
      <h2 class="max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.95] font-bold tracking-[-0.035em] text-fg">
        <template v-for="(item, i) in words" :key="i">
          <span class="word-mask"><span class="word-inner" :class="item.accent ? 'text-gradient font-light italic' : ''" :style="{ '--d': `${i * 70}ms` }">{{ item.w }}</span></span>{{ ' ' }}
        </template>
      </h2>
      <p v-if="description" class="max-w-sm leading-relaxed text-muted lg:pb-2" :class="center ? 'mx-auto' : 'lg:text-right'">{{ description }}</p>
    </div>
  </div>
</template>
