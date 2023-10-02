<template>
    <form @submit.prevent="createTimeblock">
      <div class="mb-3">
        <label for="timeblockTitle" class="form-label">Playlist Title</label>
        <input v-model="timeblockData.title" type="title" class="form-control" id="timeblockTitle" placeholder="playlist name" required="true">
      </div>
      <div class="mb-3">
        <label for="timeblockSilent" class="form-label">Check if this is silent</label>
        <input v-model="timeblockData.silent" type="checkbox" id="timeblockSilent"/>
      </div>
      <button class="btn btn-dark">Create Playlist</button>
    </form>
</template>


<script>
import { ref } from 'vue';
import Pop from "../utils/Pop.js";
import {timeBlocksService} from '../services/TimeBlocksService.js'
import { AppState } from '../AppState';
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
        timeblockData.value.eventId = AppState.activeEvent.id
        await timeBlocksService.createTimeblock(timeblockData.value)
        Pop.success('Playlist Created!', 'success')
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