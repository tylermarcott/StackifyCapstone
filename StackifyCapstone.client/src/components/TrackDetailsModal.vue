<template>
    
    <section v-if="activeTrackDetails" class="modal-active-song">
        <div class="row">
            <div class="col-12 col-md-6 mb-4">
                <img class="album-cover img-fluid " :src="activeTrack.picture" alt="">
            </div>
            <div class="col-12 col-md-6 text-white">
                <p class="card-header song-title me-1"><b>{{ activeTrack.name }} - {{ activeTrack.artist }}</b></p>
            <div class="card-body text-light song-details-card row justify-content-evenly my-5">
                <div class="col-12 col-md-6">
                    <p :title="activeTrack.album" class="text-truncate max-vs-10">Album: {{ activeTrack.album }}</p>
                    <p>Release: {{ activeTrack.year }}</p>
                    <p>Key: {{ key }}</p>
                    <p>Duration: {{ computedMinutes }}:{{ computedSeconds }} </p>
                </div>
                <div class="col-12 col-md-6">
                    <p>Valence: {{ valence }}%</p>
                    <p>Dance-ability: {{ danceability }}%</p>
                    <p>BPM: {{ bpm }}</p>
                    <p>Popularity: {{ activeTrack.popularity }}</p>
                </div>
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
            
            computedMinutes: computed(() => Math.floor(AppState.activeTrack.duration/1000/60)),
            computedSeconds: computed(() => Math.floor(AppState.activeTrack.duration/1000 % 60).toString().padStart(2, '0')),
            valence: computed(() => (AppState.activeTrackDetails.valence * 100).toFixed(0)),
            danceability: computed(() => (AppState.activeTrackDetails.danceability * 100).toFixed(0)),
            bpm: computed(() => (AppState.activeTrackDetails.bpm).toFixed(0)),
            
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
    height: 400px;
    width: 100%;
    object-fit: contain;
    object-position: center;
    // border: solid 1px #EA94FF;
}

.bg-dark-grey {
    background-color: #4f4f4f;
}

.bg-pink {
    background-color: #EA94FF
}


.text-white {
    color: #eeeeee
}

.text-pink {
    color: #EA94FF;
}

.song-title {
    font-size: 2.2rem;
    font-weight: 700;
}

.song-details-card {
    //margin-left: 8vw;
    margin-bottom: 5vh;
    text-decoration: none;
    color: #EA94FF;
    font-size: 1.3rem;
}

.modal-active-song{
    cursor: default;
    overflow: hidden;
}

</style>
