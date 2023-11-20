/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)


// const cors = require('cors')
// const corsOptions = {
//     origin:'http://localhost:3000/',
//     credentials:true,
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.mount('#app')
