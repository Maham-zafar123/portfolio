<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const script = [
  { cmd: 'whoami', out: 'maham-zafar · software & ai engineer' },
  { cmd: 'cat focus.txt', out: 'llm · rag · agentic ai · full-stack' },
  { cmd: 'ls ./stack', out: 'python  vue  django  fastapi  langgraph' },
  { cmd: 'git log -1 --oneline', out: 'a1f9c2e feat: DonutDoc IDP → 95% accuracy' },
]

const root = ref(null)
const lines = ref([])
const typing = ref('')
const timers = []
let alive = true
let observer

const wait = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lines.value = script.flatMap((s) => [{ cmd: true, text: s.cmd }, { text: s.out }])
    return
  }
  // Start typing once the terminal scrolls into view.
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    observer.disconnect()
    play()
  }, { threshold: 0.4 })
  observer.observe(root.value)
})

async function play() {
  await wait(400)
  for (const step of script) {
    for (const ch of step.cmd) {
      if (!alive) return
      typing.value += ch
      await wait(40 + Math.random() * 60)
    }
    await wait(260)
    lines.value.push({ cmd: true, text: step.cmd })
    typing.value = ''
    await wait(140)
    lines.value.push({ text: step.out })
    await wait(650)
  }
}

onBeforeUnmount(() => {
  alive = false
  observer?.disconnect()
  timers.forEach(clearTimeout)
})
</script>

<template>
  <div ref="root" class="overflow-hidden rounded-2xl border border-line bg-surface/85 shadow-2xl shadow-black/25 backdrop-blur-xl">
    <div class="flex items-center gap-1.5 border-b border-line bg-surface-2/70 px-4 py-2.5">
      <span class="size-2.5 rounded-full bg-[#ff5f57]" />
      <span class="size-2.5 rounded-full bg-[#febc2e]" />
      <span class="size-2.5 rounded-full bg-[#28c840]" />
      <span class="ml-3 font-mono text-[11px] text-subtle">~/maham — zsh</span>
    </div>
    <div class="min-h-[13.5rem] space-y-1 p-4 font-mono text-[12.5px] leading-relaxed">
      <p v-for="(line, i) in lines" :key="i" :class="line.cmd ? 'text-fg' : 'pl-4 text-muted'">
        <span v-if="line.cmd" class="mr-2 text-accent-ink">❯</span>{{ line.text }}
      </p>
      <p class="text-fg">
        <span class="mr-2 text-accent-ink">❯</span>{{ typing }}<span class="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-blink bg-accent" />
      </p>
    </div>
  </div>
</template>
