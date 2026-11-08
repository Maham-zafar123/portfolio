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
        <!-- Visual side: screenshot, metrics, pipeline -->
        <div class="relative flex flex-col justify-center gap-5 overflow-hidden border-b border-line bg-surface-2/60 p-5 sm:p-8 lg:border-r lg:border-b-0">
          <div class="dot-grid pointer-events-none absolute inset-0 opacity-60" />
          <div class="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/20 blur-[90px]" />
          <div class="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-accent-3/15 blur-[90px]" />

          <div v-tilt="5" class="panel-hover relative overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/25">
            <div class="flex items-center gap-1.5 border-b border-line px-3 py-2">
              <span class="size-2 rounded-full bg-[#ff5f57]" />
              <span class="size-2 rounded-full bg-[#febc2e]" />
              <span class="size-2 rounded-full bg-[#28c840]" />
              <span class="mx-auto rounded-md bg-surface-2 px-3 py-0.5 font-mono text-[10px] text-subtle">donutdoc.app</span>
            </div>
            <img
              :src="featured.image"
              :alt="featured.title"
              class="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <dl class="relative grid grid-cols-3 gap-3">
            <div
              v-for="m in featured.metrics"
              :key="m.label"
              class="rounded-xl border border-line bg-surface/80 px-3 py-3 text-center backdrop-blur sm:px-4"
            >
              <dd class="text-2xl font-semibold tracking-tighter sm:text-3xl"><span class="text-gradient">{{ m.value }}</span></dd>
              <dt class="mt-0.5 font-mono text-[10px] tracking-wide text-subtle uppercase sm:text-[11px]">{{ m.label }}</dt>
            </div>
          </dl>

          <div class="relative rounded-xl border border-line bg-surface/80 p-4 backdrop-blur">
            <p class="mb-3 font-mono text-[10px] tracking-widest text-subtle uppercase">// pipeline</p>
            <ol class="flex items-center">
              <template v-for="(step, i) in featured.pipeline" :key="step.label">
                <li class="flex shrink-0 flex-col items-center gap-1.5">
                  <span class="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-sm text-accent-ink transition-transform duration-300 group-hover:-translate-y-0.5" :style="{ transitionDelay: `${i * 60}ms` }">
                    <i :class="step.icon" />
                  </span>
                  <span class="font-mono text-[10px] whitespace-nowrap text-muted sm:text-[11px]">{{ step.label }}</span>
                </li>
                <li v-if="i < featured.pipeline.length - 1" aria-hidden="true" class="relative mx-1 mb-5 h-px flex-1 overflow-hidden bg-line sm:mx-2">
                  <span class="absolute inset-y-0 w-1/2 animate-[flow_1.8s_linear_infinite] bg-linear-to-r from-transparent via-accent to-transparent" :style="{ animationDelay: `${i * 0.3}s` }" />
                </li>
              </template>
            </ol>
          </div>
        </div>

        <!-- Story side -->
        <div class="flex flex-col justify-center p-6 sm:p-10">
          <div class="flex flex-wrap items-center gap-2">
            <span class="tag !border-accent/40 !bg-accent/10 !text-accent-ink"><i class="fa-solid fa-star" /> featured</span>
            <span class="font-mono text-[11px] text-subtle">{{ featured.badge }}</span>
          </div>
          <h3 class="mt-5 text-3xl font-semibold tracking-tighter text-fg sm:text-4xl">{{ featured.title }}</h3>
          <p class="mt-1 text-muted">{{ featured.subtitle }}</p>
          <p class="mt-5 leading-relaxed text-muted">{{ featured.description }}</p>

          <ul class="mt-6 space-y-2.5">
            <li v-for="p in featured.points.slice(0, 2)" :key="p" class="flex gap-3 text-sm leading-relaxed text-muted">
              <span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[10px] text-accent-ink">
                <i class="fa-solid fa-check" />
              </span>
              <span>{{ p }}</span>
            </li>
          </ul>

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
              <div class="absolute inset-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/75 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="inline-flex translate-y-2 items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                  View case study <i class="fa-solid fa-arrow-right text-[10px]" />
                </span>
                <a
                  :href="project.github"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`${project.title} on GitHub`"
                  class="grid size-9 translate-y-2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:translate-y-0 hover:bg-white hover:text-black"
                  @click.stop
                >
                  <i class="fa-brands fa-github" />
                </a>
              </div>
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
