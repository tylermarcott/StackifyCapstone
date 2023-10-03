<template>
<header>
  <div class="row">
    <div class="col-11 text-center">
      <h1>Test Page</h1>
    </div>
    <div class="col-1 test-button">
      <router-link :to="{ name: 'Home' }"><i class="mdi mdi-home home-button"></i></router-link>
    </div>
  </div>
</header>

    <!-- NOTE: event create form -->
<section class="container">
  <div class="row justify-content-center">
    <div class="col-6">
      <CreateEventForm/>
    </div>
  </div>
</section>

<h3>Searched Song Card</h3>
<section class="mb-5 song-card rounded p-4">
  <SearchedTrackCard/>
</section>


<!-- NOTE: getting list of events for logged in user -->
<section>
  <div v-for="event in events" :key="event.id" class="col-12 col-md-10 elevation-2 m-2 p-2 card clickable">
    <EventCard :event="event"/>
  </div>
</section>



</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
export default {
  setup(){
    watchEffect(()=> {
      AppState.account;
      getMyEvents();
    })

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
    events: computed(()=> AppState.events)
    }
  }
};
</script>


<style lang="scss" scoped>

.test-button{
  font-size: 50px;
}

.clickable{
  cursor: pointer;
}

.song-card{
  padding: 0.5em;
  background-color: #4F4F4F;
  color: #FFFFFF;
  font-size: 18px;
}

</style>