<script setup>
import { tracks } from '../data/portfolio'
import SectionHeading from './SectionHeading.vue'
import TechIcon from './TechIcon.vue'

// Per-track colour treatment: AI = aqua accent, Web = periwinkle
const dirs = ['left', 'right']
const tone = {
  ai: { text: 'text-accent-ink', bg: 'bg-accent', soft: 'bg-accent/15', border: 'hover:border-accent/60', glow: 'var(--accent)' },
  web: { text: 'text-accent-3', bg: 'bg-accent-3', soft: 'bg-accent-3/15', border: 'hover:border-accent-3/60', glow: 'var(--accent-3)' },
}

// Neural-net visual: 3 layers of nodes and every edge between neighbours
const layers = [
  [30, 75, 120],
  [20, 55, 95, 130],
  [50, 100],
]
const nodes = layers.flatMap((ys, li) => ys.map((y) => ({ x: 40 + li * 160, y })))
const edges = []
layers.forEach((ys, li) => {
  if (li === layers.length - 1) return
  ys.forEach((y1) => layers[li + 1].forEach((y2) => edges.push({ x1: 40 + li * 160, y1, x2: 40 + (li + 1) * 160, y2 })))
})
</script>

<template>
  <section id="expertise" class="relative py-14 sm:py-20">
    <div class="container-x">
      <SectionHeading
        index="01"
        eyebrow="Expertise"
        title="Two disciplines,"
        accent="one engineer."
        description="Hiring for AI or for the web? I work across both, so the models I build ship inside real, usable products."
      />

      <div class="relative grid gap-5 lg:grid-cols-2">
        <!-- Centre badge joining the two tracks -->
        <div class="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div class="glass-solid grid size-16 place-items-center rounded-full font-display text-2xl font-bold text-fg">+</div>
        </div>

        <article v-for="(t, ti) in tracks" :key="t.id" v-reveal:[dirs[ti]] class="[perspective:1600px]">
          <div
            v-tilt="5"
            class="glass glare relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 transition-colors duration-500 sm:p-8"
            :class="tone[t.id].border"
          >
            <div
              class="pointer-events-none absolute -top-28 size-72 rounded-full opacity-40"
              :class="ti ? '-left-20' : '-right-20'"
              :style="{ background: `radial-gradient(closest-side, ${tone[t.id].glow}, transparent)` }"
            />

            <!-- Header -->
            <div class="relative flex items-start justify-between gap-4">
              <div>
                <p class="eyebrow">{{ t.eyebrow }}</p>
                <h3 class="mt-3 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">{{ t.title }}</h3>
                <p class="mt-2 text-muted">{{ t.tagline }}</p>
              </div>
              <span class="grid size-14 shrink-0 place-items-center rounded-2xl text-xl text-on-accent shadow-lg" :class="tone[t.id].bg">
                <i :class="t.icon" />
              </span>
            </div>

            <!-- Visual -->
            <div class="relative mt-7 h-44 overflow-hidden rounded-2xl border border-line bg-[color-mix(in_oklab,var(--bg)_55%,transparent)]">
              <!-- AI: neural network with signals flowing along the edges -->
              <svg v-if="t.id === 'ai'" viewBox="0 0 400 150" class="size-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <line v-for="(e, i) in edges" :key="'e' + i" v-bind="e" stroke="var(--line)" stroke-width="1" />
                <line
                  v-for="(e, i) in edges"
                  :key="'p' + i"
                  v-bind="e"
                  stroke="var(--accent)"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-dasharray="6 140"
                  class="animate-[signal_2.4s_linear_infinite]"
                  :style="{ animationDelay: `${(i * 0.17) % 2.4}s` }"
                />
                <g v-for="(n, i) in nodes" :key="'n' + i">
                  <circle :cx="n.x" :cy="n.y" r="9" fill="var(--surface)" stroke="var(--accent)" stroke-width="1.5" />
                  <circle :cx="n.x" :cy="n.y" r="3.5" fill="var(--accent)" class="animate-pulse" :style="{ animationDelay: `${i * 0.2}s` }" />
                </g>
                <text x="40" y="146" text-anchor="middle" class="fill-subtle font-mono text-[8px]">input</text>
                <text x="200" y="146" text-anchor="middle" class="fill-subtle font-mono text-[8px]">retrieve · reason</text>
                <text x="360" y="146" text-anchor="middle" class="fill-subtle font-mono text-[8px]">answer</text>
              </svg>

              <!-- Web: mini browser with a component layout and live code -->
              <div v-else class="flex size-full flex-col" aria-hidden="true">
                <div class="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span class="size-2 rounded-full bg-[#ff5f57]" /><span class="size-2 rounded-full bg-[#febc2e]" /><span class="size-2 rounded-full bg-[#28c840]" />
                  <span class="mx-auto rounded-md bg-fg/5 px-3 py-0.5 font-mono text-[9px] text-subtle">app.mahamzafar.dev</span>
                </div>
                <div class="grid flex-1 grid-cols-[1fr_1.1fr] gap-3 p-3">
                  <div class="flex flex-col gap-2">
                    <div class="h-3 w-2/3 rounded bg-accent-3/50" />
                    <div class="h-2 w-full rounded bg-fg/10" />
                    <div class="h-2 w-4/5 rounded bg-fg/10" />
                    <div class="mt-auto grid grid-cols-3 gap-1.5">
                      <div v-for="k in 3" :key="k" class="h-9 animate-pulse rounded-lg bg-fg/[0.07]" :style="{ animationDelay: `${k * 0.25}s` }" />
                    </div>
                  </div>
                  <pre class="overflow-hidden rounded-lg border border-line bg-fg/[0.03] p-2 font-mono text-[8.5px] leading-[1.55] text-muted"><span class="text-accent-3">&lt;template&gt;</span>
  &lt;<span class="text-accent-ink">Dashboard</span> :data="docs" /&gt;
<span class="text-accent-3">&lt;/template&gt;</span>
<span class="text-accent-2">@api_view</span>(["GET"])
def docs(req): ...<span class="ml-0.5 inline-block h-2.5 w-1 animate-blink bg-accent-3 align-middle" /></pre>
                </div>
              </div>
            </div>

            <!-- What I do -->
            <ul class="relative mt-7 space-y-2.5">
              <li v-for="p in t.points" :key="p" class="flex gap-3 text-[15px] leading-relaxed text-muted">
                <i class="fa-solid fa-check mt-1.5 text-[11px]" :class="tone[t.id].text" />
                <span>{{ p }}</span>
              </li>
            </ul>

            <!-- Stack -->
            <div class="relative mt-7 flex flex-wrap gap-2">
              <span v-for="s in t.stack" :key="s" class="chip !py-1.5"><TechIcon :name="s" size="size-4" /> {{ s }}</span>
            </div>

            <!-- Proof + roles -->
            <div class="relative mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <p class="eyebrow mb-3">Proof</p>
                <ul class="space-y-1.5">
                  <li v-for="pr in t.proof" :key="pr.label">
                    <a :href="pr.href" class="group/l inline-flex items-center gap-2 text-sm text-fg transition hover:translate-x-1">
                      <i class="fa-solid fa-arrow-right -rotate-45 text-[10px] transition-transform group-hover/l:rotate-0" :class="tone[t.id].text" />
                      {{ pr.label }}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p class="eyebrow mb-3">Open to</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="r in t.roles" :key="r" class="rounded-full px-2.5 py-1 text-xs font-medium" :class="[tone[t.id].soft, tone[t.id].text]">{{ r }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
