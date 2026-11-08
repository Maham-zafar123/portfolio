// v-tilt or v-tilt="8": subtle 3D tilt that follows the cursor (max angle in degrees)
const disabled = () => window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches

export const tilt = {
  mounted(el, binding) {
    if (disabled()) return
    const max = binding.value ?? 6
    el.style.transformStyle = 'preserve-3d'
    el._tiltMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(1000px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-4px)`
    }
    el._tiltLeave = () => (el.style.transform = '')
    el.addEventListener('mousemove', el._tiltMove)
    el.addEventListener('mouseleave', el._tiltLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', el._tiltMove)
    el.removeEventListener('mouseleave', el._tiltLeave)
  },
}
