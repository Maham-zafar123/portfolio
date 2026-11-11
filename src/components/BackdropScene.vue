<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Fixed colour field behind the glass: drifting gradient orbs with gentle mouse parallax,
// plus a receding 3D grid floor. Cheap radial-gradients, no blur filters.
const layer = ref(null)
let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0

const onMove = (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 2
  ty = (e.clientY / window.innerHeight - 0.5) * 2
}
const loop = () => {
  cx += (tx - cx) * 0.04
  cy += (ty - cy) * 0.04
  layer.value?.style.setProperty('--px', cx.toFixed(3))
  layer.value?.style.setProperty('--py', cy.toFixed(3))
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <div ref="layer" aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
    <div class="absolute inset-0" :style="{ opacity: 'var(--blob-opacity)' }">
      <div
        class="absolute -top-[20vh] -left-[10vw] size-[70vmax] rounded-full [animation:drift-a_32s_ease-in-out_infinite]"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent); translate: calc(var(--px, 0) * -30px) calc(var(--py, 0) * -30px)"
      />
      <div
        class="absolute top-[25vh] -right-[20vw] size-[65vmax] rounded-full [animation:drift-b_38s_ease-in-out_infinite]"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent-3) 60%, transparent), transparent); translate: calc(var(--px, 0) * 40px) calc(var(--py, 0) * 40px)"
      />
      <div
        class="absolute -bottom-[30vh] left-[20vw] size-[60vmax] rounded-full [animation:drift-a_44s_ease-in-out_infinite_reverse]"
        style="background: radial-gradient(closest-side, color-mix(in oklab, var(--accent-2) 45%, transparent), transparent); translate: calc(var(--px, 0) * -20px) calc(var(--py, 0) * 25px)"
      />
    </div>

    <!-- 3D grid floor -->
    <div class="absolute inset-x-0 bottom-0 h-[50vh] [perspective:600px]">
      <div
        class="grid-lines absolute inset-x-[-60%] -bottom-1/2 h-[200%] origin-bottom [transform:rotateX(70deg)] [mask-image:linear-gradient(to_top,black_10%,transparent_60%)]"
      />
    </div>

    <!-- Vignette -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)] opacity-70" />
  </div>
</template>
