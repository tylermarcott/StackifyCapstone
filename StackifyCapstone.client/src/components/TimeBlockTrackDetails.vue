<template>
    <section v-if="timeblockTrackDetails" class="bg-dark-grey modal-active-song ">
        <div class="p-5 pb-0 d-flex justify-content-center align-items-center ">
            <img class="album-cover img-fluid" :src="timeblockTrack.albumImg" alt="">
        </div>
        <div class="bg-dark-grey text-white mt-5">
            <p class="card-header bg-pink song-title text-center my-2 p-3"><b>{{ timeblockTrack.name }} - {{ timeblockTrack.artist }}</b></p>
            <div class="card-body text-pink song-details-card row justify-content-evenly my-3">
                <div class="col-12 col-md-6 my-5">
                    <p>Album: {{ timeblockTrack.album}}</p>
                    <p>Release: {{ timeblockTrack.year }}</p>
                    <p>Key: {{ key }}</p>
                    <p>Duration: {{ computedMinutes }}:{{ computedSeconds }} </p>
                </div>
                <div class="col-12 col-md-6 my-5">
                    <p>Valence: {{ valence }}%</p>
                    <p>Dance-ability: {{ danceability }}%</p>
                    <p>BPM: {{ bpm }}</p>
                    <p>Popularity: {{ timeblockTrack.popularity }}</p>
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
        return {
            
            timeblockTrack: computed(() => AppState.timeblockTrack),
            timeblockTrackDetails: computed(() => AppState.timeblockTrackDetails),
            
            computedMinutes: computed(() => Math.floor(AppState.timeblockTrack.duration/1000/60)),
            computedSeconds: computed(() => Math.floor(AppState.timeblockTrack.duration/1000 % 60).toString().padStart(2, '0')),
            valence: computed(() => (AppState.timeblockTrackDetails.valence * 100).toFixed(0)),
            danceability: computed(() => (AppState.timeblockTrackDetails.danceability * 100).toFixed(0)),
            bpm: computed(() => (AppState.timeblockTrackDetails.bpm).toFixed(0)),
            
            key: computed(()=> 
                { 
                if (AppState.timeblockTrackDetails.key == 0) return 'C'
                if (AppState.timeblockTrackDetails.key == 1) return 'C#'
                if (AppState.timeblockTrackDetails.key == 2) return 'D'
                if (AppState.timeblockTrackDetails.key == 3) return 'D#'
                if (AppState.timeblockTrackDetails.key == 4) return 'E'
                if (AppState.timeblockTrackDetails.key == 5) return 'F'
                if (AppState.timeblockTrackDetails.key == 6) return 'F#'
                if (AppState.timeblockTrackDetails.key == 7) return 'G'
                if (AppState.timeblockTrackDetails.key == 8) return 'G#'
                if (AppState.timeblockTrackDetails.key == 9) return 'A'
                if (AppState.timeblockTrackDetails.key == 10) return 'A#'
                if (AppState.timeblockTrackDetails.key == 11) return 'B'
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
    border: solid 1px #EA94FF;
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
    font-size: 3rem;
    font-weight: 700;
}

.song-details-card {
    margin-left: 8vw;
    margin-bottom: 5vh;
    text-decoration: none;
    color: #EA94FF;
    font-size: 1.75rem;
}

.modal-active-song{
    cursor: default;
}

</style>
