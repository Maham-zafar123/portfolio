import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { tilt } from './directives/tilt'
import { magnetic } from './directives/magnetic'
import './style.css'

createApp(App).directive('reveal', reveal).directive('tilt', tilt).directive('magnetic', magnetic).mount('#app')
