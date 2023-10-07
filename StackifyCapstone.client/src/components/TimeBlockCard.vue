<template>
    <div title="Set Active Timeblock" @click="setActiveTimeblock()" class="timeblock-card row selectable justify-content-between align-items-center elevation-4">
        <h3 class="timeblock-text col-5">{{ timeblock.title }}</h3>
        <h3 v-if="timeblock.isSilent" class="timeblock-timer m-0 text-center col-2">{{msToTime(timeblock.duration)}}</h3>
        <h3 v-else class="timeblock-timer m-0 text-center col-2">{{msToTime(totalDuration)}}</h3>
        <button title="Delete Timeblock" class="btn col-2" @click.stop="deleteTimeblock(timeblock.id)"><i class='fs-5 mdi mdi-delete-forever text-light'></i></button>
        <div class="col-2">
          <i v-if="topTimeBlock != timeblock.id" title="Move Timeblock Up" @click.stop="moveTimeblock('up')" class="mdi mdi-arrow-up-bold-outline change-spot-icon selectable"></i>
          <i v-if="bottomTimeBlock != timeblock.id" title="Move Timeblock Down" @click.stop="moveTimeblock('down')" class="mdi mdi-arrow-down-bold-outline change-spot-icon selectable"></i>
        </div>
    </div>
</template>

<script>
import { computed} from 'vue';
import { Timeblock } from '../models/Timeblock';
import { AppState } from '../AppState';
import { timeBlocksService } from '../services/TimeBlocksService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';

export default {
  props: {timeblock: {type: Timeblock, required: true}},
setup(props) {
  return {
    topTimeBlock : computed(()=> AppState.myTimeBlocks[0].id),
    bottomTimeBlock : computed(()=> AppState.myTimeBlocks[AppState.myTimeBlocks.length-1].id),
    cardColor: computed(()=>{
      let color = '#4f4f4f9e'
      if(AppState.activeTimeBlock){
        if(AppState.activeTimeBlock.id == props.timeblock.id){
          color = '#EA94FF'
        } 
      }
      return color
    }),

    msToTime(ms) {
          const totalSeconds = Math.floor(ms / 1000);
          const computedMinutes = Math.floor(totalSeconds / 60);
          let computedSeconds = totalSeconds % 60;
          if (computedSeconds < 10) {
              computedSeconds = `0${computedSeconds}`;
          }
          return computedMinutes + ':' + computedSeconds;
      },
      totalDuration: computed(()=> {
                const tracks = props.timeblock.trackList
                let duration = 0
                tracks.forEach(track => {
                    duration += track.duration
                });
                return duration
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
    },

    async deleteTimeblock(timeblockId){
      try {
        if(await Pop.confirm('Are you sure you want to delete this timeblock?')){
          logger.log('this is the timeblockId', timeblockId)
          await timeBlocksService.deleteTimeblock(timeblockId)
          Pop.toast('You have deleted this timeblock', 'success', 'center')
        } 
      } catch (error) {
        Pop.error(error)
      }
    },
  };
},
};
</script>


<style lang="scss" scoped>
.timeblock-card {
  margin: 1rem;
  background-color: v-bind(cardColor);
  // background: #4f4f4f9e;
  border-radius: 8px;
  padding: .5rem;
  color: v-bind(textColor);
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

.test-pink{
  background-color: #ea94ffc9;
}

.change-spot-icon:hover{
  color: #63FAAA;
  color: #000000
}
</style>