<template>
    <h2 class="event-title selectable text-center mb-0 w-100" type="button" data-bs-toggle="dropdown">{{ activeEvent ? activeEvent.title : "Select An Event"}}</h2>
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
import { timeBlocksService } from "../services/TimeBlocksService.js";
import { logger } from "../utils/Logger.js";
export default {
    setup(){
        
        watchEffect(()=> {
            AppState.account;
            getMyEvents();
        });

        async function getMyEvents(){
            try {
                if(!AppState.account.id){
                    return
                }
                await eventsService.getMyEvents()
            } catch (error) {
                Pop.error(error)
            }
        }
    return { 
        myEvents: computed(()=> AppState.events),
        activeEvent: computed(()=> AppState.activeEvent),

        setActiveEvent(event){
            AppState.activeEvent = event
            this.setActiveTimeblock()
        },

        // FIXME: now when I create a timeblock on an event, it doesn't add the timeblock to the list reactively
        async setActiveTimeblock(){
            try {
                await timeBlocksService.getMyTimeBlocks()
                const firstTimeblock = AppState.myTimeBlocks[0]
                if(firstTimeblock){
                    timeBlocksService.setActiveTimeblock(firstTimeblock.id)    
                } else{
                    AppState.activeTimeBlock = null;
                }
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Julius+Sans+One&family=Nixie+One&family=Rampart+One&display=swap');
.event-title {
    background-color: #4f4f4f;
    font-size: 1.5rem;
    color: #EA94FF;
    border: solid 8px #242424;
    border-bottom: 0px;
    border-radius: 15px;
    height: 5vh;
    padding-top: 4px !important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.add-button {
    background-color: #63FAAA ;
    border: none;
    border-radius: 8px;
    margin-left: 5px;
    margin-right: 12px;
    font-size: 30px;
    transition: .1s;
    padding: 4px;
}
</style>