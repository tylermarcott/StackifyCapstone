<template>
  <section class="row m-0 p-0">
    <div class="col-12 player d-flex justify-content-center align-items-center">
        <section class="row w-100 m-0 p-0 d-flex">
        <div class="col-6 col-md-3 devices d-flex justify-content-center align-items-center order-first">
            <!-- <i class="devices-icon mdi mdi-shuffle-variant"></i> -->
        </div>
        <div class="col-12 col-md-6 player-controls d-flex justify-content-center p-0 order-1 order-md-0">
            <button @click="playPrevious()" class="previous elevation-5">
            <i class="mdi mdi-skip-previous"></i>
            </button>
            <!-- NOTE play/pause button -->
            <button @click="togglePlay()" class="play elevation-5">
              <i v-if="!isPlaying" class="mdi mdi-play"></i>
              <i v-if="isPlaying" class="mdi mdi-pause"></i>
            </button>
            <button @click="playNext()" class="next elevation-5">
            <i class="mdi mdi-skip-next"></i>
            </button>
        </div>
        <div class="col-6 col-md-3 devices d-flex justify-content-start align-items-center order-0 order-md-1">
            <i @click="showVolume()" class="devices-icon mdi mdi-volume-high"></i>
            <input id="volume-slider" class="volume-bar mx-2" hidden type="range" v-model="volume" max="100" min="0" step="10" @input="setVolume()"/>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center order-last">
            <p v-if="activeTrack" class="duration-text m-0">{{ msToTime(activeTrack.progress) }}</p>
            <input v-if="activeTrack" class="song-duration-bar" v-model="trackPosition" type="range" min="0" step="100" id="song-duration-bar" @click.prevent="() => {if(isPlaying){togglePlay()}}" @mouseup="changeTrackPosition()">
            <div v-else class="song-duration-bar song-duration-placeholder"></div>
            <p v-if="activeTrack" class="duration-text m-0">{{ msToTime(activeTrack.duration) }}</p>
        </div>
        </section>
    </div>
    </section>
</template>

<script>
import { ref, onMounted, computed, watchEffect } from "vue";
import { spotifyPlayerService } from '../services/SpotifyPlayerService';
import Pop from '../utils/Pop';
import { logger } from "../utils/Logger";
import { spotifyApiService } from "../services/SpotifyApiService";
import { AppState } from "../AppState.js";

export default {
setup() {
  const trackPosition = ref({})
  const volume = ref({
  })
  async function currentPosition() {
    try {
      logger.log('[PLAYER COMPONENT] AppState.isPlaying:', AppState.isPlaying)
        logger.log('Grabbing the Current Position...')
        await spotifyPlayerService.currentPosition()
    } catch (error) {
      Pop.error(error)
    }
  }

  async function addNextTrackToQueue() {
    try {
        logger.log('Setting the next track in queue', AppState.activeTrack.progress)
        await spotifyPlayerService.addNextTrackToQueue()
      } catch (error) {
        Pop.error(error)
      }
  }

  function calculateBar() {
    if(AppState.activeTrack != null && document.getElementById('song-duration-bar')) {
      let bar = document.getElementById('song-duration-bar')
      bar.setAttribute('value', `${AppState.activeTrack.progress}`)
      bar.setAttribute('max', `${AppState.activeTrack.duration}`)
      trackPosition.value = AppState.activeTrack.progress
    }
  }

  watchEffect(() => {
    if (AppState.isPlaying && AppState.activeTrack && AppState.activeTrack.duration - AppState.activeTrack.progress < 2001 ) {
      addNextTrackToQueue()
    } else {
      if(AppState.isPlaying && AppState.activeTrack.progress != null) logger.log(AppState.activeTrack.progress)
      }
    }
  )

  watchEffect(() => currentPosition(AppState.isPlaying))

  watchEffect(() => {
    if(AppState.activeTrack != null)
    calculateBar(AppState.activeTrack
    )})

  onMounted(() => {
    AppState.isPlaying = false
    }
  )

  async function changeState(){
    await spotifyPlayerService.changeState()
  }
    
  return {
    isPlaying: computed(()=> AppState.isPlaying),
    activeTrack: computed(() => AppState.activeTrack),
    volume,
    trackPosition,
    changeState,
    async changeTrackPosition() {
      try {
        await spotifyPlayerService.changeTrackPosition(trackPosition.value)
      } catch (error) {
        Pop.error(error)
      }
    },
    async togglePlay() {
      try {
          await spotifyPlayerService.togglePlay();
          await spotifyApiService.getActiveTrack()
          changeState()
      }
      catch (error) {
          Pop.error(error);
      }
    },
    async playNext() {
      try {
        await spotifyPlayerService.playNext()
        if(this.isPlaying == false) {
          changeState()
        }
        // changeState()
      } catch (error) {
        Pop.error(error)
      }
    },
    async playPrevious() {
      try {
        await spotifyPlayerService.playPrevious()
        if(this.isPlaying == false) {
          changeState()
        }
      } catch (error) {
        Pop.error(error)
      }
    },
    async setVolume() {
      try {
        logger.log('setting volume..', volume.value)
        await spotifyPlayerService.setVolume(volume.value)
      } catch (error) {
        Pop.error(error)
      }
    },

    showVolume() {
      let slider = document.getElementById('volume-slider')
      if(slider.hasAttribute('hidden')){
        slider.removeAttribute('hidden')
      } else {
        slider.setAttribute('hidden', '')
      }
    },

    msToTime(ms) {
      const totalSeconds = Math.floor(ms / 1000)
      const computedMinutes =  Math.floor(totalSeconds / 60)
      let computedSeconds = totalSeconds % 60;
      if(computedSeconds < 10) {
        computedSeconds = `0${computedSeconds}`
      }
      return computedMinutes + ':' + computedSeconds
    },

    spaceBar() {
      window.addEventListener('keydown', (event) => {
        let key = event.keycode
        if(key == 32){
          this.togglePlay()
        }
      })
      }
  };
},
};
</script>

<style lang="scss" scoped>
.player {
  height: 20vh;
  padding: 1rem;
  // background-color: #4f4f4fca;
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  border: solid 8px #303030;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 15px;
  button {
    min-height: 4rem;
    min-width: 4rem;
    border-radius: 50%;
    margin: 1rem;
    background-color: #eeeeee;
    border: none;
    color: #242424;
    font-size: 2rem;
    transition: .3s;
  }

  button:hover {
    background-color: #63FAAA;
  }
}

input[type="range"] {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  border-radius: 8px;
  background-color: #eeeeee;
  height: 10px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -5px;
  background-color:#2f2f2f;
  border: solid 3px #EA94FF;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.previous {
  transform: scale(.75);
}

.next {
  transform: scale(.75);
}

.devices-icon {
  color: #EA94FF;
  font-size: 2rem;
  margin-left: 2rem;
}

.devices-icon:hover {
  transform: scale(1.1);
}

.song-duration-bar {
  height: 1vh;
  border-radius: 8px;
  min-width: 80%;
  position: static;
  cursor: pointer;
}

.song-duration-placeholder {
  background-color: #eeeeee;
  cursor: default;
  position: static;
}

.volume-bar {
  border-radius: 8px;
  width: 100%;
}

.duration-text {
  color: #eeeeee;
  padding: .5rem;
  font-size: .75rem;
}

@media screen and (max-width: 768px){
    .player{
      height: fit-content;
    }
}
</style>