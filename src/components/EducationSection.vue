<script setup>
import { awards, certifications, education } from '../data/portfolio'
import { onSpotlight } from '../composables/useScroll'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="education" class="relative py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    <div class="container-x">
      <SectionHeading index="05" eyebrow="Education" title="Learning &" accent="achievements." />

      <div class="grid gap-4 lg:grid-cols-12">
        <!-- Degree -->
        <article
          v-reveal:left
          class="spotlight relative overflow-hidden rounded-2xl bg-brand-gradient p-7 text-on-accent sm:p-9 lg:col-span-5"
          @mousemove="onSpotlight"
        >
          <div class="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,black,transparent_60%)]" />
          <i class="fa-solid fa-graduation-cap absolute -right-4 -bottom-6 text-[9rem] opacity-10" />
          <p class="relative font-mono text-xs tracking-widest uppercase opacity-70">{{ education.period }}</p>
          <h3 class="relative mt-4 text-2xl font-semibold tracking-tight">{{ education.degree }}</h3>
          <p class="relative mt-1 opacity-75">{{ education.school }}</p>
          <p class="relative mt-10 text-7xl font-semibold tracking-tighter">
            {{ education.cgpa.split(' ')[0] }}<span class="text-2xl opacity-60">/4.0</span>
          </p>
          <p class="relative font-mono text-xs opacity-70">cumulative gpa</p>
        </article>

        <!-- Awards -->
        <article v-reveal:right class="panel overflow-hidden lg:col-span-7">
          <div class="flex items-center gap-2 border-b border-line px-6 py-3 font-mono text-xs text-subtle">
            <i class="fa-solid fa-trophy" /> achievements.log
          </div>
          <ul class="divide-y divide-line">
            <li
              v-for="(a, i) in awards"
              :key="a.title"
              class="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-2/60"
            >
              <span class="font-mono text-xs text-subtle">0{{ i + 1 }}</span>
              <span class="grid size-9 shrink-0 place-items-center rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-500 transition-transform group-hover:scale-110">
                <i class="fa-solid fa-medal" />
              </span>
              <div class="min-w-0">
                <h4 class="font-medium text-fg">{{ a.title }}</h4>
                <p class="text-sm text-muted">{{ a.text }}</p>
              </div>
            </li>
          </ul>
        </article>

        <!-- Certifications -->
        <article v-reveal class="panel overflow-hidden lg:col-span-12">
          <div class="flex items-center gap-2 border-b border-line px-6 py-3 font-mono text-xs text-subtle">
            <i class="fa-solid fa-certificate" /> certifications
            <span class="ml-auto">{{ certifications.length }} rows</span>
          </div>
          <div class="hidden grid-cols-[80px_1fr_260px] gap-4 border-b border-line px-6 py-2.5 font-mono text-[10px] tracking-widest text-subtle uppercase md:grid">
            <span>year</span><span>certification</span><span>issuer</span>
          </div>
          <ul class="divide-y divide-line">
            <li
              v-for="c in certifications"
              :key="c.title"
              class="grid gap-1 px-6 py-4 transition-colors hover:bg-surface-2/60 md:grid-cols-[80px_1fr_260px] md:items-center md:gap-4"
            >
              <span class="font-mono text-xs text-accent-ink">{{ c.year }}</span>
              <span class="font-medium text-fg">{{ c.title }}</span>
              <span class="text-sm text-muted">{{ c.issuer }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
