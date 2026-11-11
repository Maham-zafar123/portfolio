<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navLinks, profile } from '../data/portfolio'
import { modKey, paletteOpen } from '../composables/usePalette'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
const query = ref('')
const index = ref(0)
const input = ref(null)

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const openUrl = (url) => window.open(url, '_blank', 'noopener')
const download = () => {
  const a = document.createElement('a')
  a.href = profile.resume
  a.download = ''
  a.click()
}

const items = computed(() => [
  ...navLinks.map((l) => ({ group: 'Navigate', label: l.label, icon: 'fa-solid fa-hashtag', run: () => goTo(l.id) })),
  { group: 'Actions', label: 'Download CV', icon: 'fa-solid fa-file-arrow-down', run: download },
  { group: 'Actions', label: 'Copy email address', icon: 'fa-regular fa-copy', run: () => navigator.clipboard?.writeText(profile.email) },
  {
    group: 'Actions',
    label: isDark.value ? 'Switch to light theme' : 'Switch to dark theme',
    icon: isDark.value ? 'fa-regular fa-sun' : 'fa-regular fa-moon',
    run: () => toggle(),
  },
  { group: 'Links', label: 'GitHub', icon: 'fa-brands fa-github', run: () => openUrl(profile.github) },
  { group: 'Links', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', run: () => openUrl(profile.linkedin) },
  { group: 'Links', label: 'Send an email', icon: 'fa-regular fa-envelope', run: () => (window.location.href = `mailto:${profile.email}`) },
])

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? items.value.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q)) : items.value
})

const run = (item) => {
  paletteOpen.value = false
  item?.run()
}

watch(query, () => (index.value = 0))
watch(paletteOpen, async (v) => {
  document.body.classList.toggle('overflow-hidden', v)
  if (!v) return
  query.value = ''
  index.value = 0
  await nextTick()
  input.value?.focus()
})

const onKey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
    return
  }
  if (!paletteOpen.value) return
  const count = results.value.length
  if (e.key === 'Escape') paletteOpen.value = false
  else if (e.key === 'ArrowDown' && count) {
    e.preventDefault()
    index.value = (index.value + 1) % count
  } else if (e.key === 'ArrowUp' && count) {
    e.preventDefault()
    index.value = (index.value - 1 + count) % count
  } else if (e.key === 'Enter') {
    e.preventDefault()
    run(results.value[index.value])
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="pop">
      <div
        v-if="paletteOpen"
        class="fixed inset-0 z-[120] flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-md"
        @click.self="paletteOpen = false"
      >
        <div class="pop-panel glass-strong w-full max-w-lg overflow-hidden rounded-3xl" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="flex items-center gap-3 border-b border-line px-4">
            <i class="fa-solid fa-magnifying-glass text-sm text-subtle" />
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Type a command or search…"
              class="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
            />
            <kbd class="kbd">esc</kbd>
          </div>

          <ul class="max-h-[50vh] overflow-y-auto p-2">
            <template v-for="(item, i) in results" :key="item.label">
              <li v-if="i === 0 || results[i - 1].group !== item.group" class="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-widest text-subtle uppercase">
                {{ item.group }}
              </li>
              <li>
                <button
                  type="button"
                  class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
                  :class="i === index ? 'bg-accent text-on-accent' : 'text-muted'"
                  @mouseenter="index = i"
                  @click="run(item)"
                >
                  <span
                    class="grid size-7 place-items-center rounded-md border text-xs transition-colors"
                    :class="i === index ? 'border-on-accent/30' : 'border-line'"
                  >
                    <i :class="item.icon" />
                  </span>
                  {{ item.label }}
                  <i v-if="i === index" class="fa-solid fa-arrow-turn-down ml-auto rotate-90 text-[10px]" />
                </button>
              </li>
            </template>
            <li v-if="!results.length" class="px-3 py-10 text-center text-sm text-subtle">No results for “{{ query }}”</li>
          </ul>

          <div class="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
            <span class="flex items-center gap-1"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> navigate</span>
            <span class="flex items-center gap-1"><kbd class="kbd">↵</kbd> select</span>
            <span class="ml-auto flex items-center gap-1"><kbd class="kbd">{{ modKey }}</kbd><kbd class="kbd">K</kbd> toggle</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
