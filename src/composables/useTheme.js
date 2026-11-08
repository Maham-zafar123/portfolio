import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

function setDark(dark) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {}
}

export function useTheme() {
  // Pass the click event to grow the new theme out from the cursor.
  const toggle = (event) => {
    const next = !isDark.value
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduced) return setDark(next)

    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    document.startViewTransition(() => setDark(next)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }
  return { isDark, toggle }
}
