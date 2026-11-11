// v-magnetic or v-magnetic="0.4": element drifts toward the cursor while hovered.
const disabled = () => window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches

export const magnetic = {
  mounted(el, binding) {
    if (disabled()) return
    const strength = binding.value ?? 0.3
    el._magMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transition = 'transform 0.2s ease-out'
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
    }
    el._magLeave = () => {
      el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = ''
    }
    el.addEventListener('mousemove', el._magMove)
    el.addEventListener('mouseleave', el._magLeave)
  },
  unmounted(el) {
    el.removeEventListener('mousemove', el._magMove)
    el.removeEventListener('mouseleave', el._magLeave)
  },
}
