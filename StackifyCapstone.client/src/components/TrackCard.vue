<template>
  <section class="song-card elevation-5 selectable mx-2" @dblclick="playTrack(track.id)">
    <div class="row justify-content-evenly">
      <div v-if="!locked" class="col-1 d-flex">
        <button title="Move Track Up" v-if="topTrack != track.id" @click="moveTrack('up')" class="p-0 btn"><i class="mdi mdi-triangle-outline move-button"></i></button>
        <button title="Move Track Down" v-if="bottomTrack != track.id" @click="moveTrack('down')" class="p-0 btn"><i class="mdi mdi-triangle-down-outline move-button"></i></button>
      </div>
      <div class="col-3 no-overflow">
        {{ calculateStringLength(track.name) }}
      </div>
      <div class="col-2 no-overflow">
        {{track.artist }}
      </div>

      <div class="col-3 no-overflow album-column">
        {{ calculateStringLength(track.album) }}
      </div>
      <div class="col-1 no-overflow">
        <i @click="openTrackDetails(track.id, track)" title="shows the song's details" class="mdi mdi-dots-horizontal selectable" data-bs-toggle="modal" data-bs-target='#my-song'></i>
      </div>
      <div class="col-2 no-overflow d-flex justify-content-evenly">
        {{ computedMinutes }}:{{ computedSeconds }}
        <div v-if="!locked">
          <button title="Remove Track" @click="deleteTrack()" class="btn bg-dark-pink m-0"><i class="mdi mdi-delete-forever"></i></button>
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
import { logger } from '../utils/Logger';
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
    timeblockTrackDetails: computed(() => AppState.timeblockTrackDetails),
    bpm: computed(() => (AppState.timeblockTrackDetails.bpm).toFixed(0)),
    locked: computed(()=> AppState.activeTimeBlock.locked),
    topTrack : computed(()=> AppState.activeTimeBlock.trackList[0].id),
    bottomTrack : computed(()=> AppState.activeTimeBlock.trackList[AppState.activeTimeBlock.trackList.length-1].id),
    cardColor: computed(()=>{
      let color = '#4f4f4fe9'
      if(AppState.activeTrack){
        if(AppState.activeTrack.id == props.track.id){
          color = '#ea94fff6'
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
        AppState.playingTimeBlock = AppState.activeTimeBlock
        await spotifyPlayerService.loadSong(trackId);
        // await spotifyPlayerService.togglePlay();
        setTimeout(await spotifyApiService.getActiveTrack, 3000)
      } catch (error) {
        Pop.error(error)
      }
    },
    async openTrackDetails(trackId, track){
      try {
        logger.log('opentrackdetail')
        await spotifyApiService.getTimeblockTrackDetails(trackId, track);
        await spotifyApiService.getTimeblockTrack(trackId)
      } catch (error) {
        Pop.error(error)
      }
    },
    calculateStringLength(string) {
        if (string.length > 20) {
          return string.substring(0, 20) + '...'
        } else {
          return string
        }
      }
   }
  }
};
</script>

<style lang="scss" scoped>
.song-card{
  padding: 0.5em;
  // FIXME: have to figure out how to change opacity on v-bind to make the styling we want.
  background-color: v-bind(cardColor);
  // background: #4f4f4fe9;
  color: #FFFFFF;
  font-size: 18px;
  border-radius: 5px;
  min-height: 4vh;
  user-select: none;
}

.no-overflow{
  white-space: nowrap;
  overflow: hidden;
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

.move-button {
  font-size: 1rem;
  color: #eeeeee !important;
}

.move-button:hover {
  color:#4f4f4f;
}
.bg-dark-pink{
    background-color: #cd00ff;    
}
.bg-light-pink{
    background-color: #cd00ff ;
}

.pink{
  background-color: #ea94fff6;
}

.bg-green{
    background-color: #63FAAA;
}

</style>