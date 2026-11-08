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
        class="fixed inset-0 z-[70] flex items-end justify-center bg-bg/70 backdrop-blur-sm sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
        @click.self="emit('close')"
      >
        <div class="pop-panel panel max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-b-none shadow-2xl shadow-black/40 sm:rounded-2xl">
          <div class="sticky top-0 z-10 flex items-center gap-1.5 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur">
            <button type="button" aria-label="Close" class="size-3 rounded-full bg-[#ff5f57] transition hover:brightness-110" @click="emit('close')" />
            <span class="size-3 rounded-full bg-[#febc2e]" />
            <span class="size-3 rounded-full bg-[#28c840]" />
            <span class="ml-3 truncate font-mono text-[11px] text-subtle">case-study.md — {{ project.title }}</span>
            <button
              type="button"
              aria-label="Close"
              class="ml-auto grid size-8 place-items-center rounded-full text-muted transition hover:rotate-90 hover:bg-surface-2 hover:text-fg"
              @click="emit('close')"
            >
              <i class="fa-solid fa-xmark" />
            </button>
          </div>

          <img :src="project.image" :alt="project.title" class="aspect-video w-full border-b border-line object-cover" />

          <div class="p-6 sm:p-10">
            <p v-if="project.badge" class="font-mono text-xs text-accent-ink">{{ project.badge }}</p>
            <h3 class="mt-2 text-3xl font-semibold tracking-tighter text-fg">{{ project.title }}</h3>
            <p class="text-muted">{{ project.subtitle }}</p>
            <p class="mt-5 leading-relaxed text-muted">{{ project.description }}</p>

            <h4 class="mt-8 mb-3 font-mono text-xs tracking-widest text-subtle uppercase">## Highlights</h4>
            <ul class="space-y-2.5">
              <li v-for="p in project.points" :key="p" class="flex gap-3 text-sm leading-relaxed text-muted">
                <span class="font-mono text-accent-ink">+</span>
                <span>{{ p }}</span>
              </li>
            </ul>

            <h4 class="mt-8 mb-3 font-mono text-xs tracking-widest text-subtle uppercase">## Built with</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in project.tech" :key="t" class="tag !py-1.5 !text-xs"><TechIcon :name="t" /> {{ t }}</span>
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
