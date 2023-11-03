<template>
  <ModalWrapper id="active-song">
    <template #button>   
      <section title="Click For More Track Details" @click="getActiveTrack()" v-if="activeTrack" class="row">
          <div class="col-4 d-flex align-items-center mt-3">
              <img class="img-fluid active-song-image p-0 elevation-2" :src="activeTrack.picture">
          </div>
          <div class="col-8 p-2 d-flex flex-column align-items-between justify-content-center">
            <section class="row ms-1">
              <div class="col-12 d-flex flex-column justify-content-center">
                <p class="song-title m-0"><b>{{ activeTrack.name.substring(0, 20) + '...' }}</b></p>
              </div>
              <div class="col-8 mt-1">
                <p class="song-title my-0">{{ activeTrack.artist }}</p>                    
              </div>
              <div class="col-4 mt-1">
                <p class="song-title m-0">{{ computedMinutes }}:{{ computedSeconds }}</p>
              </div>
            </section>
          </div>
      </section>
        <section v-else class="row h-100">
        </section>
    </template>
    <template #body>
      <TrackDetailsModal/>
    </template>
  </ModalWrapper>
</template>

<script>
import { computed, onMounted } from "vue";
import { spotifyApiService } from "../services/SpotifyApiService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";

export default {
    setup() {
      const activeTrack = computed(() => AppState.activeTrack)
      async function getActiveTrack() {
      try {
        logger.log('getting the active track')
        let id = await spotifyApiService.getActiveTrack()
        if(id != undefined)await getActiveTrackDetails(id)
      } catch (error) {
        Pop.error(error)
      }
    }

      async function getActiveTrackDetails(id){
        try {
          logger.log('getting active track audio features', id)
          await spotifyApiService.getActiveTrackDetails(id)
        } catch (error) {
          Pop.error(error)
        }
      }
    onMounted(() => {
      if(AppState.isPlaying == true){
        getActiveTrack()
      }
    })

    return {
      getActiveTrack,
      getActiveTrackDetails,
      activeTrack,
      activeTrackDetails: computed(() => AppState.activeTrackDetails),
      computedMinutes: computed(() => Math.floor(AppState.activeTrack.duration / 1000 / 60)),
      computedSeconds: computed(() => Math.floor(AppState.activeTrack.duration / 1000 % 60).toString().padStart(2, '0')),
    };
    },
    
};
</script>

<style lang="scss" scoped>
.active-song-image {
  aspect-ratio: 1/1;
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin: 1rem;
  border: solid 1px #4f4f4f;
}

.song-title {
  color: #eeeeee;
  font-size: 1.2rem;
}
</style>