<template>
    <div class="col-12 player d-flex justify-content-center align-items-center">
        <section class="row">
        <div class="col-3 devices d-flex justify-content-center align-items-center">
            <i class="devices-icon mdi mdi-shuffle-variant"></i>
        </div>
        <div class="col-6 player-controls d-flex justify-content-center p-0">
            <button @click="playPrevious()" class="previous elevation-3">
            <i class="mdi mdi-skip-previous"></i>
            </button>
            <!-- NOTE play button -->
            <button @click="togglePlay()" class="play elevation-3">
              <i v-if="isPlaying" class="mdi mdi-play"></i>
              <i v-if="!isPlaying" class="mdi mdi-pause"></i>
            </button>
            <button @click="playNext()" class="next elevation-3">
            <i class="mdi mdi-skip-next"></i>
            </button>
        </div>
        <div class="col-3 devices d-flex justify-content-center align-items-center">
            <!-- <i class="devices-icon mdi mdi-devices"></i> -->
            <i class="devices-icon mdi mdi-volume-high"></i>
            <input type="range" v-model="volume" max="100" min="0" step="10" @input="setVolume()"/>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center">
            <p class="duration-text m-0">2:50</p>
            <div class="song-duration-slot elevation-5">
            <div class="song-duration-bar"></div>
            </div>
            <p class="duration-text m-0">4:20</p>
        </div>
        </section>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { spotifyPlayerService } from '../services/SpotifyPlayerService';
import Pop from '../utils/Pop';
import { logger } from "../utils/Logger";
import { spotifyApiService } from "../services/SpotifyApiService";
import { AppState } from "../AppState.js";

export default {
setup() {
  const volume = ref({
  })
  onMounted(() => AppState.isPlaying = true)
  async function changeState(){
      await spotifyPlayerService.changeState()
      logger.log('is a song playing (changeState fxn):', AppState.isPlaying)
    }
  return {
    isPlaying: computed(()=> AppState.isPlaying),
    volume,
    changeState,
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
      } catch (error) {
        Pop.error(error)
      }
    },
    async playPrevious() {
      try {
        await spotifyPlayerService.playPrevious()
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

  };
},
};
</script>

<style lang="scss" scoped>
.player {
  height: 20vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 15px;
  button {
    height: 4rem;
    width: 4rem;
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

input[type="range"]::-webkit-slider-runnable-track {
  background: #eeeeee;
  border-radius: 8px;
  color: #EA94FF;
  height: 10px;
}

input[type="range"]::-webkit-slider-thumb {
  margin-top: -3px;
  background:#63FAAA;
}
.previous {
  transform: scale(.75);
}

.play {
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

.song-duration-slot {
  height: 1vh;
  border-radius: 8px;
  width: 50vw;
  background-color: #eeeeee;
  position: relative;
}

.song-duration-bar {
  height: 1vh;
  border-radius: 8px;
  width: 60%;
  background: #EA94FF;
  position: absolute;
}

.duration-text {
  color: #eeeeee;
  padding: .5rem;
  font-size: .75rem;
}
</style>