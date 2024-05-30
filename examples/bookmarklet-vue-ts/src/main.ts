import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const root = document.createElement('div')
root.id = 'app'
document.body.appendChild(root)
createApp(App).mount(root)
