<template>
    <form @submit.prevent="createEvent">
      <div class="mb-3">
        <label for="eventTitle" class="form-label">Event Title</label>
        <input v-model="eventData.title" type="title" class="form-control" id="eventTitle" placeholder="event title">
      </div>
      <select v-model="eventData.type" class="form-select mb-3" aria-label="Choose an event">
        <option selected>Event Type</option>
        <option value="Wedding">Wedding</option>
        <option value="Birthday">Birthday</option>
        <option value="Club">Club</option>
        <option value="Party">Party</option>
      </select>
      <div class="mb-3">
        <label for="eventDescription" class="form-label">Event Description</label>
        <textarea v-model="eventData.description" class="form-control" id="eventDescription" rows="5"></textarea>
      </div>
      <button class="btn btn-dark">Create Event</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import Pop from "../utils/Pop.js";
import {eventsService} from '../services/EventsService.js'
export default {
  setup(){
    const eventData = ref({})
  return {
    eventData,

    async createEvent(){
      try {
        await eventsService.createEvent(eventData.value)
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