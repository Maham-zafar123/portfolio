<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { experience } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'
import TechIcon from './TechIcon.vue'

// Stacking cards: each card sticks, and as the next one slides over it the
// previous card scales back and tilts away in 3D.
const cards = ref([])
const depth = ref(experience.map(() => 0))
let raf = 0

const update = () => {
  raf = 0
  const next = cards.value.map((el, i) => {
    const below = cards.value[i + 1]
    if (!el || !below) return 0
    const a = el.getBoundingClientRect()
    const b = below.getBoundingClientRect()
    // 0 when the next card is a full card-height below, 1 when it fully overlaps
    return Math.round(Math.min(Math.max(1 - (b.top - a.top) / a.height, 0), 1) * 100) / 100
  })
  // Only touch reactive state (and re-render) when something actually moved
  if (next.some((v, i) => v !== depth.value[i])) depth.value = next
}
let near = false, io
const onScroll = () => {
  if (near) raf ||= requestAnimationFrame(update)
}

onMounted(() => {
  update()
  // Track scroll only while the section is on (or near) the screen
  io = new IntersectionObserver(([e]) => (near = e.isIntersecting), { rootMargin: '200px 0px' })
  io.observe(cards.value[0].closest('section'))
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

const hues = ['var(--accent)', 'var(--accent-3)', 'var(--accent-2)', 'var(--accent)']
</script>

<template>
  <section id="experience" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've"
        accent="shipped."
        description="From data analytics to AI engineering and full-stack delivery. Scroll — the stack builds itself."
      />

      <ol class="relative">
        <li
          v-for="(job, i) in experience"
          :key="job.company"
          :ref="(el) => (cards[i] = el)"
          class="mb-6 [perspective:1400px] last:mb-0 md:sticky md:mb-10"
          :style="{ top: `calc(6.5rem + ${i * 1.4}rem)` }"
        >
          <article
            class="glass-solid relative grid origin-top overflow-hidden rounded-[2rem] md:grid-cols-[0.8fr_1.4fr]"
            :style="{
              transform: `scale(${1 - depth[i] * 0.06}) rotateX(${depth[i] * 6}deg)`,
            }"
          >
            <span class="pointer-events-none absolute inset-0 z-10 bg-bg" :style="{ opacity: depth[i] * 0.55 }" />
            <!-- Left: meta -->
            <div class="relative flex flex-col justify-between gap-8 overflow-hidden border-b border-line p-6 sm:p-8 md:border-r md:border-b-0">
              <div
                class="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full opacity-50"
                :style="{ background: `radial-gradient(closest-side, ${hues[i % hues.length]}, transparent)` }"
              />
              <div class="relative">
                <span class="font-display text-[5.5rem] leading-none font-extrabold tracking-tighter text-outline">0{{ i + 1 }}</span>
              </div>
              <div class="relative">
                <p class="font-mono text-xs text-accent-ink">{{ job.period }}</p>
                <p class="mt-2 font-display text-2xl font-bold tracking-tight text-fg">{{ job.company }}</p>
                <p v-if="job.location" class="mt-1 text-sm text-subtle"><i class="fa-solid fa-location-dot mr-1 text-xs" />{{ job.location }}</p>
                <span class="chip mt-4">{{ job.type }}</span>
              </div>
            </div>

            <!-- Right: detail -->
            <div class="p-6 sm:p-8">
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{{ job.role }}</h3>
                <span v-if="i === 0" class="chip shrink-0 !border-accent/40 !bg-accent/10 !text-accent-ink">Latest</span>
              </div>
              <ul class="mt-6 space-y-3">
                <li v-for="p in job.points" :key="p" class="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span class="mt-2 size-1.5 shrink-0 rotate-45 bg-accent" />
                  <span>{{ p }}</span>
                </li>
              </ul>
              <div class="mt-7 flex flex-wrap gap-2">
                <span v-for="t in job.tech" :key="t" class="chip"><TechIcon :name="t" size="size-3.5" /> {{ t }}</span>
              </div>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
