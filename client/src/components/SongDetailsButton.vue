<template>
    
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
        
     }
    }
};
</script>


<style lang="scss" scoped>

</style>