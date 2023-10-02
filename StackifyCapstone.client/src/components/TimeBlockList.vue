<template>
    <div class="timeblock-list d-flex">
        <div v-for="timeblock in myTimeblocks" :key="timeblock.id">
        <Timeblock :timeblock="timeblock"/>
        </div>
        <section class="w-100 align-self-end">
            <!-- TODO add the timeblock create model here -->
            <button class="btn btn-dark w-100 my-2">+</button>
            <!-- TODO add the all TimeblocksModel here -->
            <button class="btn btn-dark w-100">import timeblock</button>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Timeblock from '../components/Timeblock.vue'
import Pop from '../utils/Pop';
import {timeBlocksService} from '../services/TimeBlocksService'
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
                await timeBlocksService.getMyTimeBlocks()
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        myTimeblocks: computed(() => AppState.myTimeblocks),
     }
    },
    
    components: {Timeblock}
};
</script>


<style lang="scss" scoped>
.timeblock-list {
  height: 75vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-radius: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none; 
}

.timeblock-list::-webkit-scrollbar {
  display: none;
}
</style>