<template>
    <form class="text-light" @submit.prevent="createEvent">
      <div class="mb-3">
        <label for="eventTitle" class="form-label">Event Title</label>
        <input v-model="eventData.title" type="title" class="form-control" id="eventTitle" placeholder="event title" required="true">
      </div>
      <label for="event-type" class="form-label">Event Type</label>
      <select v-model="eventData.eventType" class="form-select mb-3" aria-label="Choose an event" required="true">
        <option value="wedding">Wedding</option>
        <option value="birthday">Birthday</option>
        <option value="club">Club</option>
        <option value="party">Party</option>
      </select>
      <div class="mb-3">
        <label for="eventDescription" class="form-label">Event Description</label>
        <textarea v-model="eventData.eventDescription" class="form-control" id="eventDescription" rows="5"></textarea>
      </div>
      <button class="btn btn-dark">Create Event</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import Pop from "../utils/Pop.js";
import {eventsService} from '../services/EventsService.js'
import { Modal } from 'bootstrap';
export default {
  setup(){
    const eventData = ref({});
    function resetForm() {
      eventData.value = { type: '' }
    }
  return {
    eventData,
    resetForm,
    async createEvent(){
      try {
        await eventsService.createEvent(eventData.value)
        Pop.success('Event Created!', 'success')
        Modal.getOrCreateInstance('#create-event').hide()
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