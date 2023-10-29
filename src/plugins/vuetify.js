/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    global: {
      ripple: true
    },
    VBtn: {
      variant: 'outlined',
      color: 'primary'
    },
    // VTextField:{
    //   variant:'outlined'
    // },
    VCardActions: {
      VBtn: {
        variant: 'outlined'
      }
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          // brand: '#2F76234',
          // background: colors.indigo.lighten5,
        },
      },
      dark: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          // brand: '#2F76234',
          // background: colors.indigo.base,
        },
      },
    },
  },
})