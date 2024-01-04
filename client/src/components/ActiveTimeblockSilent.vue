<template>
    <section class="row justify-content-center text-center my-3">
        <div class="col-2 d-flex align-items-center justify-content-center">
            <button title="Previous Time Block" @click="prevTimeblock()" :disabled="timeblock.position <= 0" class="btn bg-green"><i class="arrow mdi mdi-menu-left"></i></button>
        </div>
        <div class="col-8 title-card rounded">
            <h2 class="font">{{ timeblock.title }}</h2>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
             <button title="Next Time Block" @click="nextTimeblock()" :disabled="timeblock.position == timeblocksLength - 1" class="btn bg-green"><i class="arrow mdi mdi-menu-right"></i></button>
        </div>
    </section>
    <section class="row text-center">
        <div class="col-12">
            <h2 class="timer-text">{{msToTime(duration)}}</h2>
            <button v-if="!paused" @click="togglePlay()" class="btn bg-pink"><i class="mdi mdi-pause"></i></button>
            <button v-if="paused" @click="togglePlay()" class="btn bg-light-green"><i class="mdi mdi-play"></i></button>
        </div>
    </section>
    <section class="row justify-content-center">
        <div class="col-12 d-flex justify-content-evenly mt-2">
            <button class="btn button button-border w-25 my-2" data-bs-toggle="modal" data-bs-target='#edit-timer'>Edit Timer</button>
            <button v-if="!timeblock.notes" class="btn button button-border w-25 my-2" data-bs-toggle="modal" data-bs-target='#save-notes'>Create Notes</button>
            <button v-else class="btn button button-border w-25 my-2" data-bs-toggle="modal" data-bs-target='#save-notes'>Edit Notes</button>
        </div>
        <div class="col-10 notes-wrapper">
            <h2 class="timer-text text-center m-3">
                Notes
            </h2>
            <p class="notes mx-5">{{ timeblock.notes }}</p>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect, onUnmounted } from 'vue';
import {timeBlocksService} from '../services/TimeBlocksService'
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import EditTimerForm from './EditTimerForm.vue';

export default {
    setup() {
        // const notesData = ref({});
        const timeblock = computed(() => AppState.activeTimeBlock);
        const timeblocksLength = computed(() => AppState.myTimeBlocks.length);
        function prevTimeblock() {
            timeBlocksService.prevTimeblock();
        }
        function nextTimeblock() {
            timeBlocksService.nextTimeblock();
        }
        onMounted(() => startInterval());
        let intervalId = 0;
        function startInterval() {
            let timerInterval = setInterval(minusTime, 1000);
            intervalId = timerInterval;
        }
        let paused = computed(() => AppState.paused);
        let duration = computed(() => AppState.activeTimeBlock.duration);
        function minusTime() {
            if (!paused.value && duration.value > 0) {
                AppState.activeTimeBlock.duration -= 1000;
            }
        }
        onUnmounted(() => {
            paused.value = true;
            clearInterval(intervalId);
        });
        return {
            timeblocksLength,
            timeblock,
            prevTimeblock,
            nextTimeblock,
            paused,
            duration,
            togglePlay() {
                AppState.paused = !AppState.paused;
            },
            msToTime(ms) {
                let totalTime = ms / 1000
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
            
        };
    },
};
</script>


<style lang="scss" scoped>
.button-border{
    border: solid 2px #63FAAA;
    color: #63FAAA;
}
.button:hover{
  background-color: #63FAAA;
  color: #303030
}
.bg-light-green{
    background-color: #63FAAA;
}
.bg-pink{
    background-color: #cd00ff;
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

.timer-text {
    color: #eeeeee;
}

.notes {
    color: #eeeeee;
    margin: 0px;
}

.notes-wrapper {
    min-height: 30vh;
    margin-top: 1vh;
    backdrop-filter: brightness(20%);
    border-radius: 15px;
}

.arrow {
    font-size: 1.5rem;
}
.bg-green{
    background-color: #63FAAA;
}
@media screen and (max-width: 768px){
    
}

</style>