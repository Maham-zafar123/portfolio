<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { skillGroups } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'
import TechIcon from './TechIcon.vue'

const active = ref(skillGroups[0].id)
const current = computed(() => skillGroups.find((g) => g.id === active.value))

// ---------- 3D skill sphere ----------
// Points on a Fibonacci sphere, rotated every frame and projected with depth-based scale/opacity.
const all = skillGroups.flatMap((g) => g.skills.map((name) => ({ name, group: g.id })))
const n = all.length
// Stride through the sphere so each category is spread around it rather than banded
const stride = [17, 13, 11, 7, 5].find((k) => n % k !== 0) || 1
const base = all.map((_, j) => {
  const i = (j * stride) % n
  const y = 1 - (i / (n - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const phi = i * Math.PI * (3 - Math.sqrt(5))
  return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r }
})

const stage = ref(null)
const nodes = ref([])
let ax = 0.0016, ay = 0.0032, rotX = 0, rotY = 0, raf = 0, visible = false, io
let dragging = false, lx = 0, ly = 0

const render = () => {
  rotX += ax
  rotY += ay
  const cx = Math.cos(rotX), sx = Math.sin(rotX), cy = Math.cos(rotY), sy = Math.sin(rotY)
  const R = (stage.value?.clientWidth || 400) * 0.4
  for (let i = 0; i < n; i++) {
    const p = base[i]
    const y1 = p.y * cx - p.z * sx
    const z1 = p.y * sx + p.z * cx
    const x2 = p.x * cy + z1 * sy
    const z2 = -p.x * sy + z1 * cy
    const scale = (z2 + 2) / 3
    const el = nodes.value[i]
    if (!el) continue
    el.style.transform = `translate3d(${x2 * R}px, ${y1 * R}px, 0) translate(-50%, -50%) scale(${scale})`
    el.style.opacity = (0.25 + 0.75 * ((z2 + 1) / 2)).toFixed(2)
    el.style.zIndex = Math.round(scale * 100)
  }
  if (!dragging) {
    ax += (0.0016 - ax) * 0.02
    ay += (0.0032 - ay) * 0.02
  }
  if (visible) raf = requestAnimationFrame(render)
}

const onPointerDown = (e) => {
  dragging = true
  lx = e.clientX
  ly = e.clientY
  stage.value.setPointerCapture?.(e.pointerId)
}
const onPointerMove = (e) => {
  if (!dragging) return
  ay = (e.clientX - lx) * 0.0009
  ax = (e.clientY - ly) * -0.0009
  lx = e.clientX
  ly = e.clientY
}
const onPointerUp = () => (dragging = false)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    ax = ay = 0
    visible = false
    rotX = 0.3
    rotY = 0.5
    render()
    return
  }
  io = new IntersectionObserver(([entry]) => {
    const was = visible
    visible = entry.isIntersecting
    if (visible && !was) raf = requestAnimationFrame(render)
  })
  io.observe(stage.value)
})
onBeforeUnmount(() => {
  visible = false
  cancelAnimationFrame(raf)
  io?.disconnect()
})
</script>

<template>
  <section id="skills" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading
        index="04"
        eyebrow="Toolbox"
        title="A stack built for"
        accent="intelligent products."
        description="Drag the sphere to spin it, or pick a category to see the tools I reach for."
      />

      <div class="grid items-center gap-10 lg:grid-cols-2">
        <!-- Sphere -->
        <div v-reveal:zoom class="relative mx-auto aspect-square w-full max-w-[34rem]">
          <div class="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]" />
          <div class="absolute inset-[6%] rounded-full border border-dashed border-line" />
          <div
            ref="stage"
            class="absolute inset-0 touch-none select-none"
            data-cursor="drag"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          >
            <span
              v-for="(s, i) in all"
              :key="s.name + i"
              :ref="(el) => (nodes[i] = el)"
              class="absolute top-1/2 left-1/2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] whitespace-nowrap transition-colors duration-300 will-change-transform"
              :class="
                s.group === active
                  ? 'border-accent bg-accent text-on-accent'
                  : 'border-line bg-[color-mix(in_oklab,var(--surface)_80%,transparent)] text-muted'
              "
            >
              <TechIcon :name="s.name" size="size-3.5" />{{ s.name }}
            </span>
          </div>
        </div>

        <!-- Categories -->
        <div v-reveal:right class="glass rounded-[2rem] p-3 sm:p-4">
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="g in skillGroups"
              :key="g.id"
              type="button"
              class="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-500"
              :class="active === g.id ? 'bg-fg text-bg shadow-lg' : 'text-muted hover:bg-fg/5 hover:text-fg'"
              @click="active = g.id"
            >
              <i :class="g.icon" class="text-xs" />{{ g.label }}
            </button>
          </div>

          <div class="mt-3 min-h-[19rem] rounded-[1.5rem] border border-line bg-fg/[0.02] p-5 sm:p-6 [perspective:900px]">
            <Transition name="swap" mode="out-in">
              <div :key="current.id">
                <div class="flex items-end justify-between gap-4">
                  <h3 class="font-display text-2xl font-bold tracking-tight text-fg">{{ current.label }}</h3>
                  <span class="font-mono text-xs text-subtle">{{ current.skills.length }} tools</span>
                </div>
                <ul class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <li
                    v-for="(skill, i) in current.skills"
                    :key="skill"
                    class="group flex animate-rise items-center gap-2.5 rounded-xl border border-line bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60"
                    :style="{ animationDelay: `${i * 40}ms` }"
                  >
                    <TechIcon :name="skill" size="size-5" />
                    <span class="text-[13px] leading-tight text-fg">{{ skill }}</span>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
