import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import Store, { key } from './Vuex/Store'

const app = createApp(App)
app.use(router)
app.use(Store, key);


app.mount('#root')
