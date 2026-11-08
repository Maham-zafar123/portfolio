<script setup>
import { computed, ref } from 'vue'
import { profile, projectFilters, projects } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'
import ProjectModal from './ProjectModal.vue'
import TechIcon from './TechIcon.vue'

const active = ref('all')
const selected = ref(null)

const featured = projects.find((p) => p.featured)
const rest = projects.filter((p) => !p.featured)
const filtered = computed(() => rest.filter((p) => active.value === 'all' || p.category === active.value))
const countFor = (id) => (id === 'all' ? rest.length : rest.filter((p) => p.category === id).length)
const labelFor = (id) => projectFilters.find((f) => f.id === id)?.label
const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
</script>

<template>
  <section id="projects" class="relative py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
    <div class="container-x">
      <SectionHeading
        index="04"
        eyebrow="Work"
        title="Selected"
        accent="projects."
        description="Production-minded AI systems, from OCR-free document understanding to multi-agent research pipelines."
      />

      <!-- Featured -->
      <article
        v-reveal
        class="panel glow-border group mb-16 grid cursor-pointer overflow-hidden lg:grid-cols-[1.15fr_1fr]"
        @click="selected = featured"
      >
        <div class="dot-grid relative border-b border-line bg-surface-2/60 p-4 sm:p-8 lg:border-r lg:border-b-0">
          <div v-tilt="5" class="panel-hover overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/20">
            <div class="flex items-center gap-1.5 border-b border-line px-3 py-2">
              <span class="size-2 rounded-full bg-[#ff5f57]" />
              <span class="size-2 rounded-full bg-[#febc2e]" />
              <span class="size-2 rounded-full bg-[#28c840]" />
              <span class="mx-auto rounded-md bg-surface-2 px-3 py-0.5 font-mono text-[10px] text-subtle">donutdoc.app</span>
            </div>
            <img :src="featured.image" :alt="featured.title" class="aspect-video w-full object-cover" loading="lazy" />
          </div>
        </div>

        <div class="flex flex-col p-6 sm:p-10">
          <div class="flex flex-wrap items-center gap-2">
            <span class="tag !border-accent/40 !bg-accent/10 !text-accent-ink"><i class="fa-solid fa-star" /> featured</span>
            <span class="font-mono text-[11px] text-subtle">{{ featured.badge }}</span>
          </div>
          <h3 class="mt-5 text-3xl font-semibold tracking-tighter text-fg sm:text-4xl">{{ featured.title }}</h3>
          <p class="mt-1 text-muted">{{ featured.subtitle }}</p>
          <p class="mt-5 leading-relaxed text-muted">{{ featured.description }}</p>

          <div class="mt-6 flex items-center gap-4 rounded-xl border border-line bg-surface-2/50 p-4">
            <span class="text-4xl font-semibold tracking-tighter text-accent-ink">95%</span>
            <span class="font-mono text-xs leading-snug text-subtle">field-level extraction<br />accuracy, OCR-free</span>
          </div>

          <div class="mt-6 flex flex-wrap gap-1.5">
            <span v-for="t in featured.tech" :key="t" class="tag"><TechIcon :name="t" size="size-3.5" /> {{ t }}</span>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <button type="button" class="btn-accent group/btn" @click.stop="selected = featured">
              Read case study <i class="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1" />
            </button>
            <a :href="featured.github" target="_blank" rel="noopener" class="btn-outline" @click.stop>
              <i class="fa-brands fa-github" /> Source
            </a>
          </div>
        </div>
      </article>

      <!-- Filters -->
      <div v-reveal class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p class="font-mono text-sm text-subtle">
          <span class="text-accent-ink">❯</span> ls ./projects --filter={{ active }}
        </p>
        <div class="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
          <button
            v-for="f in projectFilters"
            :key="f.id"
            type="button"
            class="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors duration-300"
            :class="active === f.id ? 'bg-fg text-bg' : 'text-muted hover:text-fg'"
            @click="active = f.id"
          >
            {{ f.label.toLowerCase() }}<span class="opacity-50">{{ countFor(f.id) }}</span>
          </button>
        </div>
      </div>

      <TransitionGroup tag="div" name="list" class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="project in filtered"
          :key="project.title"
          class="group cursor-pointer"
          @click="selected = project"
        >
          <div v-tilt class="panel panel-hover flex h-full flex-col overflow-hidden">
            <div class="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
              <span class="size-2 rounded-full bg-line transition-colors duration-300 group-hover:bg-[#ff5f57]" />
              <span class="size-2 rounded-full bg-line transition-colors delay-75 duration-300 group-hover:bg-[#febc2e]" />
              <span class="size-2 rounded-full bg-line transition-colors delay-150 duration-300 group-hover:bg-[#28c840]" />
              <span class="ml-2 truncate font-mono text-[11px] text-subtle">~/projects/{{ slug(project.title) }}</span>
              <i class="fa-solid fa-arrow-up-right-from-square ml-auto text-[10px] text-subtle transition group-hover:text-accent-ink" />
            </div>
            <div class="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <img
                :src="project.image"
                :alt="project.title"
                class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="flex flex-1 flex-col p-5">
              <p class="font-mono text-[11px] tracking-wider text-accent-ink uppercase">{{ labelFor(project.category) }}</p>
              <h3 class="mt-2 text-lg font-semibold tracking-tight text-fg">{{ project.title }}</h3>
              <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{{ project.description }}</p>
              <div class="mt-auto flex items-center gap-2 pt-5">
                <span
                  v-for="t in project.tech.slice(0, 5)"
                  :key="t"
                  :title="t"
                  class="grid size-8 place-items-center rounded-lg border border-line bg-surface-2/60"
                >
                  <TechIcon :name="t" />
                </span>
                <span v-if="project.tech.length > 5" class="font-mono text-[11px] text-subtle">+{{ project.tech.length - 5 }}</span>
              </div>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div v-reveal class="mt-14 text-center">
        <a :href="`${profile.github}?tab=repositories`" target="_blank" rel="noopener" class="btn-outline group">
          <i class="fa-brands fa-github" /> More on GitHub
          <i class="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>
