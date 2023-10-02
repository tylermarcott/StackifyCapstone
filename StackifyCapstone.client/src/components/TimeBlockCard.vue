<template>
    <div class="timeblock-card row justify-content-between align-items-center elevation-4">
        <h3 class="timeblock-text col-7">{{ timeblock.title }}</h3>
        <h3 class="timeblock-timer col-3">{{ timeblock.duration }}</h3>
        <div class="col-2">
          <i  v-if="topTimeBlock != timeblock.id" class="mdi mdi-arrow-up-bold-outline change-spot-icon selectable"></i>
          <i  v-if="bottomTimeBlock != timeblock.id" class="mdi mdi-arrow-down-bold-outline change-spot-icon selectable"></i>
        </div>
    </div>
</template>

<script>
import { computed} from 'vue';
import { Timeblock } from '../models/Timeblock';
import { AppState } from '../AppState';

export default {
  props: {timeblock: {type: Timeblock || Object, required: true}},
setup() {
  
  return {
    topTimeBlock : computed(()=> AppState.myTimeBlocks[0].id),
    bottomTimeBlock : computed(()=> AppState.myTimeBlocks[AppState.myTimeBlocks.length-1].id),
  };
},
};
</script>


<style lang="scss" scoped>
.timeblock-card {
  margin: 1rem;
  background-color: #4f4f4f;
  border-radius: 8px;
  padding: .5rem;
  color:#eeeeee;
}

.timeblock-card:hover {
  transform: scale(1.01);
}

.timeblock-text {
  font-size: 1rem;
  margin: 0px;
}

.timeblock-timer {
  font-size: 1rem;
}

.change-spot-icon{
  font-size: 1.75rem;
}
.change-spot-icon:hover{
  color: #EA94FF;
}
</style>