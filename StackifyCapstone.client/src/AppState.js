import { reactive } from 'vue'
import { Device } from "./models/Device.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {Device[]} */
  devices: [],
  /** @type {Device} */
  activeDevice: {}
})
