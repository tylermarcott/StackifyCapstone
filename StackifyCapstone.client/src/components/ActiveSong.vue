<template>
  <ModalWrapper id="create-event">
    <template #button>   
      <section v-if="activeTrack" class="row h-100">
          <div class="col-4 d-flex align-items-center">
              <img class="img-fluid active-song-image p-0" :src="activeTrack.picture">
          </div>
          <div class="col-8 p-2 d-flex flex-column justify-content-center">
              <section class="row">
              <div class="col-6 d-flex flex-column justify-content-center">
                  <p class="song-title m-0"><b>{{activeTrack.name}}</b></p>
                  <p class="song-title m-0">{{ activeTrack.album }}</p>
                  <p class="song-title m-0">{{ activeTrack.artist }}</p>
              </div>
              <div class="col-6">
                  <p class="song-title my-2">{{ activeTrack.duration }}</p>
                  <p class="song-title m-0">100 BPM</p>
                  </div>
              </section>
          </div>
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
import TrackDetailsModal from './TrackDetailsModal.vue';
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";

export default {
    setup() {
      async function getActiveTrack() {
        try {
          logger.log('getting the active track')
          await spotifyApiService.getActiveTrack()
        } catch (error) {
          Pop.error(error)
        }
      }
      onMounted(() => {
        // getActiveTrack()
      })
        return {
          activeTrack: computed(() => AppState.activeTrack)
        };
    },
    components: { TrackDetailsModal }
};
</script>


<style lang="scss" scoped>
.active-song-image {
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin: 1rem;
}

.song-title {
  color:#4f4f4f;
  font-size: 1.2rem;
}
</style>