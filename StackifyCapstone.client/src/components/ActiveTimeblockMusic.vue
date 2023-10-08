<template>
    <section class="row justify-content-center text-center my-3">
        <div class="col-2 d-flex align-items-center justify-content-center">
            <button title="Previous Time Block" @click="prevTimeblock()" :disabled="timeblock.position<=0" class="btn bg-green"><i class="arrow mdi mdi-menu-left"></i></button>
        </div>
        <div class="col-8 title-card rounded">
            <h2 class="font">{{ timeblock.title }}</h2>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
            <button title="Next Time Block" @click="nextTimeblock()" :disabled="timeblock.position==timeblocksLength-1" class="btn bg-green"><i class="arrow mdi mdi-menu-right"></i></button>
        </div>
    </section>
    <section class="row">
        <div class="col-12">
            <div v-if="timeblock.trackList[0]" class="d-flex justify-content-evenly align-items-center">
                <h5 @click="loadSong(timeblock.trackList[0].id)" class="p-2 ms-2 btn bg-green">Start Playlist</h5>
                <button title="Unlock Playlist" v-if="timeblock.locked" @click="toggleLock()" class="btn bg-light-pink  my-3"><i class="mdi mdi-lock"></i></button>
                <button title="Lock Playlist" v-else @click="toggleLock()" class="btn bg-green my-3"><i class="mdi mdi-lock-open"></i></button>
            </div>
            <h5 class="text-end mx-3 text-light">Total Duration: {{ msToTime(totalDuration) }}</h5>
            <div v-for="track in timeblock.trackList" :key="track.id" class="my-2">
                <TrackCard :track="track"/>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import TrackCard from './TrackCard.vue';
import {timeBlocksService} from '../services/TimeBlocksService'
import Pop from "../utils/Pop.js";
import { spotifyPlayerService } from "../services/SpotifyPlayerService.js";
import { logger } from "../utils/Logger.js";
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
                let totalTime = Math.floor(ms / 1000)
                let calculatedHours = Math.floor(totalTime / 3600);
                totalTime -= Math.floor(calculatedHours * 3600)
                let computedMinutes = Math.floor(totalTime / 60);
                if (computedMinutes < 10) {
                    computedMinutes = `0${computedMinutes.toString()}`
                }
                totalTime -= Math.floor(computedMinutes * 60)
                let totalSeconds = totalTime;
                if (totalSeconds < 10) {
                    totalSeconds = `0${totalSeconds.toString()}`
                }
                logger.log('total seconds', totalSeconds)
                return calculatedHours + ':' + computedMinutes + ':' + totalSeconds;
            },
            async loadSong(trackId){
                try {
                    AppState.playingTimeBlock = AppState.activeTimeBlock
                    logger.log('starting song with the following track Id:', trackId)
                    await spotifyPlayerService.loadSong(trackId)
                } catch (error) {
                    Pop.error(error)
                }
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
    background-color: #cd00ff;    
}
.bg-light-pink{
    background-color: #cd00ff;
}

.bg-green{
    background-color: #63FAAA;
}

.bg-dark-gray{
    background: #4F4F4F;
}

.title-card{
    color: #eeeeee;
    background-image: url("https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg");
    padding: 0.3em;
}

.font{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 40px;
}

.arrow {
    font-size: 1.5rem;
}
</style>