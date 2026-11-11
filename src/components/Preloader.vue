<script setup>
import { computed, onMounted, ref } from 'vue'
import { profile } from '../data/portfolio'

// 3D intro: a glass cube (logo on the front, AI + web icons on the other faces)
// spins inside two tilted orbit rings while a boot log counts up. On finish the
// cube flies toward the camera and the two shutters fold away in 3D.
const logo = { mark: 'images/logo-mark.png', light: 'images/logo-full-light.png', dark: 'images/logo-full-dark.png' }
const visible = ref(true)
const leaving = ref(false)
const count = ref(0)

const steps = [
  { at: 0, text: 'Booting neural engine' },
  { at: 30, text: 'Loading RAG pipelines' },
  { at: 60, text: 'Compiling Vue components' },
  { at: 88, text: 'Ready' },
]
const status = computed(() => [...steps].reverse().find((s) => count.value >= s.at).text)

const faces = [
  { t: 'rotateY(0deg)', logo: true },
  { t: 'rotateY(90deg)', icon: 'fa-solid fa-brain', cls: 'from-accent to-accent-3' },
  { t: 'rotateY(180deg)', icon: 'fa-solid fa-code', cls: 'from-accent-3 to-accent' },
  { t: 'rotateY(-90deg)', icon: 'fa-solid fa-robot', cls: 'from-accent to-accent-2' },
  { t: 'rotateX(90deg)', icon: 'fa-solid fa-database', cls: 'from-accent-3 to-accent-2' },
  { t: 'rotateX(-90deg)', icon: 'fa-solid fa-layer-group', cls: 'from-accent-2 to-accent' },
]

const finish = () => {
  document.documentElement.classList.add('is-loaded')
  leaving.value = true
  document.body.style.overflow = ''
  setTimeout(() => (visible.value = false), 1200)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = false
    document.documentElement.classList.add('is-loaded')
    return
  }
  document.body.style.overflow = 'hidden'
  const start = performance.now()
  const duration = 2000
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1)
    count.value = Math.round(100 * (1 - Math.pow(1 - t, 2.4)))
    if (t < 1) requestAnimationFrame(step)
    else setTimeout(finish, 250)
  }
  requestAnimationFrame(step)
})
</script>

<template>
  <div v-if="visible" class="fixed inset-0 z-[200] overflow-hidden [perspective:1400px]" aria-hidden="true">
    <!-- Shutters that fold away in 3D -->
    <div
      class="absolute inset-x-0 top-0 h-1/2 origin-top bg-bg-2 transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      :class="leaving ? '[transform:rotateX(95deg)]' : ''"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-bg-2 transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      :class="leaving ? '[transform:rotateX(-95deg)]' : ''"
    />

    <!-- Ambient glow + moving grid floor -->
    <div class="absolute inset-0 transition-opacity duration-500" :class="leaving ? 'opacity-0' : ''">
      <div class="absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),color-mix(in_oklab,var(--accent-3)_12%,transparent)_40%,transparent_70%)]" />
      <div class="absolute inset-x-0 bottom-0 h-1/2 [perspective:500px]">
        <div class="grid-lines absolute inset-x-[-50%] -bottom-1/2 h-[200%] origin-bottom animate-[grid-scroll_1.2s_linear_infinite] [transform:rotateX(72deg)] [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
      </div>
    </div>

    <!-- Centre stage -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div
        class="relative size-56 transition-all duration-[900ms] ease-[cubic-bezier(0.7,0,0.84,0)] [perspective:900px]"
        :class="leaving ? 'scale-[3] opacity-0 blur-md' : ''"
      >
        <!-- Orbit rings -->
        <div class="absolute inset-0 preserve-3d [transform:rotateX(72deg)]">
          <div class="absolute inset-0 animate-[ring-spin_3s_linear_infinite] rounded-full border border-accent/50">
            <span class="absolute -top-1 left-1/2 size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
          </div>
        </div>
        <div class="absolute inset-6 preserve-3d [transform:rotateX(64deg)_rotateY(38deg)]">
          <div class="absolute inset-0 animate-[ring-spin_4.5s_linear_infinite_reverse] rounded-full border border-dashed border-accent-3/60">
            <span class="absolute -bottom-1 left-1/2 size-2 rounded-full bg-accent-3 shadow-[0_0_12px_var(--accent-3)]" />
          </div>
        </div>

        <!-- Cube -->
        <div class="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 [perspective:700px]">
          <div class="relative size-full animate-[loader-cube_4s_cubic-bezier(0.65,0,0.35,1)_infinite] preserve-3d">
            <div
              v-for="(f, i) in faces"
              :key="i"
              class="absolute inset-0 grid place-items-center overflow-hidden rounded-[1.4rem] border border-white/25 backface-hidden"
              :class="f.logo ? 'bg-[#0b1426]' : ['bg-linear-to-br', f.cls]"
              :style="{ transform: `${f.t} translateZ(48px)` }"
            >
              <img v-if="f.logo" :src="logo.mark" alt="" class="w-[82%]" />
              <i v-else :class="f.icon" class="text-3xl text-on-accent" />
            </div>
          </div>
        </div>
      </div>

      <!-- Name + boot log -->
      <div class="mt-6 flex flex-col items-center transition-all duration-500" :class="leaving ? 'translate-y-4 opacity-0' : ''">
        <img :src="logo.light" :alt="profile.name" class="h-16 w-auto sm:h-20 dark:hidden" />
        <img :src="logo.dark" :alt="profile.name" class="hidden h-14 w-auto drop-shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_35%,transparent)] sm:h-20 dark:block" />
        <p class="mt-3 font-mono text-[10px] tracking-[0.3em] text-subtle uppercase">AI Engineer ✦ Full-Stack Developer</p>

        <div class="mt-8 w-64">
          <div class="flex items-center justify-between font-mono text-[11px]">
            <span class="flex items-center gap-2 text-muted">
              <span class="size-1.5 animate-pulse rounded-full bg-accent" />{{ status }}
            </span>
            <span class="text-fg tabular-nums">{{ String(count).padStart(3, '0') }}%</span>
          </div>
          <div class="mt-2 h-1 overflow-hidden rounded-full bg-fg/10">
            <div class="h-full rounded-full bg-linear-to-r from-accent to-accent-3 shadow-[0_0_12px_var(--accent)]" :style="{ width: `${count}%` }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
