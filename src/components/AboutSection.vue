<script setup>
import { ref } from 'vue'
import { education, focusAreas, profile } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'

// Tap-to-flip for touch devices; hover flips on desktop
const flipped = ref(new Set())
const flip = (i) => {
  const next = new Set(flipped.value)
  next.has(i) ? next.delete(i) : next.add(i)
  flipped.value = next
}

const facts = [
  { k: 'Based in', v: profile.location },
  { k: 'Degree', v: 'B.Sc. Software Engineering' },
  { k: 'University', v: 'UET Taxila' },
  { k: 'CGPA', v: education.cgpa },
  { k: 'Focus', v: 'LLMs · RAG · Agents' },
  { k: 'Status', v: 'Open to roles' },
]
</script>

<template>
  <section id="about" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading index="02" eyebrow="About me" title="Engineer by training," accent="AI builder by obsession." />

      <div class="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <!-- Story (sticky on desktop) -->
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p v-reveal class="font-display text-2xl leading-snug font-medium tracking-tight text-fg sm:text-3xl">
            I turn research-grade AI into
            <span class="relative whitespace-nowrap">
              <span class="relative z-10">shippable products</span>
              <span class="absolute inset-x-0 bottom-1 -z-0 h-3 -skew-x-6 bg-accent/40" />
            </span>
            people actually use.
          </p>
          <div v-reveal="100" class="mt-8 space-y-4 leading-relaxed text-muted">
            <p v-for="(para, i) in profile.summary" :key="i">{{ para }}</p>
          </div>

          <dl v-reveal="200" class="glass mt-10 grid grid-cols-2 overflow-hidden rounded-3xl sm:grid-cols-3">
            <div
              v-for="(f, i) in facts"
              :key="f.k"
              class="border-line p-4"
              :class="[i % 2 === 0 ? 'border-r sm:border-r' : 'sm:border-r', i % 3 === 2 ? 'sm:!border-r-0' : '', i < 4 ? 'border-b' : '', i >= 3 ? 'sm:border-b-0' : 'sm:border-b']"
            >
              <dt class="font-mono text-[10px] tracking-widest text-subtle uppercase">{{ f.k }}</dt>
              <dd class="mt-1 text-sm font-semibold text-fg">{{ f.v }}</dd>
            </div>
          </dl>
        </div>

        <!-- Focus areas: 3D flip cards -->
        <div>
          <p v-reveal class="eyebrow mb-5"><i class="fa-solid fa-hand-pointer" /> Hover or tap a card to flip</p>
          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="(area, i) in focusAreas"
              :key="area.title"
              v-reveal:zoom="i * 100"
              class="group h-64 [perspective:1200px] sm:h-72"
              :class="i % 2 === 1 ? 'sm:translate-y-12' : ''"
            >
              <button
                type="button"
                :aria-pressed="flipped.has(i)"
                :aria-label="`${area.title}: ${area.text}`"
                data-cursor="flip"
                class="relative size-full text-left transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] preserve-3d group-hover:[transform:rotateY(180deg)]"
                :class="flipped.has(i) ? '[transform:rotateY(180deg)]' : ''"
                @click="flip(i)"
              >
                <!-- Front -->
                <span class="glass absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 backface-hidden">
                  <span class="flex items-start justify-between">
                    <span class="grid size-14 place-items-center rounded-2xl bg-accent text-xl text-on-accent shadow-[0_12px_30px_-10px_var(--accent)]">
                      <i :class="area.icon" />
                    </span>
                    <span class="font-mono text-xs text-subtle">0{{ i + 1 }}</span>
                  </span>
                  <span>
                    <span class="block font-display text-3xl font-bold tracking-tight text-fg">{{ area.title }}</span>
                    <span class="mt-2 inline-flex items-center gap-2 font-mono text-[11px] text-subtle">
                      flip <i class="fa-solid fa-rotate text-[10px]" />
                    </span>
                  </span>
                  <i :class="area.icon" class="pointer-events-none absolute -right-6 -bottom-8 text-[9rem] text-fg/[0.04]" />
                </span>
                <!-- Back -->
                <span
                  class="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-accent p-6 text-on-accent backface-hidden [transform:rotateY(180deg)]"
                >
                  <span class="font-mono text-xs opacity-70">0{{ i + 1 }} / {{ area.title }}</span>
                  <span class="font-display text-xl leading-snug font-semibold">{{ area.text }}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
