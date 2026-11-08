<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile, skillGroups, stats } from '../data/portfolio'
import { modKey, paletteOpen } from '../composables/usePalette'
import StatCounter from './StatCounter.vue'
import TechIcon from './TechIcon.vue'

const words = ['AI agents', 'RAG pipelines', 'LLM products', 'full-stack apps']
const wordIndex = ref(0)
let timer
onMounted(() => (timer = setInterval(() => (wordIndex.value = (wordIndex.value + 1) % words.length), 2400)))
onBeforeUnmount(() => clearInterval(timer))

const outerOrbit = ['Python', 'Vue.js', 'Hugging Face', 'Django', 'LangChain', 'FastAPI']
const innerOrbit = ['PyTorch', 'Google Gemini', 'TensorFlow', 'MongoDB']
const dailyDrivers = ['Python', 'Vue.js', 'Django', 'FastAPI', 'LangGraph', 'Hugging Face']

// Place n items evenly around a circle (percent coordinates).
const orbitPos = (i, n, offset = -90) => {
  const a = ((offset + (360 / n) * i) * Math.PI) / 180
  return { left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }
}

const socials = [
  { href: profile.github, icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: profile.linkedin, icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: `mailto:${profile.email}`, icon: 'fa-regular fa-envelope', label: 'Email' },
]

const marquee = skillGroups.flatMap((g) => g.skills)
</script>

