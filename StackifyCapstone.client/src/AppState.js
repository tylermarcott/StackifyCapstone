import { reactive } from 'vue'
import { Device } from "./models/Device.js"
import { Timeblock } from './models/Timeblock.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {Device[]} */
  devices: [],

  /** @type {Device} */
  activeDevice: {},

  /** @type {Track[]} */
  tracks: [],

  /**@type {Event[]} */
  events: [],

  /**@type {Event} */
  activeEvent: null,

  /**@type {Timeblock[]} */
  myTimeBlocks: null,

 /**@type {Timeblock} */
  activeTimeBlock: null,

  timeblockTrack: null,

  timeblockTrackDetails: null,

  timeblockTrackYear: null,

  playingTimeBlock: null,

  gettingActiveTimeblock: false,

  paused: true,

  /**@type {Track} */
  trackToAdd: null,

  isPlaying: null,

  authCode: null,

  accessToken: null,

  tokenOk: false,

  refreshToken: null,

  tokenExpire: null,

  activeTrack: null,

  activeTrackDetails: null,

  nextTrack: null,

  trackHistory: [],

})
