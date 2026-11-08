import { ref } from 'vue'

export const paletteOpen = ref(false)
export const modKey = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'
