<template>
    <section class="row justify-content-center text-center my-3">
        <div class="col-2">
            <button title="Previous Time Block" @click="prevTimeblock()" :disabled="timeblock.position<=0" class="btn bg-green"><i class="mdi mdi-arrow-left"></i></button>
        </div>
        <div class="col-8 bg-dark-subtle">
            <h2>{{ timeblock.title }}</h2>
        </div>
        <div class="col-2">
            <button title="Next Time Block" @click="nextTimeblock()" :disabled="timeblock.position==timeblocksLength-1" class="btn bg-green"><i class="mdi mdi-arrow-right"></i></button>
        </div>
    </section>
    <section class="row">
        <div class="col-10">
            <h5>play playlist button</h5>
            <h5 class="text-end">Total Duration: {{ msToTime(totalDuration) }}</h5>
            <div v-for="track in timeblock.trackList" :key="track.id" class="my-2 ms-2">
                <TrackCard :track="track"/>
            </div>
            </div>
        <div class="col-2 text-center">
            <button title="Unlock Playlist" v-if="timeblock.locked" @click="toggleLock()" class="btn bg-light-pink my-3"><i class="mdi mdi-lock"></i></button>
            <button title="Lock Playlist" v-else @click="toggleLock()" class="btn bg-green my-3"><i class="mdi mdi-lock-open"></i></button>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import TrackCard from './TrackCard.vue';
import {timeBlocksService} from '../services/TimeBlocksService'
export default {
    setup() {
        return {
            
            timeblock: computed(() => AppState.activeTimeBlock),
            timeblocksLength: computed(()=> AppState.myTimeBlocks.length),
            totalDuration: computed(()=> {
                const tracks = AppState.activeTimeBlock.trackList
                let duration = 0
                tracks.forEach(track => {
                    duration += track.duration
                });
                return duration
            }),

            msToTime(ms) {
                const totalSeconds = Math.floor(ms / 1000)
                const computedMinutes =  Math.floor(totalSeconds / 60)
                let computedSeconds = totalSeconds % 60;
                if(computedSeconds < 10) {
                    computedSeconds = `0${computedSeconds}`
                }
                return computedMinutes + ':' + computedSeconds
            },


            prevTimeblock(){
                timeBlocksService.prevTimeblock()
            },
            nextTimeblock(){
                timeBlocksService.nextTimeblock()
            },

            toggleLock(){
                timeBlocksService.toggleLock()
            },
            

        };
    },
    components: { TrackCard }
};
</script>


<style lang="scss" scoped>

.bg-dark-pink{
    background-color: #E1289F;    
}
.bg-light-pink{
    background-color: #E246AB ;
}

.bg-green{
    background-color: #63FAAA;
}

</style>