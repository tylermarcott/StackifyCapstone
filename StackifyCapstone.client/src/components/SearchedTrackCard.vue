<template>
  <section class="mb-2 pb-3">
    <div class="row row-height pt-3">
      <div class="col-3 max-height">
        <img class="album-img img-fluid" :src="track.albumImg[0].url" alt="">
      </div>
      <!-- TODO: for artist or title, put a limit on the length and append ... so card don't stretch -->


      <!-- FIXME -->
      <!-- TODO: check out these cards and make some changes. Namely, put song name on top, below song, put album in row. -->
      <div class="col-7">
        <div class="row">
          <div class="col-12">
            <div>
              <div class="mb-0 song-title">{{ track.name }}</div>
            </div>

          </div>
          <div class="col-12 d-flex justify-content-start">
            <div class="row">
              <div>
                <p class="ms-3 mt-1">by</p>
              </div>
               <p class="mb-0 fs-3">{{ track.artist[0].name }}</p>
            </div>
          </div>
        </div>

        <div class="row justify-content-start pt-2">
          <div class="col-5 text-end">
              <p>{{ track.album }}</p>
          </div>
        </div>

        <div class="row justify-content-start">
          <div class="col-5 ms-3">
            <h5>{{ track.year.substring(0, 4) }}</h5>
          </div>
        </div> 
      </div>

      <div class="col-2 text-center">
        <div @click="addTrackToActiveTimeblock(track.id)" class="row add-button mb-2">
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
          if(await Pop.confirm('Add this song to your playlist?')){
            if(AppState.activeTimeBlock){
              await tracksService.addTrackToActiveTimeblock(trackId)
              this.editTimeblockTracklist()
              this.clearSearchedTracks()
            } else{
              Pop.toast('Please choose a playlist before adding a song!', 'warning')
            }

          }
        } catch (error) {
          Pop.error(error)
        }
      },

      async editTimeblockTracklist(){
        try {
          const updatedTimeblock = AppState.activeTimeBlock
          const timeblockId = AppState.activeTimeBlock.id
          await tracksService.editTimeblockTracklist(updatedTimeblock, timeblockId)
        } catch (error) {
          Pop.error(error)
        }
      },

      async clearSearchedTracks() {
        try {
          await tracksService.clearSearchedTracks()
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
  font-size: 20px;
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

.song-title{
  font-size: 2.25rem;
  font-weight: bold;

}

</style>