import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { tilt } from './directives/tilt'
import './style.css'

createApp(App).directive('reveal', reveal).directive('tilt', tilt).mount('#app')
