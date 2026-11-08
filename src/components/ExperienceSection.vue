<script setup>
import { ref } from 'vue'
import { experience } from '../data/portfolio'
import { onSpotlight } from '../composables/useScroll'
import SectionHeading from './SectionHeading.vue'
import TechIcon from './TechIcon.vue'

// Stable, fake commit hash per entry for the git-log look.
const hash = (s) => {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0
  return h.toString(16).padStart(8, '0').slice(0, 7)
}
const branch = (type) => `feat/${type.toLowerCase().replace(/\s+/g, '-')}`

const expanded = ref(new Set([0]))
const toggle = (i) => {
  const next = new Set(expanded.value)
  next.has(i) ? next.delete(i) : next.add(i)
  expanded.value = next
}
</script>

<template>
  <section id="experience" class="relative py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    <div class="container-x">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="git log"
        accent="--career"
        description="From data analytics to AI engineering and full-stack delivery."
      />

      <ol class="relative">
        <li
          v-for="(job, i) in experience"
          :key="job.company"
          class="relative grid gap-3 pb-10 last:pb-0 md:grid-cols-[170px_1fr] md:gap-10"
        >
          <!-- Commit meta -->
          <div v-reveal class="pl-9 font-mono text-xs md:pt-6 md:pl-0 md:text-right">
            <p class="text-fg">{{ job.period }}</p>
            <p class="mt-1 text-subtle">commit {{ hash(job.company + job.role) }}</p>
            <span v-if="i === 0" class="mt-2 inline-block rounded bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent-ink">HEAD → main</span>
          </div>

          <div class="relative pl-9 md:pl-10">
            <span
              class="absolute top-0 left-[5px] w-px bg-line"
              :class="i === experience.length - 1 ? 'h-8' : 'bottom-0'"
            />
            <span
              class="absolute top-7 left-0 size-[11px] rounded-full border-2 border-accent"
              :class="i === 0 ? 'bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_20%,transparent)]' : 'bg-bg'"
            />

            <article v-reveal="100" class="panel panel-hover spotlight p-6" @mousemove="onSpotlight">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-xl font-semibold tracking-tight text-fg">{{ job.role }}</h3>
                  <p class="mt-1 text-sm">
                    <span class="text-accent-2">@ {{ job.company }}</span>
                    <span v-if="job.location" class="text-subtle"> · {{ job.location }}</span>
                  </p>
                </div>
                <span class="tag"><i class="fa-solid fa-code-branch" /> {{ branch(job.type) }}</span>
              </div>

              <div
                class="grid transition-[grid-template-rows] duration-500 ease-out"
                :class="expanded.has(i) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              >
                <ul class="space-y-2 overflow-hidden">
                  <li
                    v-for="p in job.points"
                    :key="p"
                    class="flex gap-3 text-sm leading-relaxed text-muted first:mt-5"
                  >
                    <span class="font-mono text-accent-ink">+</span>
                    <span>{{ p }}</span>
                  </li>
                </ul>
              </div>

              <div class="mt-5 flex flex-wrap items-center gap-2">
                <span v-for="t in job.tech" :key="t" class="tag"><TechIcon :name="t" size="size-3.5" /> {{ t }}</span>
                <button
                  type="button"
                  class="ml-auto font-mono text-xs text-subtle transition hover:text-accent-ink"
                  :aria-expanded="expanded.has(i)"
                  @click="toggle(i)"
                >
                  {{ expanded.has(i) ? '− collapse' : `+ ${job.points.length} changes` }}
                </button>
              </div>
            </article>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
