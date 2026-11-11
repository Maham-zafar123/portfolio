// v-reveal            -> fade up when scrolled into view
// v-reveal:left       -> slide from the left (also: right, zoom)
// v-reveal="150"      -> delay in ms
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -4% 0px' },
      )
    : null

export const reveal = {
  mounted(el, binding) {
    el.dataset.reveal = binding.arg || 'up'
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (observer) observer.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
