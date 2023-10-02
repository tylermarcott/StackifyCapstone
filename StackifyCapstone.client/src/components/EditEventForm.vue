<template>
  <div>
    <form @submit.prevent="editEvent()">
      <div class="mb-3">
        <label for="eventTitle" class="form-label">Event Title</label>
        <input v-model="eventData.title" type="title" class="form-control" id="eventTitle" placeholder="event title" required="true">
      </div>
      <select v-model="eventData.eventType" class="form-select mb-3" aria-label="Choose an event" required="true">
        <option selected>Event Type</option>
        <option value="wedding">Wedding</option>
        <option value="birthday">Birthday</option>
        <option value="club">Club</option>
        <option value="party">Party</option>
      </select>
      <div class="mb-3">
        <label for="eventDescription" class="form-label">Event Description</label>
        <textarea v-model="eventData.eventDescription" class="form-control" id="eventDescription" rows="5" required="true"></textarea>
      </div>
      <button class="btn btn-dark">Edit Event</button>
    </form>
  </div>

</template>


<script>
import { ref } from 'vue';
import {eventsService} from '../services/EventsService.js'
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
export default {
  setup(){
    const eventData = ref({});
    function resetForm() {
      eventData.value = { type: '' }
    }
  return { 
      eventData,
      resetForm,
      async editEvent() {
        try {
          const eventId = AppState.activeEvent.id
          const body = eventData.value
          logger.log('here is our edit body:', body)
          await eventsService.editEvent(body, eventId)
          Pop.success('Event Edited!', 'success')
          resetForm()
        } catch (error) {
          Pop.error(error)
        }
      }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>