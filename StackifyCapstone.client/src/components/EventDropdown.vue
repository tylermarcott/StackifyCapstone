<template>
    <h2 v-if="activeEvent" class="event-title selectable m-0 text-center w-100" type="button" data-bs-toggle="dropdown">{{ activeEvent.title}}</h2>
    <h2 v-else class="event-title selectable m-0 text-center w-100" type="button" data-bs-toggle="dropdown">No active event</h2>
    <ul class="dropdown-menu col-3 bg-dark">
        <li v-for="event in myEvents" :key="event.id">
            <h2 @click="setActiveEvent(event)" class="event-title selectable text-center">{{ event.title }}</h2>
        </li>
    </ul>
</template>


<script>
import { AppState } from '../AppState';
import { computed, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import {eventsService} from '../services/EventsService'
export default {
    setup(){
        
        watchEffect(()=> {
            AppState.account;
            getMyEvents();
        });

        async function getMyEvents(){
            try {
                await eventsService.getEventsByAccount()
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        myEvents: computed(()=> AppState.Events),
        activeEvent: computed(()=> AppState.activeEvent),

        setActiveEvent(event){
            AppState.activeEvent = event
        }
     }
    }
};
</script>


<style lang="scss" scoped>
.event-title {
  background-color: #4f4f4f;
  font-size: 1.5rem;
  color: #EA94FF;
  border: solid 8px #242424;
  border-bottom: 0px;
  border-radius: 15px;
  height: 5vh;
  padding-top: 4px !important;
}
</style>