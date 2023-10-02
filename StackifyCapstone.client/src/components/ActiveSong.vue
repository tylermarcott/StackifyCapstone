<template>
  <ModalWrapper id="create-event">
    <template #button>   
      <section class="row h-100">
          <div class="col-4 d-flex align-items-center">
              <img class="img-fluid active-song-image p-0" src="../assets/img/StackifySVG-cta.svg">
          </div>
          <div class="col-8 p-2 d-flex flex-column justify-content-center">
              <section class="row">
              <div class="col-6 d-flex flex-column justify-content-center">
                  <p class="song-title m-0"><b>Song Title</b></p>
                  <p class="song-title m-0">Album</p>
                  <p class="song-title m-0">Artist</p>
              </div>
              <div class="col-6">
                  <p class="song-title my-2">0:00</p>
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
import { onMounted } from "vue";
import { spotifyApiService } from "../services/SpotifyApiService";
import Pop from "../utils/Pop";
import TrackDetailsModal from './TrackDetailsModal.vue';

export default {
    setup() {
      async function getActiveTrack() {
        try {
          await spotifyApiService.getActiveTrack()
        } catch (error) {
          Pop.error(error)
        }
      }
      onMounted(() => {
        getActiveTrack()
      })
        return {};
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