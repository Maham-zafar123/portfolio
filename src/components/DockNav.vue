<script setup>
import { ref } from 'vue'
import { navLinks } from '../data/portfolio'

const props = defineProps({ activeId: String, progress: Number })

const icons = {
  expertise: 'fa-solid fa-wand-magic-sparkles',
  about: 'fa-regular fa-user',
  experience: 'fa-solid fa-briefcase',
  skills: 'fa-solid fa-cube',
  projects: 'fa-solid fa-layer-group',
  education: 'fa-solid fa-graduation-cap',
  contact: 'fa-regular fa-paper-plane',
}
const items = [{ id: 'top', label: 'Home', icon: 'fa-solid fa-house' }, ...navLinks.map((l) => ({ ...l, icon: icons[l.id] }))]

// macOS-style magnification: scale each icon by its distance to the cursor
const scales = ref(items.map(() => 1))
const refs = []
const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const onMove = (e) => {
  if (!fine) return
  scales.value = refs.map((el) => {
    if (!el) return 1
    const r = el.getBoundingClientRect()
    const d = Math.abs(e.clientX - (r.left + r.width / 2))
    return 1 + Math.max(0, 1 - d / 130) * 0.55
  })
}
const onLeave = () => (scales.value = items.map(() => 1))
const isActive = (id) => (props.activeId || 'top') === id
</script>

<template>
  <nav aria-label="Sections" class="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6">
    <ul
      class="glass-strong relative flex items-end gap-0.5 rounded-[1.6rem] p-1.5 sm:gap-1.5 sm:p-2"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <!-- Scroll progress hairline along the dock's top edge -->
      <span class="pointer-events-none absolute inset-x-5 -top-px h-px overflow-hidden rounded-full">
        <span class="block h-full origin-left bg-accent" :style="{ transform: `scaleX(${progress})` }" />
      </span>

      <li v-for="(item, i) in items" :key="item.id" class="group relative">
        <a
          :ref="(el) => (refs[i] = el)"
          :href="`#${item.id}`"
          :aria-label="item.label"
          :aria-current="isActive(item.id) ? 'true' : undefined"
          class="grid size-9 origin-bottom place-items-center rounded-2xl text-[14px] transition-[transform,background-color,color] duration-200 ease-out sm:size-11"
          :class="isActive(item.id) ? 'bg-accent text-on-accent shadow-[0_8px_24px_-8px_var(--accent)]' : 'text-muted hover:bg-fg/8 hover:text-fg'"
          :style="{ transform: `scale(${scales[i]}) translateY(${(1 - scales[i]) * 14}px)` }"
        >
          <i :class="item.icon" />
        </a>
        <span
          class="glass-solid pointer-events-none absolute -top-11 left-1/2 hidden -translate-x-1/2 translate-y-1 rounded-lg px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-fg opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block"
        >
          {{ item.label }}
        </span>
      </li>
    </ul>
  </nav>
</template>
