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
    <section class="row text-center">
        <div class="col-12">
            <h1>{{ msToTime(timeblock.duration) }}</h1>
        </div>
    </section>
    <section class="row text-center">
        <ModalWrapper id="save-notes">
              <template #button> 
                <button v-if="!timeblock.notes" class="btn btn-outline-success w-75 my-2">Create Notes</button>
                <button v-else class="btn btn-outline-success w-25 my-2">Edit Notes</button>
              </template>
                <template #body>
                    <form @submit.prevent="saveNotes">
                    <div class="mb-3">
                        <label for="notes" class="form-label">Notes</label>
                        <textarea v-model="notesData.notes" class="form-control" id="notes" rows="10"></textarea>
                    </div>
                 <button class="btn btn-dark">Save Notes</button>
                </form>
              </template>
          </ModalWrapper>
          <p>{{ timeblock.notes }}</p>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect, onUnmounted } from 'vue';
import {timeBlocksService} from '../services/TimeBlocksService'
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';

export default {
    setup(){
        const notesData = ref({});
        onMounted(()=> startInterval())
        let intervalId = 0
        function startInterval(){
            let timerInterval = setInterval(minusTime, 1000)
            intervalId = timerInterval
            logger.log(timerInterval)
        }
        function minusTime(){
            logger.log('1 second')
            // clearInterval(intervalId)
        }
        onUnmounted(()=> {
            clearInterval(intervalId)
        })
    return { 
        notesData,
        timeblock: computed(() => AppState.activeTimeBlock),
        timeblocksLength: computed(()=> AppState.myTimeBlocks.length),
        prevTimeblock(){
            timeBlocksService.prevTimeblock()
        },
        nextTimeblock(){
            timeBlocksService.nextTimeblock()
        },
        
        
        paused: false,
        timeLeft: computed(()=>AppState.activeTimeBlock.duration),
        
        msToTime(ms) {
            const totalSeconds = Math.floor(ms / 1000)
            const computedMinutes =  Math.floor(totalSeconds / 60)
            let computedSeconds = totalSeconds % 60;
            if(computedSeconds < 10) {
                computedSeconds = `0${computedSeconds}`
            }
            return computedMinutes + ':' + computedSeconds
        },

        
        

        async saveNotes(){
            try {
                await timeBlocksService.saveNotes(this.timeblock.id, notesData.value)
                Pop.success('notes saved!')
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