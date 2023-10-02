<template>
  <div class="row">
    <div class="col-12">
      <h3>{{ event.title }}</h3>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <h5>
        {{ event.eventType }}
      </h5>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      {{ event.eventDescription }}
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from "../models/Event.js";
export default {
  props: {event: {type: Event || Object, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>