/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
}

export default createVuetify({
  components: {
    VDataTable,
  },
})

