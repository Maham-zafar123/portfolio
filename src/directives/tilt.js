// v-tilt or v-tilt="10": 3D tilt that follows the cursor (max angle in degrees).
// Also feeds --mx/--my so a `.glare` element can draw a light spot, and
// children with `[data-depth]` are pushed forward in Z for a layered parallax look.
const disabled = () => window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches

export const tilt = {
  mounted(el, binding) {
    if (disabled()) return
    const max = binding.value ?? 8
    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.willChange = 'transform'
    let frame = 0

    el._tiltMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transition = 'transform 0.15s ease-out'
        el.style.transform = `perspective(1100px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale3d(1.015,1.015,1.015)`
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    }
    el._tiltLeave = () => {
      cancelAnimationFrame(frame)
      el.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = ''
    }
    el.addEventListener('mousemove', el._tiltMove)
    el.addEventListener('mouseleave', el._tiltLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', el._tiltMove)
    el.removeEventListener('mouseleave', el._tiltLeave)
  },
}
