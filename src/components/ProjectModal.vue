<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import TechIcon from './TechIcon.vue'

const props = defineProps({ project: Object })
const emit = defineEmits(['close'])

const onKey = (e) => e.key === 'Escape' && emit('close')
watch(
  () => props.project,
  (p) => document.body.classList.toggle('overflow-hidden', !!p),
)
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="pop">
      <div
        v-if="project"
        class="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 backdrop-blur-md sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
        @click.self="emit('close')"
      >
        <div class="pop-panel glass-strong relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem]">
          <button
            type="button"
            aria-label="Close"
            class="glass-strong absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full text-fg transition-transform duration-500 hover:rotate-90"
            @click="emit('close')"
          >
            <i class="fa-solid fa-xmark" />
          </button>

          <div class="relative">
            <img :src="project.image" :alt="project.title" class="aspect-[16/8] w-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-transparent to-transparent" />
          </div>

          <div class="relative -mt-16 p-6 sm:p-10">
            <p v-if="project.badge" class="chip !border-accent/40 !bg-accent !text-on-accent">{{ project.badge }}</p>
            <h3 class="mt-4 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">{{ project.title }}</h3>
            <p class="mt-1 text-lg text-accent-ink">{{ project.subtitle }}</p>
            <p class="mt-6 max-w-2xl leading-relaxed text-muted">{{ project.description }}</p>

            <div class="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p class="eyebrow mb-4">Highlights</p>
                <ul class="space-y-3">
                  <li v-for="(p, i) in project.points" :key="p" class="flex gap-4 text-[15px] leading-relaxed text-muted">
                    <span class="font-mono text-xs text-accent-ink">0{{ i + 1 }}</span>
                    <span>{{ p }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <p class="eyebrow mb-4">Built with</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="t in project.tech" :key="t" class="chip !py-1.5 !text-xs"><TechIcon :name="t" /> {{ t }}</span>
                </div>
              </div>
            </div>

            <a :href="project.github" target="_blank" rel="noopener" class="btn-accent mt-10">
              <i class="fa-brands fa-github" /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
