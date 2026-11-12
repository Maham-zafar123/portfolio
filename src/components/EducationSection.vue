<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { awards, certifications, education } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'

const gpa = parseFloat(education.cgpa)
const C = 2 * Math.PI * 52
const gauge = ref(null)
const filled = ref(0)
let io

onMounted(() => {
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      filled.value = gpa / 4
      io.disconnect()
    }
  }, { threshold: 0.4 })
  io.observe(gauge.value)
})
onBeforeUnmount(() => io?.disconnect())

const [startYear, endYear] = education.period.split(/\s*[–-]\s*/).map(Number)
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
const quick = [
  { value: awards.length, label: 'Merit awards' },
  { value: certifications.length, label: 'Certificates' },
  { value: `${endYear - startYear} yrs`, label: 'Program' },
]
</script>

<template>
  <section id="education" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading index="06" eyebrow="Education" title="Learning &" accent="recognition." />

      <div class="grid gap-4 lg:grid-cols-12">
        <!-- Degree card: CGPA ring, FYP, year track and quick stats -->
        <article v-reveal:left class="[perspective:1400px] lg:col-span-5 lg:row-span-2">
          <div v-tilt="6" class="glass glare relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div class="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_40%,transparent),transparent)]" />

            <!-- Header -->
            <div class="relative flex items-center justify-between gap-3">
              <span class="grid size-12 place-items-center rounded-2xl bg-accent text-lg text-on-accent shadow-[0_10px_30px_-10px_var(--accent)]">
                <i class="fa-solid fa-graduation-cap" />
              </span>
              <span class="chip !border-accent/40 !bg-accent/10 !text-accent-ink"><i class="fa-solid fa-circle-check" /> Graduated {{ education.period.slice(-4) }}</span>
            </div>
            <h3 class="relative mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-fg">{{ education.degree }}</h3>
            <p class="relative mt-1.5 flex items-center gap-2 text-sm text-muted">
              <i class="fa-solid fa-building-columns text-xs text-subtle" /> {{ education.school }}
            </p>

            <!-- Ring + highlights -->
            <div class="relative mt-7 grid grid-cols-[auto_1fr] items-center gap-5 rounded-3xl border border-line bg-fg/[0.03] p-4 sm:gap-6 sm:p-5">
              <div ref="gauge" class="relative size-32 sm:size-36">
                <svg viewBox="0 0 120 120" class="size-full -rotate-90" aria-hidden="true">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="9" />
                  <circle
                    cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-opacity="0.25" stroke-width="16" stroke-linecap="round"
                    :stroke-dasharray="C" :stroke-dashoffset="C * (1 - filled)"
                    class="transition-[stroke-dashoffset] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <circle
                    cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"
                    :stroke-dasharray="C" :stroke-dashoffset="C * (1 - filled)"
                    class="transition-[stroke-dashoffset] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </svg>
                <div class="absolute inset-0 grid place-content-center text-center">
                  <p class="font-display text-4xl font-extrabold tracking-tighter text-fg">{{ gpa.toFixed(2) }}</p>
                  <p class="font-mono text-[9px] tracking-widest text-subtle">CGPA / 4.0</p>
                </div>
              </div>
              <ul class="space-y-3 text-sm">
                <li>
                  <p class="font-mono text-[10px] tracking-widest text-subtle uppercase">Final year project</p>
                  <a href="#projects" class="font-semibold text-fg transition hover:text-accent-ink">DonutDoc <i class="fa-solid fa-arrow-right -rotate-45 text-[10px]" /></a>
                </li>
                <li>
                  <p class="font-mono text-[10px] tracking-widest text-subtle uppercase">Sponsored by</p>
                  <p class="font-semibold text-fg">NASTP</p>
                </li>
                <li>
                  <p class="font-mono text-[10px] tracking-widest text-subtle uppercase">Result</p>
                  <p class="font-semibold text-accent-ink">95% extraction accuracy</p>
                </li>
              </ul>
            </div>

            <!-- Year track -->
            <div class="relative mt-7">
              <div class="flex justify-between font-mono text-[10px] text-subtle">
                <span v-for="y in years" :key="y">{{ y }}</span>
              </div>
              <div class="relative mt-2 h-2 overflow-hidden rounded-full bg-fg/[0.06]">
                <div
                  class="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-accent to-accent-3 transition-[width] duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  :style="{ width: filled ? '100%' : '0%' }"
                />
              </div>
              <div class="mt-2 flex justify-between">
                <span v-for="y in years" :key="'d' + y" class="size-2 rounded-full border-2 border-accent bg-bg" />
              </div>
            </div>

            <!-- Quick stats -->
            <dl class="relative mt-auto grid grid-cols-3 gap-2 pt-7">
              <div v-for="q in quick" :key="q.label" class="rounded-2xl border border-line bg-fg/[0.03] px-3 py-3 text-center">
                <dd class="font-display text-2xl font-bold tracking-tight text-fg">{{ q.value }}</dd>
                <dt class="mt-0.5 font-mono text-[9px] tracking-wide text-subtle uppercase">{{ q.label }}</dt>
              </div>
            </dl>
          </div>
        </article>

        <!-- Awards: 2x2 tiles -->
        <div class="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <article
            v-for="(a, i) in awards"
            :key="a.title"
            v-reveal="i * 90"
            class="glass lift group relative overflow-hidden rounded-3xl p-6"
          >
            <span class="grid size-11 place-items-center rounded-2xl bg-accent-2/15 text-accent-2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateY(360deg)]">
              <i class="fa-solid fa-award" />
            </span>
            <h4 class="mt-5 font-display text-lg font-bold tracking-tight text-fg">{{ a.title }}</h4>
            <p class="mt-1 text-sm text-muted">{{ a.text }}</p>
          </article>
        </div>

        <!-- Certifications -->
        <article v-reveal class="glass rounded-[2rem] p-6 sm:p-8 lg:col-span-7">
          <p class="eyebrow"><i class="fa-solid fa-certificate" /> Certifications</p>
          <ol class="relative mt-6 space-y-5 border-l border-line pl-6">
            <li v-for="c in certifications" :key="c.title" class="group relative">
              <span class="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-accent bg-bg transition-colors group-hover:bg-accent" />
              <div class="flex flex-wrap items-baseline justify-between gap-x-4">
                <p class="font-semibold text-fg">{{ c.title }}</p>
                <span class="font-mono text-xs text-accent-ink">{{ c.year }}</span>
              </div>
              <p class="text-sm text-muted">{{ c.issuer }}</p>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>
</template>
