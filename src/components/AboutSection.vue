<script setup>
import { education, focusAreas, profile } from '../data/portfolio'
import { onSpotlight } from '../composables/useScroll'
import SectionHeading from './SectionHeading.vue'
import TerminalWindow from './TerminalWindow.vue'
</script>

<template>
  <section id="about" class="py-24 sm:py-32">
    <div class="container-x">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Engineer by training,"
        accent="AI builder by obsession."
      />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <!-- README -->
        <article
          v-reveal
          class="panel spotlight flex flex-col md:col-span-2 lg:col-span-8 lg:row-span-2"
          @mousemove="onSpotlight"
        >
          <div class="flex items-center gap-2 border-b border-line px-6 py-3 font-mono text-xs text-subtle">
            <i class="fa-brands fa-markdown text-sm" /> README.md
          </div>
          <div class="flex flex-1 flex-col p-6 sm:p-8">
            <h3 class="text-2xl font-semibold tracking-tight text-fg"># {{ profile.name }}</h3>
            <div class="mt-5 space-y-4 leading-relaxed text-muted">
              <p v-for="(para, i) in profile.summary" :key="i">{{ para }}</p>
            </div>
            <div class="mt-auto flex flex-wrap gap-2 pt-8">
              <span class="tag"><i class="fa-solid fa-location-dot" /> {{ profile.location }}</span>
              <span class="tag"><i class="fa-solid fa-graduation-cap" /> UET Taxila '26</span>
              <span class="tag"><i class="fa-solid fa-code" /> Python · Vue · Django</span>
              <span class="tag !border-accent/40 !bg-accent/10 !text-accent-ink"><i class="fa-solid fa-circle text-[6px]" /> open to work</span>
            </div>
          </div>
        </article>

        <!-- Terminal -->
        <div v-reveal="100" class="md:col-span-2 lg:col-span-4">
          <TerminalWindow class="h-full" />
        </div>

        <!-- Education -->
        <article v-reveal="200" class="panel panel-hover relative overflow-hidden p-6 lg:col-span-4">
          <div class="dot-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <p class="font-mono text-[11px] tracking-widest text-subtle uppercase">CGPA</p>
          <p class="mt-2 text-5xl font-semibold tracking-tighter text-fg">
            {{ education.cgpa.split(' ')[0] }}<span class="text-xl text-subtle">/4.0</span>
          </p>
          <p class="mt-3 text-sm text-muted">{{ education.degree }}</p>
        </article>

        <!-- Focus areas -->
        <article
          v-for="(area, i) in focusAreas"
          :key="area.title"
          v-reveal="i * 90"
          class="panel panel-hover group p-6 lg:col-span-3"
        >
          <div class="flex items-start justify-between">
            <span class="grid size-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <i :class="area.icon" />
            </span>
            <span class="font-mono text-[11px] text-subtle">/0{{ i + 1 }}</span>
          </div>
          <h3 class="mt-5 font-semibold text-fg">{{ area.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ area.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
