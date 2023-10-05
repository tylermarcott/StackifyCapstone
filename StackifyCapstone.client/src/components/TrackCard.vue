<template>
  <section class="song-card pointer" @dblclick="playTrack(track.id)">
    
    <div class="row">
      <div v-if="!locked" class="col-1">
        <button title="Move Track Up" v-if="topTrack != track.id" @click="moveTrack('up')" class="btn btn-light"><i class="mdi mdi-arrow-up-bold-outline"></i></button>
        <button title="Move Track Down" v-if="bottomTrack != track.id" @click="moveTrack('down')" class="btn btn-light mt-2"><i class="mdi mdi-arrow-down-bold-outline"></i></button>
      </div>
      <div class="col-3">
        {{ track.name }}
      </div>
      <div class="col-2">
        {{ track.artist }}
      </div>

      <div class="col-3">
        {{ track.album }}
      </div>

      <div class="col-1">
        <SongDetailsButton :track="track"/>
      </div>
      <div class="col-2">
        {{ computedMinutes }}:{{ computedSeconds }}
        <div v-if="!locked">
          <button title="Remove Track" @click="deleteTrack()" class="btn bg-dark-pink"><i class="mdi mdi-delete-forever"></i></button>
        </div>
      </div>
    </div>
  </section>
  
  
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Track } from "../models/Track.js";
import { tracksService } from '../services/TracksService';
import Pop from "../utils/Pop.js";
import { spotifyApiService } from "../services/SpotifyApiService.js";
import {spotifyPlayerService} from "../services/SpotifyPlayerService.js"
import SongDetailsButton from './SongDetailsButton.vue';
export default {
  props: { track: { type: Track || Object, required: true } },
  setup(props){
    
    const totalSeconds = computed(()=> Math.floor(props.track.duration/1000))
    const computedMinutes = computed(()=> Math.floor(totalSeconds.value/60))
    const computedSeconds = computed(()=> {
      const seconds = totalSeconds.value % 60;
      return seconds.toString().padStart(2, '0')
    })
    

  return { 
    totalSeconds,
    computedMinutes,
    computedSeconds,
    locked: computed(()=> AppState.activeTimeBlock.locked),
    topTrack : computed(()=> AppState.activeTimeBlock.trackList[0].id),
    bottomTrack : computed(()=> AppState.activeTimeBlock.trackList[AppState.activeTimeBlock.trackList.length-1].id),
    cardColor: computed(()=>{
      let color = '#4f4f4f'
      if(AppState.activeTrack){
        if(AppState.activeTrack.id == props.track.id){
          color = '#EA94FF'
        } 
      }
      return color
    }),

    async moveTrack(upOrDown){
      try {
        await tracksService.moveTrack(props.track.id, upOrDown)
      } catch (error) {
        Pop.error(error)
      }
    },


    async deleteTrack(){
      try {
        if(await Pop.confirm('Are you sure you want to remove this song from your playlist?')){
        tracksService.deleteTrack(props.track.id)
        }
      } catch (error) {
        Pop.error(error)
      }
    },

    async playTrack(trackId){
      try {
        await spotifyPlayerService.loadSong(trackId);
        // await spotifyPlayerService.togglePlay();
        setTimeout(await spotifyApiService.getActiveTrack, 3000)
      } catch (error) {
        Pop.error(error)
      }
    },

    // async openTrackDetails(trackId, track){
    //   try {
    //     await spotifyApiService.getTimeblockTrackDetails(trackId, track);
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    
    
   }
  }
};
</script>


<style lang="scss" scoped>
.song-card{
  padding: 0.5em;
  background-color: v-bind(cardColor);
  color: #FFFFFF;
  font-size: 18px;
  border-radius: 5px;
  min-height: 8vh;
}

.play-button {
  background-color: #63FAAA ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 12px;
  font-size: 27px;
  transition: .1s;
  padding: 4px;
  color: rgb(19, 18, 18);
  cursor: pointer;
}
.bg-dark-pink{
    background-color: #E1289F;    
}
.bg-light-pink{
    background-color: #E246AB ;
}

.bg-green{
    background-color: #63FAAA;
}

</style>