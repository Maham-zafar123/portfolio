<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({ value: Number, suffix: String, decimals: { type: Number, default: 0 } })
const el = ref(null)
const display = ref((0).toFixed(props.decimals))
let observer

const animate = () => {
  const start = performance.now()
  const duration = 1600
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = (props.value * eased).toFixed(props.decimals)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animate()
      observer.disconnect()
    }
  })
  observer.observe(el.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <span ref="el">{{ display }}{{ suffix }}</span>
</template>