<template>
  <section id="top" class="relative isolate overflow-hidden pt-32 sm:pt-40">
    <!-- Aurora + perspective grid floor -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute -top-40 left-[10%] size-[38rem] animate-aurora rounded-full bg-accent/25 blur-[130px]" />
      <div class="absolute top-[10%] -right-32 size-[30rem] animate-aurora rounded-full bg-accent-2/15 blur-[120px] [animation-delay:-7s]" />
      <div class="absolute bottom-0 left-1/3 size-[26rem] animate-aurora rounded-full bg-fuchsia-500/10 blur-[120px] [animation-delay:-13s]" />
      <div class="absolute inset-x-0 bottom-0 h-[55%] [perspective:700px]">
        <div
          class="absolute inset-x-[-50%] bottom-[-30%] h-[160%] origin-bottom [transform:rotateX(62deg)] [mask-image:linear-gradient(to_top,black_20%,transparent_75%)]"
          style="
            background-image:
              linear-gradient(to right, color-mix(in oklab, var(--accent) 22%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklab, var(--accent) 22%, transparent) 1px, transparent 1px);
            background-size: 64px 64px;
          "
        />
      </div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bg to-transparent" />
    </div>

    <div class="container-x grid items-center gap-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24">
      <!-- Copy -->
      <div class="text-center lg:text-left">
        <div v-reveal class="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-1.5 text-xs text-muted backdrop-blur">
          <img :src="profile.photo" alt="" class="size-6 rounded-full object-cover object-top" />
          <span class="relative flex size-2">
            <span class="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400" />
            <span class="relative size-2 rounded-full bg-emerald-400" />
          </span>
          Open to work · {{ profile.location }}
        </div>

        <p v-reveal="80" class="mt-8 font-mono text-sm text-accent-ink">Hi there, I'm</p>
        <h1 v-reveal="120" class="mt-2 text-6xl leading-[0.9] font-semibold tracking-tighter text-fg sm:text-7xl xl:text-8xl">
          {{ profile.name }}
        </h1>

        <p v-reveal="200" class="mt-5 text-3xl font-medium tracking-tight text-muted sm:text-4xl">
          I build
          <span class="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
            <Transition name="word" mode="out-in">
              <span :key="wordIndex" class="whitespace-nowrap"><span class="text-gradient">{{ words[wordIndex] }}</span></span>
            </Transition>
          </span>
        </p>

        <p v-reveal="280" class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
          Software &amp; AI Engineer building production-ready LLM, RAG and agentic systems, and the Vue.js, Django and FastAPI apps around them.
        </p>

        <div v-reveal="360" class="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a href="#projects" class="btn-accent group">
            View my work <i class="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1" />
          </a>
          <a :href="profile.resume" download class="btn-outline"><i class="fa-solid fa-download" /> Download CV</a>
          <div class="flex items-center gap-1">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noopener"
              class="grid size-10 place-items-center rounded-full text-muted transition hover:-translate-y-0.5 hover:bg-surface-2 hover:text-fg"
            >
              <i :class="s.icon" />
            </a>
          </div>
        </div>

        <div v-reveal="440" class="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <span class="font-mono text-[11px] tracking-widest text-subtle uppercase">Daily drivers</span>
          <ul class="flex items-center gap-2">
            <li v-for="t in dailyDrivers" :key="t" class="group relative">
              <span class="grid size-10 place-items-center rounded-xl border border-line bg-surface/70 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/50">
                <TechIcon :name="t" size="size-5" />
              </span>
              <span class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-fg px-2 py-1 font-mono text-[10px] whitespace-nowrap text-bg opacity-0 transition group-hover:opacity-100">
                {{ t }}
              </span>
            </li>
          </ul>
          <button
            type="button"
            class="hidden items-center gap-1.5 font-mono text-xs text-subtle transition hover:text-fg xl:inline-flex"
            @click="paletteOpen = true"
          >
            · press <kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd>
          </button>
        </div>
      </div>

      <!-- Portrait with orbiting tech -->
      <div v-reveal:zoom="200" class="group relative mx-auto aspect-square w-[min(27rem,82vw)]">
        <div class="absolute inset-0 rounded-full border border-dashed border-line" />
        <div class="absolute inset-[11%] rounded-full border border-line" />

        <div class="absolute inset-0 animate-orbit group-hover:[animation-play-state:paused]">
          <span
            v-for="(t, i) in outerOrbit"
            :key="t"
            class="absolute -translate-x-1/2 -translate-y-1/2"
            :style="orbitPos(i, outerOrbit.length)"
          >
            <span class="grid size-12 animate-orbit-reverse place-items-center rounded-2xl border border-line bg-surface/90 shadow-lg shadow-black/10 backdrop-blur group-hover:[animation-play-state:paused]">
              <TechIcon :name="t" size="size-6" />
            </span>
          </span>
        </div>
        <div class="absolute inset-[11%] animate-orbit-fast group-hover:[animation-play-state:paused]">
          <span
            v-for="(t, i) in innerOrbit"
            :key="t"
            class="absolute -translate-x-1/2 -translate-y-1/2"
            :style="orbitPos(i, innerOrbit.length, -45)"
          >
            <span class="grid size-10 animate-orbit-fast-reverse place-items-center rounded-xl border border-line bg-surface/90 shadow-lg shadow-black/10 backdrop-blur group-hover:[animation-play-state:paused]">
              <TechIcon :name="t" size="size-5" />
            </span>
          </span>
        </div>

        <!-- Photo -->
        <div class="absolute inset-[23%]">
          <div class="absolute -inset-3 animate-orbit rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--accent-3),var(--accent-2),transparent_70%,var(--accent))] opacity-80 blur-xl" />
          <div class="glow-border relative size-full overflow-hidden rounded-full border border-line bg-surface-2">
            <img :src="profile.photo" :alt="profile.name" class="size-full object-cover object-[50%_20%]" fetchpriority="high" />
          </div>
        </div>

        <!-- Floating cards -->
        <div class="absolute bottom-[4%] -left-[6%] z-10 animate-float rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl shadow-black/15 backdrop-blur-xl">
          <p class="text-2xl font-semibold tracking-tight text-fg">95%</p>
          <p class="font-mono text-[10px] text-subtle">IDP accuracy</p>
        </div>
        <div class="absolute top-[6%] -right-[4%] z-10 animate-float rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl shadow-black/15 backdrop-blur-xl [animation-delay:-3s]">
          <p class="flex items-center gap-2 text-sm font-medium text-fg">
            <i class="fa-solid fa-robot text-accent-ink" /> Agentic AI
          </p>
          <p class="font-mono text-[10px] text-subtle">LangGraph · R2R</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="container-x">
      <dl v-reveal class="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-xl sm:grid-cols-4">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="border-line p-5 sm:p-6"
          :class="[i % 2 === 0 ? 'border-r' : 'sm:border-r', i < 2 ? 'border-b sm:border-b-0' : '', i === 3 ? 'sm:border-r-0' : '']"
        >
          <dt class="font-mono text-[11px] tracking-wide text-subtle uppercase">{{ s.label }}</dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            <StatCounter :value="s.value" :suffix="s.suffix" :decimals="s.decimals" />
          </dd>
        </div>
      </dl>
    </div>

    <!-- Tech marquee -->
    <div class="mt-16 border-y border-line bg-surface/40 py-4">
      <div class="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul class="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
          <li
            v-for="(skill, i) in [...marquee, ...marquee]"
            :key="i"
            class="flex items-center gap-2.5 font-mono text-sm whitespace-nowrap text-muted"
          >
            <TechIcon :name="skill" size="size-5" />{{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
