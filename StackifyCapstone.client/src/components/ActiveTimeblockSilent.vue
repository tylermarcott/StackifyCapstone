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
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import {timeBlocksService} from '../services/TimeBlocksService'
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';

export default {
    setup(){
        const notesData = ref({});
        // watchEffect(()=>{
        //     AppState.activeTimeBlock

        // })
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