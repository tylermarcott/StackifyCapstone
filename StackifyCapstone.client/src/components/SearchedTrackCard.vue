<template>
  <section class="container">
    <div class="row">
      <div class="col-3">
        <img class="album-img" src="https://cdn.mos.cms.futurecdn.net/ffXURUVLGY85rnXnnqHChb-480-80.jpg" alt="">
      </div>
      <div class="col-7">
        <div class="row">
          <div class="col-6">
            <h1>Mikasa</h1>
          </div>
          <div class="col-6">
            <h1>Veil of Maya</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <h5>Matriarch</h5>
          </div>
          <div class="col-6">
            <h5>3:10</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <h5>Alt Metal</h5>
          </div>
          <div class="col-6">
            <h5>2015</h5>
          </div>
        </div> 
        <div class="row">
          possible additional info down here?
        </div>     
      </div>
      <div class="col-2">
        <div class="row text-center add-button d-flex">
          <div class="col-6">
            <i class="mdi mdi-plus"></i>
          </div>
          <div class="col-6">
            <h2>add</h2>    
          </div>     
        </div>
        <div class="row">
          <h2>triple dot thingy to open song details modal</h2>
          add bpm
        </div>
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
  // props: { track: { type: Track || Object, required: true } },
  setup(props) {
    // const totalSeconds = computed(() => Math.floor(props.track.duration / 1000))
    // const computedMinutes = computed(() => Math.floor(totalSeconds.value / 60))
    // const computedSeconds = computed(() => {
    //   const seconds = totalSeconds.value % 60;
    //   return seconds.toString().padStart(2, '0')
    // })

    return {
      // totalSeconds,
      // computedMinutes,
      // computedSeconds
    }
  }
};
</script>


<style lang="scss" scoped>

.album-img{
  max-height: 300px;
  max-width: 300px;
}

.add-button {
  background-color: #63FAAA ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 12px;
  font-size: 30px;
  transition: .1s;
  padding: 4px;
}


</style>