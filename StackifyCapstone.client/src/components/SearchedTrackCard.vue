<template>
  <section class="mb-2 pb-3">
    <div class="row row-height pt-3">
      <div class="col-3 max-height">
        <img class="album-img img-fluid" :src="track.albumImg[0].url" alt="">
      </div>
      <!-- TODO: for artist or title, put a limit on the length and append ... so card don't stretch -->
      <div class="col-7">
        <div class="row">
          <div class="col-5">
            <div v-if="track.name.length > 18">
              <h1>{{ track.name.substring(0, 18) + '...' }}</h1>
            </div>
            <div v-else>
              <h1>{{ track.name }}</h1>
            </div>
          </div>
          <div class="col-7 d-flex justify-content-center">
            <div class="row">
              by <h1>{{ track.artist[0].name }}</h1>
            </div>
          </div>
        </div>


        <div class="row justify-content-between">
          <div class="col-5 ms-2">

          </div>
          <div class="col-5 text-end">
            <div v-if="track.album.length > 20">
              <p>{{ track.album.substring(0, 20) + '...' }}</p>
            </div>
            <div v-else>
              <p>{{ track.album }}</p>
            </div>
          </div>
        </div>


        <div class="row justify-content-between">
          <div class="col-5 ms-2">
          </div>
          <div class="col-5 text-end me-3">
            <h5>2015</h5>
          </div>
        </div> 

        <div class="row mt-4">
          <div class="col-6">
            <h5>
              bpm: 302
            </h5>
          </div>
          <div class="col-6">
            <h5>
              {{ computedMinutes }}:{{ computedSeconds }}
            </h5>
          </div>
        </div>
      </div>

      <div class="col-2 text-center">
        <div @click="addTrackToActiveTimeblock(track.id)" class="row add-button">
          <div class="col-6">
            <i class="mdi mdi-plus">
            </i>
          </div>
          <div class="col-6">
            <h3 class="mt-1">add</h3>
          </div>     
        </div>
        <h3>
          <i class="mdi mdi-dots-horizontal"></i>
        </h3>
      </div>
    </div>
  </section>
</template>


<script>
import { computed} from 'vue';
import { Track } from "../models/Track.js";
import Pop from "../utils/Pop.js";
import { tracksService } from "../services/TracksService.js";
import { logger } from "../utils/Logger.js";
import {AppState} from '../AppState.js'
export default {
  props: { track: { type: Track || Object, required: true } },
  setup(props) {
    const totalSeconds = computed(() => Math.floor(props.track.duration / 1000))
    const computedMinutes = computed(() => Math.floor(totalSeconds.value / 60))
    const computedSeconds = computed(() => {
      const seconds = totalSeconds.value % 60;
      return seconds.toString().padStart(2, '0')
    })

    return {
      totalSeconds,
      computedMinutes,
      computedSeconds,
      // TODO: need to be able to save the song that's clicked on, it needs to be saved to the appstate in trackToAdd with all the data points that are stored on the page
      async addTrackToActiveTimeblock(trackId){
        try {
          await tracksService.addTrackToActiveTimeblock(trackId)
          this.editTimeblockTracklist()
        } catch (error) {
          Pop.error(error)
        }
      },

      async editTimeblockTracklist(){
        try {
          const updatedTrackList = AppState.activeTimeBlock.trackList
          const timeblockId = AppState.activeTimeBlock.id
          logger.log('here is our updated track list on our active timeblock:', updatedTrackList)
          logger.log('this is the id of the timeblock we are editing:', timeblockId)
          await tracksService.editTimeblockTracklist(updatedTrackList, timeblockId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

.album-img{
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  margin-top: 0.7em;
}

.add-button {
  background-color: #E1289F ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 12px;
  margin-top: 50px;
  font-size: 30px;
  transition: .1s;
  padding: 4px;
  padding-right: 40px;
  cursor: pointer;
}

.max-height{
  max-height: 20vh;
}

.row-height{
  min-height: 24vh;
}


</style>