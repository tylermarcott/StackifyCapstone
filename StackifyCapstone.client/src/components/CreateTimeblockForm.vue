<template>
    <form class="text-light" @submit.prevent="createTimeblock">
      <div class="mb-3">
        <label for="timeblockTitle" class="form-label">Playlist Title</label>
        <input v-model="timeblockData.title" type="title" class="form-control" id="timeblockTitle" placeholder="playlist name" required="true">
      </div>
      <div class="mb-3">
        <label for="timeblockSilent" class="form-label me-2">Check if this is silent</label>
        <input v-model="timeblockData.silent" type="checkbox" id="timeblockSilent"/>
      </div>
      <div v-if="timeblockData.silent" class="mb-3">
        <label for="timeblockduration" class="form-label">Hours</label>
        <input v-model="timeblockData.hours" type="number" id="timeblockduration" class="form-control" required/>
        <label for="timeblockduration" class="form-label">Minutes</label>
        <input v-model="timeblockData.minutes" type="number" id="timeblockduration" class="form-control" required/>
      </div>
      <button class="btn btn-dark">Create Playlist</button>
    </form>
</template>

//FIXME: have to add UI that makes it so the user can't create a playlist without an event selected, need to Pop.toast a message

<script>
import { ref } from 'vue';
import Pop from "../utils/Pop.js";
import {timeBlocksService} from '../services/TimeBlocksService.js'
import { AppState } from '../AppState';
import { logger } from "../utils/Logger.js";
import { Modal } from "bootstrap";
export default {
  setup(){
    const timeblockData = ref({});
    function resetForm() {
      timeblockData.value = { type: '' }
    }
  return {
    timeblockData,
    resetForm,
    async createTimeblock(){
      try {
        timeblockData.value.hours *= 60 
        timeblockData.value.duration = (timeblockData.value.minutes + timeblockData.value.hours) * 60
        timeblockData.value.eventId = AppState.activeEvent.id
        await timeBlocksService.createTimeblock(timeblockData.value)
        Pop.success('Playlist Created!', 'success')
        resetForm()
        Modal.getOrCreateInstance('#create-timeblock').hide()
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