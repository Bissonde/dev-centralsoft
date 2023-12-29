/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import vue3GoogleLogin from 'vue3-google-login'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import './interceptors/axios'

// const app = createApp(App).use(Particles)

const app = createApp(App).use(Particles, {
    init: async engine => {
        // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
    },
});

app.use(vue3GoogleLogin, {
    clientId: '939069661433-5em5l5aq1ubvrhr26u9ba20sn36rvpfs.apps.googleusercontent.com'
})

registerPlugins(app)


// const cors = require('cors')
// const corsOptions = {
//     origin:'http://localhost:3000/',
//     credentials:true,
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


// var cors = require('cors')
// app.use(cors())

app.mount('#app')


