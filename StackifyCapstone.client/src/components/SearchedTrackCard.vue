<template>
  <section>
    <div class="row">
      <div class="col-3 max-height">
        <img class="album-img img-fluid" :src="track.albumImg[0].url" alt="">
      </div>
      <!-- TODO: for artist or title, put a limit on the length and append ... so card don't stretch -->
      <div class="col-7">
        <div class="row">
          <div class="col-5">
            <h1>{{ track.name }}</h1>
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
            <h5>{{ track.album }}</h5>
          </div>
        </div>


        <div class="row justify-content-between">
          <div class="col-5 ms-2">
          </div>
          <div class="col-5 text-end me-3">
            <h5>2015</h5>
          </div>
        </div> 

        <div class="row">
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
        <div class="row add-button">
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
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Track } from "../models/Track.js";
import { logger } from "../utils/Logger.js";
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
      computedSeconds
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


</style>