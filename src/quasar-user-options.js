import { Notify } from 'quasar'
import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: {
      position: 'bottom-right',
      textColor: 'lightText',
      // color: 'info'
    },
    brand: {
      primary: '#3D2961',
      accent: '#ff6453',
      secondary: '#1A1229',
      lightText: '#8276a0',
      info: '#2c1e45'
    }
  },
  plugins: {
    Notify
  }
}
