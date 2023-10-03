<template>
  <section class="container">
    <div class="row">
      <div class="col-3">
        <img class="album-img" src="https://cdn.mos.cms.futurecdn.net/ffXURUVLGY85rnXnnqHChb-480-80.jpg" alt="">
      </div>
      <div class="col-7">


        <div class="row">
          <div class="col-5">
            <h1>Mikasa</h1>
          </div>
          <div class="col-7 d-flex justify-content-center">
            <div class="row">
              by <h1>Veil of Maya</h1>
            </div>
          </div>
        </div>


        <div class="row justify-content-between">
          <div class="col-5 ms-2">

          </div>
          <div class="col-5 text-end">
            <h5>Matriarch</h5>
          </div>
        </div>


        <div class="row justify-content-between">
          <div class="col-5 ms-2">
          </div>
          <div class="col-5 text-end me-3">
            <h5>2015</h5>
          </div>
        </div> 

        <div class="row mt-5 ms-3">

          <div class="col-4">
            <h5>Alt Metal</h5>
          </div>
          <div class="col-4">
          </div>
          <div class="col-4">
            BPM: 302
          </div>
        </div>     
      </div>

      <div class="col-2 text-center">
        <h5>
            3:10
        </h5>
        <div class="row add-button">
          <div class="col-6">
            <i class="mdi mdi-plus">
            </i>
          </div>
          <div class="col-6">
            <h3 class="mt-1">add</h3>
          </div>     
        </div>
        <div class="row text-center fs-2">
            <i class="mdi mdi-dots-horizontal"></i>
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
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
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


</style>