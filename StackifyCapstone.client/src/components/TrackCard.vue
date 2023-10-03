<template>
  <section class="container">
    <div class="row">
      <div class="col-4">
        {{ track.name }}
      </div>
      <div class="col-2">
        {{ track.artist[0].name }}
      </div>

      <div class="col-3">
        {{ track.album }}
      </div>

      <div class="col-1">
        <i class="mdi mdi-dots-horizontal"></i>
      </div>
      <div class="col-2">
        {{ computedMinutes }}:{{ computedSeconds }}
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Track } from "../models/Track.js";
import { logger } from "../utils/Logger.js";
export default {
  props: { track: { type: Track || Object, required: true } },
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
    computedSeconds
    // computedMinutes: computed(()=> ((props.track.duration/1000)/60).toFixed(0)),
    // computedSeconds: computed(()=> ((props.track.duration / 1000) / 60).toFixed(2))
    
   }
  }
};
</script>


<style lang="scss" scoped>

</style>