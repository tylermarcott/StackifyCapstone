<template>
    <section v-if="events.length > 0" class="row">
        <div class="col-12 text-light text-center">
            <h1>Select An Event</h1>
        </div>
    </section>
    <section v-if="events.length > 0" class="row justify-content-evenly">
        <div v-for="event in events" :key="event.id" class="col-5">
            <div @click="setActiveEvent(event)" class="text-center event-card elevation-5 selectable" :event="event">
                <h2  class=" event-title text-center">{{ event.title }}</h2>
                <h5>{{ event.eventType }}</h5>
                <p>{{ event.eventDescription }}</p>
            </div>
        </div>
    </section>
    <section class="row justify-content-center text-center">
        <div class="col-12 text-light text-center">
            <h1>Create A New Event</h1>
            <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#create-event">New Event</button>
        </div>

    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { timeBlocksService } from '../services/TimeBlocksService';
import Pop from '../utils/Pop';
export default {
    setup(){
    return { 
        events: computed(()=> AppState.events),
        setActiveEvent(event){
            AppState.activeEvent = event
            this.setActiveTimeblock()
        },
        async setActiveTimeblock(){
            try {
                AppState.gettingActiveTimeblock = true
                await timeBlocksService.getMyTimeBlocks()
                const firstTimeblock = AppState.myTimeBlocks[0]
                if(firstTimeblock){
                    timeBlocksService.setActiveTimeblock(firstTimeblock.id)    
                } else{
                    AppState.activeTimeBlock = null;
                }
                AppState.gettingActiveTimeblock = false
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>
.event-card {
  background-color: #eeeeee;
  border-radius: 8px;
  margin: .5rem 0px;
  padding: 0px;
  border: solid 8px #2f2f2f;
}

.event-card:hover {
    transform: scale(1.05);
}

.event-title {
  background-color: #4f4f4f;
  color: #eeeeee;
  font-size: 1.5rem;
  padding: .5rem;
}
</style>