<template>
    <div class="timeblock-list"> 
        <section class="timeblocks-section">
            <div v-for="timeblock in myTimeblocks" :key="timeblock.id">
                <TimeBlockCard :timeblock="timeblock"/>
            </div>
        </section>
        <section class="timeblock-imports d-flex-column align-items-center">
            <!-- TODO add the timeblock create model here -->
            <ModalWrapper id="create-timeblock" data-bs-toggle="create-timeblock-modal">
              <template #button> 
                <button class="btn btn-outline-success w-100 my-2">+</button>
              </template>
                  <template #body>
                  <CreateTimeblockForm @formSubmitted="closeModal"/>
              </template>
            </ModalWrapper>
            
            <!-- TODO add the all TimeblocksModel here -->
            <button class="btn btn-outline-success w-100">import timeblock</button>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, watchEffect } from 'vue';
import TimeBlockCard from '../components/TimeBlockCard.vue'
import Pop from '../utils/Pop';
import {timeBlocksService} from '../services/TimeBlocksService'
import CreateTimeblockForm from './CreateTimeblockForm.vue';
export default {
    setup(){
        watchEffect(()=> {
            AppState.account;
            getMyTimeBlocks();
        });

        async function getMyTimeBlocks(){
            try {
                if(!AppState.account.id){
                    return
                }
                if(!AppState.activeEvent){
                    return
                }
                await timeBlocksService.getMyTimeBlocks()
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        myTimeblocks: computed(() => AppState.myTimeBlocks),
    }
    },
    
    components: {TimeBlockCard, CreateTimeblockForm}
};
</script>


<style lang="scss" scoped>
.timeblock-list {
    height: 75vh;
    background-color: #eeeeee;
    border: solid 8px #242424;
    border-radius: 15px;
    position: relative;
}

.timeblocks-section{
    height: 63vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none; 
}

.timeblock-imports { 
  position: absolute;
  bottom: 0px;
  width: 100%;
}

.timeblocks-section::-webkit-scrollbar {
  display: none;
}
</style>