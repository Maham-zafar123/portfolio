<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile, skillGroups, stats } from '../data/portfolio'
import StatCounter from './StatCounter.vue'
import TechIcon from './TechIcon.vue'

const words = ['AI agents', 'Vue.js frontends', 'RAG pipelines', 'Django & Node APIs', 'LLM products', 'full-stack web apps']
const wordIndex = ref(0)
let wordTimer
onMounted(() => (wordTimer = setInterval(() => (wordIndex.value = (wordIndex.value + 1) % words.length), 2600)))
onBeforeUnmount(() => clearInterval(wordTimer))

const first = profile.firstName.split('')
const lastName = profile.name.replace(profile.firstName, '').trim()

const socials = [
  { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: profile.linkedin, icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope', label: 'Email' },
]

// Icons riding the tilted 3D orbits
const outerRing = ['Python', 'Vue.js', 'Hugging Face', 'Django', 'LangChain', 'FastAPI', 'PyTorch', 'MongoDB']
const innerRing = ['TensorFlow', 'Google Gemini', 'React', 'OpenCV']
const pos = (i, n) => {
  const a = (i / n) * Math.PI * 2
  return { left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }
}

// Scene follows the mouse (lerped) and sways gently when idle
const rig = ref(null)
let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, interactive = false
const onMove = (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 2
  ty = (e.clientY / window.innerHeight - 0.5) * 2
}
const loop = (t) => {
  cx += (tx - cx) * 0.05
  cy += (ty - cy) * 0.05
  const swayY = Math.sin(t / 2600) * 4
  const swayX = Math.cos(t / 3200) * 2
  if (rig.value) rig.value.style.transform = `rotateX(${-cy * 9 + swayX}deg) rotateY(${cx * 14 + swayY}deg)`
  raf = requestAnimationFrame(loop)
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  interactive = window.matchMedia('(hover: hover)').matches
  if (interactive) window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
})

const ribbon = skillGroups.flatMap((g) => g.skills)
</script>

