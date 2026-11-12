import { onBeforeUnmount, onMounted, ref } from 'vue'

// Scroll position, page progress (0-1) and the id of the section in view.
export function useScroll(sectionIds = []) {
  const scrollY = ref(0)
  const progress = ref(0)
  const activeId = ref('')

  const update = () => {
    scrollY.value = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? window.scrollY / max : 0

    const probe = window.innerHeight * 0.35
    let current = ''
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= probe) current = id
    }
    activeId.value = current
  }

  let frame = 0
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()))
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { scrollY, progress, activeId }
}

// Feeds the cursor position into a .spotlight element's --mx/--my.
export function onSpotlight(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
