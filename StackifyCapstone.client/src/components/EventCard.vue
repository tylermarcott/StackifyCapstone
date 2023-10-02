<template>
  <section @click="setActiveEvent(event.id)">
    <div class="row">
      <div class="col-12">
        <h3>{{ event.title }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <h5>
          {{ event.eventType }}
        </h5>
        <div @click="editEvent(event.id)" class="text-primary fs-1">
          <i class="mdi mdi-pencil"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        {{ event.eventDescription }}
        <div @click="deleteEvent(event.id)" class="text-danger fs-1">
          <i class="mdi mdi-delete"></i>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from "../models/Event.js";
import { logger } from "../utils/Logger.js";
import {eventsService} from "../services/EventsService.js"
import Pop from "../utils/Pop.js";
export default {
  props: {event: {type: Event || Object, required: true}},
  setup(){

    // TODO: forgot syntax to add 'are you sure you want to delete?' popup. Add this.
    async function deleteEvent(eventId){
      try {
        await eventsService.deleteEvent(eventId)
        Pop.success('Event deleted!', 'success')
      } catch (error) {
        Pop.error(error)
      }
    }

    // TODO: have to create a modal that will pop it onclick of edit button. Take data from this form, pass it as body for put request

    async function editEvent(eventId){
      try {
        // TODO: add body from modal form for edit
        await eventsService.editEvent(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }


  return {
    deleteEvent,
    async setActiveEvent(eventId){
      await eventsService.setActiveEvent(eventId)
    }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>