<template>
  <section id="top" class="relative flex min-h-[100svh] flex-col justify-center overflow-x-clip pt-28 pb-10 lg:pt-24">
    <div class="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
      <!-- Copy -->
      <div class="relative z-10 text-center lg:text-left">
        <div class="intro inline-flex items-center gap-2.5 rounded-full glass py-1.5 pr-4 pl-1.5 text-xs text-muted" style="--d: 100ms">
          <span class="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-semibold text-on-accent">
            <span class="size-1.5 animate-pulse rounded-full bg-on-accent" /> Available
          </span>
          AI Engineer + Full-Stack Developer · {{ profile.location }}
        </div>

        <h1 class="mt-8 text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.9] font-extrabold tracking-[-0.055em] text-fg [perspective:800px]">
          <span class="block">
            <span v-for="(c, i) in first" :key="'f' + i" class="letter" :style="{ '--d': `${250 + i * 55}ms` }">{{ c }}</span>
          </span>
          <span class="block pb-[0.06em] font-semibold italic">
            <span class="letter pr-[0.06em]" style="--d: 560ms"><span class="text-gradient">{{ lastName }}</span></span><span class="letter text-accent" style="--d: 760ms">.</span>
          </span>
        </h1>

        <p class="intro mt-7 text-xl font-medium tracking-tight text-fg sm:text-2xl" style="--d: 800ms">
          I design &amp; ship
          <span class="relative inline-grid h-[1.3em] overflow-hidden align-bottom [perspective:600px]">
            <Transition name="word" mode="out-in">
              <span :key="wordIndex" class="whitespace-nowrap text-accent-ink">{{ words[wordIndex] }}</span>
            </Transition>
          </span>
        </p>
        <p class="intro mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted lg:mx-0" style="--d: 900ms">
          I build intelligent AI systems (LLMs, RAG and agents) <em class="text-fg not-italic">and</em> the full-stack web apps that put them in people's hands.
        </p>

        <!-- Two tracks at a glance -->
        <div class="intro mt-6 flex flex-wrap justify-center gap-2 lg:justify-start" style="--d: 950ms">
          <a href="#expertise" class="glass group flex items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2 transition hover:-translate-y-0.5 hover:border-accent/50">
            <span class="grid size-8 place-items-center rounded-xl bg-accent/15 text-accent-ink"><i class="fa-solid fa-brain text-sm" /></span>
            <span class="text-left leading-tight">
              <span class="block text-sm font-semibold text-fg">AI Engineering</span>
              <span class="block font-mono text-[10px] text-subtle">LLMs · RAG · Agents</span>
            </span>
          </a>
          <a href="#expertise" class="glass group flex items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2 transition hover:-translate-y-0.5 hover:border-accent-3/60">
            <span class="grid size-8 place-items-center rounded-xl bg-accent-3/15 text-accent-3"><i class="fa-solid fa-code text-sm" /></span>
            <span class="text-left leading-tight">
              <span class="block text-sm font-semibold text-fg">Full-Stack Web</span>
              <span class="block font-mono text-[10px] text-subtle">Vue · React · Django · Node</span>
            </span>
          </a>
        </div>

        <div class="intro mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start" style="--d: 1000ms">
          <a v-magnetic href="#projects" class="btn-accent group !px-7 !py-3.5">
            See my work <i class="fa-solid fa-arrow-right -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
          </a>
          <a v-magnetic :href="profile.resume" download class="btn-glass !px-6 !py-3.5"><i class="fa-solid fa-arrow-down text-xs" /> Download CV</a>
          <div class="flex gap-1.5">
            <a
              v-for="s in socials"
              :key="s.label"
              v-magnetic="0.4"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noopener"
              class="grid size-12 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
            >
              <i :class="s.icon" />
            </a>
          </div>
        </div>

        <!-- Stats strip -->
        <dl class="intro glass mt-10 grid grid-cols-4 rounded-3xl p-1.5" style="--d: 1100ms">
          <div v-for="(s, i) in stats" :key="s.label" class="relative px-2 py-3 text-center sm:px-4 lg:text-left">
            <span v-if="i" class="absolute top-1/4 left-0 h-1/2 w-px bg-line" />
            <dd class="font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
              <StatCounter :value="s.value" :suffix="s.suffix" :decimals="s.decimals" />
            </dd>
            <dt class="mt-0.5 font-mono text-[9px] tracking-wide text-subtle uppercase sm:text-[10px]">{{ s.label }}</dt>
          </div>
        </dl>
      </div>

      <!-- 3D scene -->
      <div class="intro relative mx-auto aspect-square w-[min(36rem,88vw)] [perspective:1600px]" style="--d: 300ms" aria-hidden="true">
        <div ref="rig" class="absolute inset-0 preserve-3d">
          <!-- Glow pool far behind -->
          <div class="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_35%,transparent),color-mix(in_oklab,var(--accent-3)_18%,transparent)_45%,transparent_70%)] [transform:translateZ(-220px)]" />

          <!-- Stacked plates for depth -->
          <div class="absolute inset-x-[24%] inset-y-[12%] rounded-[2.5rem] border border-accent-3/30 bg-linear-to-br from-accent-3/25 to-transparent [transform:translateZ(-150px)_rotate(-9deg)]" />
          <div class="absolute inset-x-[24%] inset-y-[12%] rounded-[2.5rem] border border-accent/30 bg-linear-to-br from-accent/25 to-transparent [transform:translateZ(-75px)_rotate(6deg)]" />

          <!-- Outer orbit -->
          <div class="absolute inset-[1%] preserve-3d [transform:rotateX(72deg)_rotateY(-8deg)]">
            <div class="absolute inset-0 animate-[ring-spin_36s_linear_infinite] rounded-full border border-accent/40 preserve-3d">
              <div class="absolute inset-[-2px] rounded-full border-2 border-transparent border-t-accent/80" />
              <span v-for="(t, i) in outerRing" :key="t" class="absolute preserve-3d" :style="pos(i, outerRing.length)">
                <span class="block animate-[ring-unspin_36s_linear_infinite] preserve-3d">
                  <span class="block [transform:translate(-50%,-50%)_rotateY(8deg)_rotateX(-72deg)]">
                    <span class="grid size-12 place-items-center rounded-2xl border border-white/20 bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]">
                      <TechIcon :name="t" size="size-6" />
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>

          <!-- Portrait card -->
          <div class="absolute inset-x-[25%] inset-y-[13%] overflow-hidden rounded-[2.25rem] border border-white/25 bg-surface-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]" data-cursor="hi!">
            <img :src="profile.photo" :alt="profile.name" fetchpriority="high" class="size-full object-cover object-[50%_20%]" />
            <div class="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-white/10" />
            <div class="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 text-white backdrop-blur-md">
              <p class="font-display text-sm font-semibold">{{ profile.name }}</p>
              <p class="font-mono text-[9px] text-white/75">UET Taxila · SE '26</p>
            </div>
          </div>

          <!-- Inner orbit (crosses in front of the portrait) -->
          <div class="absolute inset-[16%] preserve-3d [transform:rotateX(66deg)_rotateY(14deg)]">
            <div class="absolute inset-0 animate-[ring-spin_24s_linear_infinite_reverse] rounded-full border border-dashed border-accent-3/50 preserve-3d">
              <span v-for="(t, i) in innerRing" :key="t" class="absolute preserve-3d" :style="pos(i, innerRing.length)">
                <span class="block animate-[ring-unspin_24s_linear_infinite_reverse] preserve-3d">
                  <span class="block [transform:translate(-50%,-50%)_rotateY(-14deg)_rotateX(-66deg)]">
                    <span class="grid size-10 place-items-center rounded-xl border border-white/20 bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)]">
                      <TechIcon :name="t" size="size-5" />
                    </span>
                  </span>
                </span>
              </span>
            </div>
          </div>

          <!-- Floating glass cards, pushed toward the viewer -->
          <div class="absolute top-[20%] -left-[2%] animate-float" style="--z: 160px; animation-delay: -2s">
            <div class="glass-strong rounded-2xl px-4 py-3">
              <p class="font-display text-2xl font-bold text-accent-ink">95%</p>
              <p class="font-mono text-[10px] text-subtle">IDP accuracy</p>
            </div>
          </div>
          <div class="absolute top-[8%] right-[2%] animate-float" style="--z: 120px">
            <div class="glass-strong flex items-center gap-2.5 rounded-2xl px-4 py-3">
              <span class="grid size-8 place-items-center rounded-lg bg-accent text-sm text-on-accent"><i class="fa-solid fa-robot" /></span>
              <div>
                <p class="text-sm font-semibold text-fg">Agentic AI</p>
                <p class="font-mono text-[10px] text-subtle">LangGraph · R2R</p>
              </div>
            </div>
          </div>
          <div class="absolute right-[0%] bottom-[16%] animate-float" style="--z: 190px; animation-delay: -4s">
            <div class="glass-strong flex items-center gap-2 rounded-full px-4 py-2.5">
              <i class="fa-solid fa-code text-accent-3" />
              <p class="font-mono text-[11px] text-fg">Full-Stack · Vue · Django · Node</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill ribbon -->
    <div class="relative mt-14 -rotate-2 border-y border-line glass py-4" aria-hidden="true">
      <div class="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul class="flex w-max animate-marquee gap-10">
          <li v-for="(s, i) in [...ribbon, ...ribbon]" :key="i" class="flex items-center gap-3 font-mono text-sm whitespace-nowrap text-muted">
            <TechIcon :name="s" size="size-5" /> {{ s }} <i class="fa-solid fa-asterisk ml-7 text-[10px] text-accent" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
