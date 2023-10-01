<template>
    <h2 v-if="activeEvent" class="event-title selectable m-0 text-center w-100" type="button" data-bs-toggle="dropdown">{{ activeEvent.title}}</h2>
    <h2 v-else class="event-title selectable m-0 text-center w-100" type="button" data-bs-toggle="dropdown">No active event</h2>
    <ul class="dropdown-menu">
        <li v-for="event in myEvents" :key="event.id">
            <h2 class="event-title selectable m-0 text-center w-100">{{ event.title }}</h2>
        </li>
    </ul>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
export default {
    setup(){
        // onMounted(()=> getMyEvents())

        // async function getMyEvents(){
        //     try {
                
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }
    return { 
        myEvents: computed(()=> AppState.myEvents),
        activeEvent: computed(()=> AppState.activeEvent)
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