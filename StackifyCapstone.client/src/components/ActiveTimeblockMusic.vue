<template>
    <section class="row justify-content-center text-center my-3">
        <div class="col-2">
            <button @click="prevTimeblock()" :disabled="timeblock.position<=0" class="btn btn-dark"><i class="mdi mdi-arrow-left"></i></button>
        </div>
        <div class="col-8 bg-dark-subtle">
            <h2>{{ timeblock.title }}</h2>
        </div>
        <div class="col-2">
            <button @click="nextTimeblock()" :disabled="timeblock.position==timeblocksLength-1" class="btn btn-dark"><i class="mdi mdi-arrow-right"></i></button>
        </div>
    </section>
    <section class="row">
        <div class="col-10">
            <h5 class="text-end">Total Duration: {{ totalDuration }}</h5>
                <div v-for="track in timeblock.trackList" :key="track.id">
                <TrackCard :track="track"/>
                </div>
            </div>
        <div class="col-2 text-center">
            <button class="btn btn-danger my-3"><i class="mdi mdi-lock"></i></button>
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

            prevTimeblock(){
                timeBlocksService.prevTimeblock()
            },
            nextTimeblock(){
                timeBlocksService.nextTimeblock()
            }

        };
    },
    components: { TrackCard }
};
</script>


<style lang="scss" scoped>

</style>