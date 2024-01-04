<template>
    <div class="d-flex w-100">
            <h2 class="event-title text-center selectable mb-0 w-100" type="button" data-bs-toggle="dropdown">{{ activeEvent ? activeEvent.title : "Select An Event" }}</h2>
        <ul class="dropdown-menu col-12 col-md-3">
            <li v-for="event in myEvents" :key="event.id">
                <h2 @click="setActiveEvent(event)" class="event-dropdown selectable text-center">{{ event.title }}</h2>
            </li>
        </ul>
    </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, watchEffect } from 'vue';
import Pop from '../utils/Pop';
import {eventsService} from '../services/EventsService'
import { timeBlocksService } from "../services/TimeBlocksService.js";
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
                AppState.gettingActiveTimeblock = true
                await timeBlocksService.getMyTimeBlocks()
                const firstTimeblock = AppState.myTimeBlocks[0]
                if(firstTimeblock){
                    timeBlocksService.setActiveTimeblock(firstTimeblock.id)    
                } else{
                    AppState.activeTimeBlock = null;
                }
                AppState.gettingActiveTimeblock = false;
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
    margin-top: .35em;
    margin-left: .4em;
    background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
    font-size: 1.5rem;
    color: #eeeeee;
    min-height: 5vh;
    // border: solid 8px #242424;
    border-bottom: 0px;
    border-radius: 8px;
    height: 4vh;
    padding-top: 4px !important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.event-dropdown {
    margin-top: .35em;
    margin-left: .4em;
    background-color: #4f4f4f;
    font-size: 1.5rem;
    color: #eeeeee;
    min-height: 5vh;
    // border: solid 8px #242424;
    border-bottom: 0px;
    border-radius: 8px;
    height: 4vh;
    max-width: 44vh;
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

.dropdown-menu{
    max-width: 19em;
    padding-right: 0.7em;
    background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
}

</style>