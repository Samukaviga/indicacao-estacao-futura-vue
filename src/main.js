import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './assets/css/main.css';
import { createGtm } from 'vue-gtm'

import { mask } from 'vue-the-mask';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router).use(pinia);

app.use(createGtm({
    id: 'GTM-WJ7DZWG2',
    enabled: true,
    debug: false,
    vueRouter: router,
}))

app.directive('mask', mask);

app.mount('#app');
