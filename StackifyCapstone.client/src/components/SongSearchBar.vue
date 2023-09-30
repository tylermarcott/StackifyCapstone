<template>
    <div class="search d-flex justify-content-center align-items-center">
        <form @submit.prevent="searchSong" class="w-100 row">
        <div class="col-12 d-flex justify-content-center align-items-center">
            <input v-model="searchData.query" class="search-bar"><div class="text-center">
            <button class="search-button">
            <i class="mdi mdi-magnify search-icon"></i>
            </button></div>
        </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { spotifyApiService } from '../services/SpotifyApiService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
setup() {
    const searchData = ref({});
  return {
    searchData,
    resetForm(){
      searchData.value = { type: '' }
    },

    async searchSong(){
      try {
        let searchValue = searchData.value.query
        logger.log('our search value is this:', searchValue)
        let formattedSearch = searchValue.replace(' ', '+')
        await spotifyApiService.searchSong(formattedSearch)
        Pop.toast('Search successful', 'success')
        this.resetForm()
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
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-left: none;
  border-right: none;
  border-bottom: 0px;
  border-radius: 15px;
  height: 5vh;
}

.search-bar {
  width: 100%;
  background-color: #eeeeee;
  border-radius: 8px;
  border: none;
}

.search-icon {
  border-radius: 8px;
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
</style>