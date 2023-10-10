<template>
    <div class="timeblock-list"> 
        <h2 class="text-light text-center pt-3">Playlists</h2>
        <section class="timeblocks-section">
            <div v-for="timeblock in myTimeblocks" :key="timeblock.id">
                <TimeBlockCard :timeblock="timeblock"/>
            </div>
        </section>
        <section class="timeblock-imports d-flex-column align-items-center">
            <!-- TODO add the timeblock create model here -->
            <ModalWrapper v-if="activeEvent" id="create-timeblock" data-bs-toggle="create-timeblock-modal">
                <template #button> 
                    <button class="btn add-timeblock-button button w-100 my-2" title="Create Timeblock">+</button>
                </template>
                    <template #body>
                    <CreateTimeblockForm/>
                </template>
            </ModalWrapper>
            <!-- TODO add the all TimeblocksModel here -->
            <!-- <button v-if="activeEvent" class="btn btn-outline-success w-100">import timeblock</button> -->
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
        activeEvent: computed(()=> AppState.activeEvent)
    }
    },
    
    components: {TimeBlockCard, CreateTimeblockForm}
};
</script>


<style lang="scss" scoped>
.timeblock-list {
    height: 74vh;
    background-color: #eeeeee;
    border: solid 8px #303030;
    border-radius: 15px;
    position: relative;
    background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
}


.timeblocks-section{
    height: 53vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none; 
}

.add-timeblock-button{
    border: solid 2px #63FAAA;
    color: #63FAAA;
}
.button:hover{
    background-color: #63FAAA;
    color: #303030
}

.timeblock-imports { 
    position: absolute;
    bottom: 0px;
    width: 100%;
}

.timeblocks-section::-webkit-scrollbar {
    display: none;
}
@media screen and (max-width: 768px){
    .timeblock-list{
        height: 60vh;
    }
    .timeblocks-section{
        height: 40vh;
    }
}
</style>