import { logger } from "../utils/Logger.js";
import { ref } from "vue";
import { spotifyLoginService } from "./SpotifyLoginService.js";
import { spotifyApi } from "./AxiosService.js";
import axios from "axios";
import { AppState } from "../AppState.js";
import { Device } from "../models/Device.js";
import Pop from "../utils/Pop.js";
import { spotifyApiService } from "./SpotifyApiService.js";
class SpotifyPlayerService {

  player = ref(null)
  // call this onMounted
  async StartPlayer() {
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
  async second() {
    await spotifyApiService.getActiveTrack()
  }

  intervalId = 0
   async currentPosition() {
    if(AppState.isPlaying === true) {
      let interval = setInterval(this.second, 1000)
      this.intervalId = interval
    }
    else {
      clearInterval(this.intervalId)
    }
  }

  async changeTrackPosition(position) {
    try {
      logger.log(position)
      const bearerToken = localStorage.getItem('access_token')
      const headers = new Headers({
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const url = `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`
      fetch(url, {
        method: 'PUT',
        headers: headers,
      }).then(response => {
        if (response.ok) {
          logger.log('Changed Song Position');
        } else {
          logger.log('Could not change position in active song');
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

  async togglePlay() {
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
      let index = AppState.playingTimeBlock.trackList.findIndex(track => track.id == AppState.activeTrack.id)
      if (AppState.playingTimeBlock.trackList[index + 1]) {
        let nextTrack = AppState.playingTimeBlock.trackList[index + 1]
        AppState.nextTrack = nextTrack
        logger.log('Added next song to Appstate', nextTrack)
        await this.loadSong(AppState.nextTrack.id)
      }
      else {
        Pop.toast('No songs remaining in the playlist')
      }
  }
  currentHistoryPosition = -1
  async playPrevious() {
    logger.log(this.currentHistoryPosition)
    if(this.currentHistoryPosition > -1){
      logger.log(AppState.trackHistory)
      this.currentHistoryPosition--
      // AppState.trackHistory = AppState.trackHistory.splice(AppState.trackHistory.length, 1)
      AppState.trackHistory.pop()
      logger.log('[Playing from History Position:]', this.currentHistoryPosition, AppState.trackHistory)
      let historyPosition = AppState.trackHistory.length
      try {
        this.loadSong(AppState.trackHistory[historyPosition - 1])
      } catch (error) {
        Pop.toast('No previous Track to Play')
      }
    } else {
      Pop.toast('No tracks in your history')
    }
  }

  async getDevices() {
    const bearerToken = localStorage.getItem('access_token')
    const res = await axios.get("https://api.spotify.com/v1/me/player/devices", { headers: { Authorization: `Bearer ${bearerToken}` } })
    AppState.devices = res.data.devices.map(device => new Device(device))
    // localStorage.setItem('device', res.data.devices[1].id)
  }

  async loadSong(trackId) {
    if(AppState.trackHistory.at(-1) != trackId){
      AppState.trackHistory.push(trackId)
      this.currentHistoryPosition++
    }
    logger.log('{This is the Track History}', AppState.trackHistory)
    const token = localStorage.getItem('access_token');
    const uris = [`spotify:track:${trackId}`];
    // logger.log('here is our context uri:', contextUri)
    const offsetPosition = 0; //NOTE: will have to change offset to accommodate for sending more than 1 track (eg a playlist)
    const positionMs = 0;
    const url = `https://api.spotify.com/v1/me/player/play`;    //?device_id=${device}
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({
      uris: uris,
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
        AppState.isPlaying = true
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
    
    logger.log(AppState.activeTimeBlock)
  }

  async addNextTrackToQueue() {
    // if() If there is a next song in the appstate, add it to queue.. else do nothing.
    let index = AppState.playingTimeBlock.trackList.findIndex(track => track.id == AppState.activeTrack.id)
    logger.log(index)
    if (AppState.playingTimeBlock.trackList[index + 1]) {
      let nextTrack = AppState.playingTimeBlock.trackList[index + 1]
      if(nextTrack != AppState.nextTrack){
      AppState.nextTrack = nextTrack
      logger.log('Added next song to Appstate', nextTrack)
      try {
        logger.log('Adding next song to queue..')
        const bearerToken = localStorage.getItem('access_token')
        const headers = new Headers({
          Authorization: `Bearer ${bearerToken}`,
        });
        const url = `https://api.spotify.com/v1/me/player/queue?uri=spotify%3Atrack%3A${AppState.nextTrack.id}`
        fetch(url, {
          method: 'POST',
          headers: headers,
          // body: body
        }).then(response => {
          if (response.ok) {
            logger.log('Added Song to Queue', AppState.nextTrack);
            AppState.trackHistory.push(AppState.nextTrack.id)
            this.currentHistoryPosition++
          } else {
            logger.log('Could not add song to queue');
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
    } else {
      logger.log('No song to add to queue')
    }
  }
    if(AppState.activeTrack){AppState.previousTrack = AppState.activeTrack}
    
  }

  // Volume is controlled by a number between 0 and 1.0
  async setVolume(volume) {
    await this.changeVolume(volume).then(() => {
    });
  }

  async changeState(){
    AppState.isPlaying = !AppState.isPlaying
    logger.log('is a song playing (changeState fxn):', AppState.isPlaying)
    return AppState.isPlaying
  }

  async changeVolume(volume) {
    try {
      logger.log('Changing the Volume')
      const bearerToken = localStorage.getItem('access_token')
      const headers = new Headers({
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      });
      const url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`
      fetch(url, {
        method: 'PUT',
        headers: headers,
      }).then(response => {
        if (response.ok) {
          logger.log('Changed Volume');
        } else {
          logger.log('error');
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
    } catch(error) {
      Pop.error(error)
    }
}


export const spotifyPlayerService = new SpotifyPlayerService