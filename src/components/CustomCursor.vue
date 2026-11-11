<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const enabled = ref(false)
const dot = ref(null)
const ring = ref(null)
const label = ref('')
const hovering = ref(false)
const pressed = ref(false)

let mx = -100, my = -100, rx = -100, ry = -100, raf = 0

const onMove = (e) => {
  mx = e.clientX
  my = e.clientY
  const target = e.target.closest?.('a, button, [data-cursor], input, textarea, label')
  hovering.value = !!target && !target.matches('input, textarea')
  label.value = target?.dataset?.cursor || ''
}
const onDown = () => (pressed.value = true)
const onUp = () => (pressed.value = false)
const onLeave = () => { mx = my = -100 }

const loop = () => {
  rx += (mx - rx) * 0.16
  ry += (my - ry) * 0.16
  if (dot.value) dot.value.style.transform = `translate3d(${mx}px, ${my}px, 0)`
  if (ring.value) ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  enabled.value = true
  document.documentElement.classList.add('has-cursor')
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  document.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.documentElement.classList.remove('has-cursor')
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div v-if="enabled" aria-hidden="true" class="pointer-events-none fixed inset-0 z-[150]">
    <div ref="ring" class="absolute top-0 left-0">
      <div
        class="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="[
          label
            ? 'size-24 border-transparent bg-accent'
            : hovering
              ? 'size-14 border-accent bg-accent/10 backdrop-blur-[2px]'
              : 'size-9 border-fg/40',
          pressed ? 'scale-75' : '',
        ]"
      >
        <span class="font-mono text-[11px] font-semibold tracking-widest text-on-accent uppercase transition-opacity" :class="label ? 'opacity-100' : 'opacity-0'">
          {{ label }}
        </span>
      </div>
    </div>
    <div ref="dot" class="absolute top-0 left-0">
      <div class="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity" :class="label ? 'opacity-0' : ''" />
    </div>
  </div>
</template>
