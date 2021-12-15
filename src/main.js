import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {loader} from "vue-ui-preloader";


createApp(App).use(store).use(router).use(loader).mount('#app')

