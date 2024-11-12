import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import MicroModal from 'micromodal';  // es6 module

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

// Import specific icons
import { faFolder, faFile, faHome } from '@fortawesome/free-solid-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolder, faFile, faHome);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

const pinia = createPinia();
app.use(MicroModal);

app.use(pinia);

app.mount('#app');
