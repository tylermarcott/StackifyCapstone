<template>
    
    <section v-if="activeTrackDetails" class="bg-dark-grey modal-active-song ">
        <div class="p-5 pb-0 d-flex justify-content-center align-items-center ">
            <img class="album-cover img-fluid" :src="activeTrack.picture" alt="">
        </div>
        <div class="card bg-dark-grey text-white elevation-5 mt-5">
            <p class="card-header bg-pink song-title text-center my-2">Track Details: {{ activeTrack.name}}</p>
            <div class="card-body text-pink song-details-card row justify-content-evenly my-3">
                <div class="col-12 col-md-6">
                    <p>Artist: {{ activeTrack.artist }}</p>
                    <p>Album: {{ activeTrack.album}}</p>
                    <p>Year: {{ activeTrack.year }}</p>
                    <p>Key: {{ key }}</p>
                    <p>Duration: {{ duration }} mins </p>
                </div>
                <div class="col-12 col-md-6">
                    <p>Valence: {{ activeTrackDetails.valence }}</p>
                    <p>Dance-ability: {{ activeTrackDetails.danceability }}</p>
                    <p>BPM: {{ activeTrackDetails.bpm }}</p>
                    <p>Popularity: {{ activeTrack.popularity }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
export default {
    setup() {

        onMounted(() => {
        
        })
        return {
            
            activeTrack: computed(() => AppState.activeTrack),
            activeTrackDetails: computed(() => AppState.activeTrackDetails),
            duration: computed(() => (AppState.activeTrack.duration / 1000 / 60 ).toFixed(2)),
            key: computed(()=> 
                { 
                if (AppState.activeTrackDetails.key == 0) return 'C'
                if (AppState.activeTrackDetails.key == 1) return 'C#'
                if (AppState.activeTrackDetails.key == 2) return 'D'
                if (AppState.activeTrackDetails.key == 3) return 'D#'
                if (AppState.activeTrackDetails.key == 4) return 'E'
                if (AppState.activeTrackDetails.key == 5) return 'F'
                if (AppState.activeTrackDetails.key == 6) return 'F#'
                if (AppState.activeTrackDetails.key == 7) return 'G'
                if (AppState.activeTrackDetails.key == 8) return 'G#'
                if (AppState.activeTrackDetails.key == 9) return 'A'
                if (AppState.activeTrackDetails.key == 10) return 'A#'
                if (AppState.activeTrackDetails.key == 11) return 'B'
                return 'Unknown Key'
                })
            }
        }
    };

</script>



<style lang="scss" scoped>
.album-cover {
    height: 300px;
    width: 300px;
    object-fit: contain;
    object-position: center;
}

.bg-dark-grey {
    background-color: #4f4f4f;
}

.bg-pink {
    background-color: #e1289F;
}

.text-white {
    color: #eeeeee
}

.text-pink {
    color: #e1289F
}

.song-title {
    font-size: 2rem;
    font-weight: 700;
}

.song-details-card {
    margin-left: 8vw;
    margin-bottom: 5vh;
    text-decoration: none;
    color: #E1289F;
    font-size: 1.75rem;
}

.modal-active-song{
    cursor: default;
}

</style>
