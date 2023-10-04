<template>
  <section class="song-card">
    <div class="row">
      <div v-if="!locked" class="col-1">
        <button class="btn btn-light"><i class="mdi mdi-arrow-up-bold-outline"></i></button>
        <button class="btn btn-light"><i class="mdi mdi-arrow-down-bold-outline"></i></button>
      </div>
      <div class="col-3">
        {{ track.name }}
      </div>
      <div class="col-2">
        {{ track.artist }}
      </div>

      <div class="col-3">
        {{ track.album }}
      </div>

      <div class="col-1">
        <i class="mdi mdi-dots-horizontal"></i>
      </div>
      <div class="col-2">
        {{ computedMinutes }}:{{ computedSeconds }}
        <div v-if="!locked">
          <button @click="deleteTrack()" class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import { MyTrack } from '../models/MyTrack';
import { tracksService } from '../services/TracksService';
export default {
  props: { track: { type: MyTrack || Object, required: true } },
  setup(props){
    const totalSeconds = computed(()=> Math.floor(props.track.duration/1000))
    const computedMinutes = computed(()=> Math.floor(totalSeconds.value/60))
    const computedSeconds = computed(()=> {
      const seconds = totalSeconds.value % 60;
      return seconds.toString().padStart(2, '0')
    })
    

  return { 
    totalSeconds,
    computedMinutes,
    computedSeconds,
    locked: computed(()=> AppState.activeTimeBlock.locked),

    async deleteTrack(){
      tracksService.deleteTrack(props.track.id)
    }
    
    
   }
  }
};
</script>


<style lang="scss" scoped>
.song-card{
  padding: 0.5em;
  background-color: #4F4F4F;
  color: #FFFFFF;
  font-size: 18px;
  border-radius: 5px;
}
</style>