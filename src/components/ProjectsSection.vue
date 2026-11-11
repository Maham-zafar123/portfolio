<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

// Sliding pill behind the active filter
const tabRefs = {}
const pill = ref({ opacity: 0 })
const placePill = () => {
  const el = tabRefs[active.value]
  if (el) pill.value = { width: `${el.offsetWidth}px`, transform: `translateX(${el.offsetLeft}px)` }
}
watch(active, () => nextTick(placePill))
onMounted(() => {
  placePill()
  document.fonts?.ready.then(placePill)
  window.addEventListener('resize', placePill, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', placePill))
</script>

<template>
  <section id="projects" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading
        index="05"
        eyebrow="Selected work"
        title="Things I've"
        accent="built."
        description="Production-minded AI systems, from OCR-free document understanding to multi-agent research pipelines."
      />

      <!-- Featured: layered 3D showcase -->
      <article v-reveal:clip class="mb-14 [perspective:1600px]">
        <div
          v-tilt="5"
          class="glass ring-glow glare group relative grid cursor-pointer overflow-hidden rounded-[2.25rem] lg:grid-cols-[1.25fr_1fr]"
          data-cursor="open"
          @click="selected = featured"
        >
          <div class="relative min-h-80 overflow-hidden p-5 sm:p-8 preserve-3d">
            <div class="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-accent/25 blur-3xl" />
            <div class="relative overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40 [transform:translateZ(30px)]">
              <img
                :src="featured.image"
                :alt="featured.title"
                loading="lazy"
                class="aspect-[16/10] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <!-- Floating metric chips pushed forward in Z -->
            <div class="relative -mt-10 flex flex-wrap justify-center gap-2 px-2 sm:justify-start sm:px-6 [transform:translateZ(70px)]">
              <div v-for="m in featured.metrics" :key="m.label" class="glass-strong rounded-2xl px-4 py-2.5 text-center">
                <p class="font-display text-2xl font-bold tracking-tight text-accent-ink">{{ m.value }}</p>
                <p class="font-mono text-[10px] text-subtle uppercase">{{ m.label }}</p>
              </div>
            </div>
          </div>

          <div class="relative flex flex-col justify-center border-t border-line p-6 sm:p-10 lg:border-t-0 lg:border-l">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip !border-accent/40 !bg-accent !text-on-accent"><i class="fa-solid fa-star" /> Featured</span>
              <span class="font-mono text-[11px] text-subtle">{{ featured.badge }}</span>
            </div>
            <h3 class="mt-6 font-display text-5xl font-extrabold tracking-tight text-fg sm:text-6xl">{{ featured.title }}</h3>
            <p class="mt-1 text-lg text-muted">{{ featured.subtitle }}</p>
            <p class="mt-5 leading-relaxed text-muted">{{ featured.description }}</p>

            <ol class="mt-7 flex items-center">
              <template v-for="(step, i) in featured.pipeline" :key="step.label">
                <li class="flex shrink-0 flex-col items-center gap-1.5">
                  <span class="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-sm text-accent-ink"><i :class="step.icon" /></span>
                  <span class="font-mono text-[10px] whitespace-nowrap text-muted">{{ step.label }}</span>
                </li>
                <li v-if="i < featured.pipeline.length - 1" aria-hidden="true" class="relative mx-1 mb-5 h-px flex-1 overflow-hidden bg-line">
                  <span class="absolute inset-y-0 w-1/2 animate-[flow_1.8s_linear_infinite] bg-linear-to-r from-transparent via-accent to-transparent" :style="{ animationDelay: `${i * 0.3}s` }" />
                </li>
              </template>
            </ol>

            <div class="mt-8 flex flex-wrap gap-3">
              <button type="button" class="btn-accent group/btn" @click.stop="selected = featured">
                Case study <i class="fa-solid fa-arrow-right -rotate-45 transition-transform duration-500 group-hover/btn:rotate-0" />
              </button>
              <a :href="featured.github" target="_blank" rel="noopener" class="btn-glass" @click.stop><i class="fa-brands fa-github" /> Source</a>
            </div>
          </div>
        </div>
      </article>

      <!-- Filters -->
      <div v-reveal class="mb-10 flex flex-wrap items-end justify-between gap-5">
        <h3 class="font-display text-3xl font-bold tracking-tight text-fg">More projects</h3>
        <div class="glass relative flex max-w-full overflow-x-auto rounded-full p-1 [scrollbar-width:none]">
          <span class="absolute top-1 bottom-1 left-0 rounded-full bg-accent transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" :style="pill" />
          <button
            v-for="f in projectFilters"
            :key="f.id"
            :ref="(el) => (tabRefs[f.id] = el)"
            type="button"
            class="relative z-10 flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="active === f.id ? 'text-on-accent' : 'text-muted hover:text-fg'"
            @click="active = f.id"
          >
            {{ f.label }}<span class="font-mono text-[10px] opacity-60">{{ countFor(f.id) }}</span>
          </button>
        </div>
      </div>

      <TransitionGroup tag="div" name="list" class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1400px]">
        <article v-for="(project, i) in filtered" :key="project.title" class="group" :class="i % 3 === 1 ? 'lg:translate-y-10' : ''">
          <div
            v-tilt="10"
            class="glass glare lift relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] p-2.5"
            data-cursor="view"
            @click="selected = project"
          >
            <div class="relative aspect-[4/3] overflow-hidden rounded-[1.3rem]">
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
                class="size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-1"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <span class="absolute top-3 left-3 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-md">
                {{ labelFor(project.category) }}
              </span>
              <a
                :href="project.github"
                target="_blank"
                rel="noopener"
                :aria-label="`${project.title} on GitHub`"
                class="absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                @click.stop
              >
                <i class="fa-brands fa-github" />
              </a>
              <span class="absolute bottom-3 left-3 flex -space-x-1.5">
                <span
                  v-for="t in project.tech.slice(0, 4)"
                  :key="t"
                  :title="t"
                  class="grid size-8 place-items-center rounded-full border border-white/25 bg-white/85 backdrop-blur"
                >
                  <TechIcon :name="t" size="size-4" />
                </span>
              </span>
            </div>
            <div class="flex flex-1 flex-col px-3 pt-4 pb-3">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-xl font-bold tracking-tight text-fg">{{ project.title }}</h3>
                <i class="fa-solid fa-arrow-right mt-1.5 -rotate-45 text-sm text-subtle transition-all duration-500 group-hover:rotate-0 group-hover:text-accent-ink" />
              </div>
              <p class="text-sm text-accent-ink">{{ project.subtitle }}</p>
              <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{{ project.description }}</p>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <div v-reveal class="mt-16 text-center">
        <a v-magnetic :href="`${profile.github}?tab=repositories`" target="_blank" rel="noopener" class="btn-glass group !px-7 !py-4">
          <i class="fa-brands fa-github" /> Explore more on GitHub
          <i class="fa-solid fa-arrow-right -rotate-45 text-xs transition-transform duration-500 group-hover:rotate-0" />
        </a>
      </div>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>
