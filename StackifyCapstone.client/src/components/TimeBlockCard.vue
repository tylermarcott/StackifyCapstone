<template>
    <div v-on:dblclick="setActiveTimeblock()" class="timeblock-card row justify-content-between align-items-center elevation-4">
        <h3 class="timeblock-text col-7">{{ timeblock.title }}</h3>
        <h3 class="timeblock-timer col-3">{{ timeblock.duration }}</h3>
        <div class="col-2">
          <i v-if="topTimeBlock != timeblock.id" @click="moveTimeblock('up')" class="mdi mdi-arrow-up-bold-outline change-spot-icon selectable"></i>
          <i v-if="bottomTimeBlock != timeblock.id" @click="moveTimeblock('down')" class="mdi mdi-arrow-down-bold-outline change-spot-icon selectable"></i>
        </div>
    </div>
</template>

<script>
import { computed, watchEffect} from 'vue';
import { Timeblock } from '../models/Timeblock';
import { AppState } from '../AppState';
import { timeBlocksService } from '../services/TimeBlocksService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';

export default {
  props: {timeblock: {type: Timeblock || Object, required: true}},
setup(props) {
  return {
    topTimeBlock : computed(()=> AppState.myTimeBlocks[0].id),
    bottomTimeBlock : computed(()=> AppState.myTimeBlocks[AppState.myTimeBlocks.length-1].id),
    cardColor: computed(()=>{
      if(AppState.activeTimeBlock.id == props.timeblock.id){
        return '#EA94FF'
      }else{
        return '#4f4f4f'
      }
    }),

    async moveTimeblock(upOrDown){
      try {
        await timeBlocksService.moveTimeblock(props.timeblock, upOrDown)
      } catch (error) {
        Pop.error(error)
      }
    },

    setActiveTimeblock(){
      timeBlocksService.setActiveTimeblock(props.timeblock.id)
    }
  };
},
};
</script>


<style lang="scss" scoped>
.timeblock-card {
  margin: 1rem;
  background-color: v-bind(cardColor);
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
  color: #63FAAA;
}
</style>