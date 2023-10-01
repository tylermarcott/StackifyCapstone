import { logger } from "../utils/Logger.js";
import { ref } from "vue";
import { spotifyLoginService } from "./SpotifyLoginService.js";
import { spotifyApi } from "./AxiosService.js";
import axios from "axios";
import { AppState } from "../AppState.js";
import { Device } from "../models/Device.js";

class SpotifyPlayerService {

  player = ref(null)
  // call this onMounted
  async StartPlayer() {
    //NOTE: we don't need to call requestToken bc it's already in local storage
    // await spotifyLoginService.requestToken()
    const script = await document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.addEventListener('load', () => {
    })
    window.onSpotifyWebPlaybackSDKReady = () => {
      logger.log('SPOTIFY WEB PLAYBACK READY')
      this.registerWebPlayback()
    }
    document.body.appendChild(script)
  }

  async registerWebPlayback() {
    logger.log('registering')
    const token = AppState.accessToken || localStorage.getItem('access_token');
    // eslint-disable-next-line no-undef
    this.player.value = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    })
    this.initializeListeners()
    // Ready
  }

  async initializeListeners() {
    try {
      this.player.value.setName("Stackify")
      this.player.value.addListener('ready', ({ device_id }) => {
        logger.log('Ready with Device ID', device_id);
        this.setActiveDevice(device_id)
      });
      // Not Ready
      this.player.value.addListener('not_ready', ({ device_id }) => {
        logger.log('Device ID has gone offline', device_id);
      });
      await this.player.value.connect()
      logger.log('connected')
      this.getDevices()
    } catch (error) {
      logger.error(error)
    }
  }

  async setActiveDevice(deviceId) {
    try {
      logger.log('Setting as active device..', deviceId)
      const bearerToken = localStorage.getItem('access_token')
      logger.log(bearerToken)
      const headers = new Headers({
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const url = 'https://api.spotify.com/v1/me/player'
      const body = JSON.stringify({
        device_ids: [`${deviceId}`],
        play: true
      });
      fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body
      }).then(response => {
        if (response.ok) {
          logger.log('Set the active device as current');
        } else {
          logger.log('error setting the device');
          return response.json();
        }
      }).then(data => {
        if (data) {
          logger.log(data); // Log any error message returned by Spotify API
        }
      }).catch(error => {
        logger.error('There was an error:', error);
      });
      }
    catch (error) {
      logger.log(error)
    }
  }

  togglePlay() {
    try {
      this.player.value.togglePlay().then(() => {
        logger.log('Toggled playback!');
      });

      this.player.value.getCurrentState().then(state => {
        if (!state) {
          logger.error('User is not playing music through the Web Playback SDK');
          return;
        }

        var current_track = state.track_window.current_track;
        var next_track = state.track_window.next_tracks[0];

        logger.log('Currently Playing', current_track);
        logger.log('Playing Next', next_track);
      });
    } catch (error) {
      logger.error(error)
    }
  }

  async playNext() {
    try {
      logger.log('Skipping to next track')
      const bearerToken = localStorage.getItem('access_token')
      logger.log(bearerToken)
      const headers = new Headers({
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const url = 'https://api.spotify.com/v1/me/player/next'
      fetch(url, {
        method: 'POST',
        headers: headers,
      }).then(response => {
        if (response.ok) {
          logger.log('Skipped Song');
        } else {
          logger.log('Could not skip');
          return response.json();
        }
      }).then(data => {
        if (data) {
          logger.log(data); // Log any error message returned by Spotify API
        }
      }).catch(error => {
        logger.error('There was an error:', error);
      });
    }
    catch (error) {
      logger.log(error)
    }
  }

  async playPrevious() {
    try {
      logger.log('Skipping to previous track')
      const bearerToken = localStorage.getItem('access_token')
      logger.log(bearerToken)
      const headers = new Headers({
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const url = 'https://api.spotify.com/v1/me/player/previous'
      fetch(url, {
        method: 'POST',
        headers: headers,
      }).then(response => {
        if (response.ok) {
          logger.log('Skipped Song previous');
        } else {
          logger.log('Could not skip back');
          return response.json();
        }
      }).then(data => {
        if (data) {
          logger.log(data); // Log any error message returned by Spotify API
        }
      }).catch(error => {
        logger.error('There was an error:', error);
      });
    }
    catch (error) {
      logger.log(error)
    }
  }

  async getDevices() {
    const bearerToken = localStorage.getItem('access_token')
    const res = await axios.get("https://api.spotify.com/v1/me/player/devices", { headers: { Authorization: `Bearer ${bearerToken}` } })
    logger.log('here is the list of devices pulled from the api:', res.data)
    AppState.devices = res.data.devices.map(device => new Device(device))
    logger.log('here is appstate devices', AppState.devices)
    // TODO store devices in array so we can select where to play from
    // localStorage.setItem('device', res.data.devices[1].id)
    // this.playSong()
  }

  // NOTE: we need to be able to call play song with the right track. We need to pass in 'track' as a param to playSong and set const contextUri = track.
  loadSong(trackId) {
    const token = localStorage.getItem('access_token');
    logger.log(token)
    const contextUri = trackId;
    const offsetPosition = 5;
    const positionMs = 0;
    const url = `https://api.spotify.com/v1/me/player/play`;    //?device_id=${device}
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({
      context_uri: contextUri,
      offset: {
        position: offsetPosition
      },
      position_ms: positionMs,
      // active_device: device
    });
    fetch(url, {
      method: 'PUT',
      headers: headers,
      body: body
    }).then(response => {
      if (response.ok) {
        logger.log('Song played successfully.');
      } else {
        logger.log('Error playing the song.');
        return response.json();
      }
    }).then(data => {
      if (data) {
        logger.log(data); // Log any error message returned by Spotify API
      }
    }).catch(error => {
      logger.error('There was an error:', error);
    });
  }

}

export const spotifyPlayerService = new SpotifyPlayerService