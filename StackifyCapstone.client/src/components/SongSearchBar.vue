<template>
    <div v-if="activeTimeBlock" class="search d-flex justify-content-center align-items-center">
        <form @submit.prevent="searchSong" class="w-100 row">
        <div class="col-12 d-flex justify-content-center align-items-center">
            <input v-model="searchData.query" class="search-bar"><div class="text-center">
            <button class="search-button">
              <i class="mdi mdi-magnify search-icon"></i>
            </button>
          </div>
        </div>
        </form>
        <!-- TODO: add v-if so this is not visible when there aren't any searched tracks. -->
        <button v-if="searchData.query" @click="clearSearchedTracks" class="clear-button">
          <p class="search-icon">Clear</p>
        </button>
    </div>
    <div v-else class="empty"></div>
</template>

<script>
import { computed, ref } from 'vue';
import { spotifyApiService } from '../services/SpotifyApiService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import {tracksService} from '../services/TracksService.js'
import { AppState } from "../AppState.js";
export default {
setup() {
    const searchData = ref({});
  return {
    searchData,
    activeTimeBlock: computed(()=>AppState.activeTimeBlock),
    resetForm(){
      searchData.value = { type: '' }
    },

    async clearSearchedTracks(){
      try {
        this.resetForm()
        await tracksService.clearSearchedTracks()
      } catch (error) {
        Pop.error(error)
      }
    },

    async searchSong(){
      try {

        let searchValue = searchData.value.query
        if(searchValue){
          logger.log('our search value is this:', searchValue)
          let formattedSearch = searchValue.replace(' ', '+')
          
          if (formattedSearch) {
            if (AppState.activeTimeBlock) {
              await spotifyApiService.searchSong(formattedSearch)
            } else {
              Pop.toast('Please select a playlist to search songs!', 'warning')
            }
          }
        } else{
          Pop.toast('Please enter a song name into the field.', 'warning')
        }
      } catch (error) {
        Pop.error(error)
      }
    }
  };
},
};
</script>

<style lang="scss" scoped>
.search {
  margin-top: .5em ;
  background-color: #303030;
  // border: solid 8px #242424;
  border-left: none;
  border-right: none;
  border-radius: 8px;
  height: 4vh;
  padding-left: 0.4em;
}

.empty{
  margin-top: .5em ;
  height: 4vh;
}

.search-bar {
  width: 100%;
  background-color: #eeeeee;
  border-radius: 5px;
  border: none;
}

.search-icon {
  border-radius: 8px;
}

.clear-button{
  background-color: #cd00ff;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  transition: .1s;
  font-size: 18px;
  color: #FFFFFF;
  margin-right: 0.4em;
  max-height: 1.7em;
}

.search-button {
  background-color: #63FAAA ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  transition: .1s;
}

.search-button:hover {
  transform: scale(1.1);
}
.clear-button:hover {
  transform: scale(1.1);
}
</style>