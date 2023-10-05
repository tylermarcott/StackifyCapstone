<template>
    <ModalWrapper id="my-song" data-bs-toggle="my-song-modal">
        <template #button>   
        <i @click="openTrackDetails(track.id, track)" title="shows the song's details" class="mdi mdi-dots-horizontal"></i>
      </template>
      <template #body>
        <TimeBlockTrackDetails/>
      </template>
    </ModalWrapper>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import TimeBlockTrackDetails from './TimeBlockTrackDetails.vue';
import Pop from '../utils/Pop';
import { spotifyApiService } from '../services/SpotifyApiService';
import { logger } from '../utils/Logger';
import { Track } from '../models/Track';


export default {
    props:{track: {type: Track, required:true}},
    setup(){
    return { 
        async openTrackDetails(trackId, track){
      try {
        await spotifyApiService.getTimeblockTrackDetails(trackId, track);
      } catch (error) {
        Pop.error(error)
      }
    }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>