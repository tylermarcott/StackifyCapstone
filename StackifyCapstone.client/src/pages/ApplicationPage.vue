<template>
  <section class="full-app-view p-0">
    <section class="row app-wrapper">
      <div class="col-3 left-panel p-0">
        <section class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <h2 class="event-title m-0 text-center w-100">Event Title Sample</h2> 
        </div>
        </section>
        <div class="timeblock-list">
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
            <h3 class="timeblock-text">Timeblock</h3>
            <h3 class="timeblock-timer">0:00</h3>
          </div>
        </div>
        <div class="active-song" type="button" data-toggle="modal" data-target="#activesongmodal">
          <section class="row h-100">
            <div class="col-4 d-flex align-items-center">
              <img class="img-fluid active-song-image p-0" src="../assets/img/StackifySVG-cta.svg">
            </div>
            <div class="col-8 p-2 d-flex flex-column justify-content-center">
              <section class="row">
                <div class="col-6 d-flex flex-column justify-content-center">
                  <p class="song-title m-0"><b>Song Title</b></p>
                  <p class="song-title m-0">Album</p>
                  <p class="song-title m-0">Artist</p>
                </div>
                <div class="col-6">
                    <p class="song-title my-2">0:00</p>
                    <p class="song-title m-0">100 BPM</p>
                  </div>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div class="col-7 center-panel p-0">
        <div class="search d-flex justify-content-center align-items-center">





<!-- NOTE: this is the search for song form at the top of the page -->
<!-- TODO: make sure you clear this form after entry -->
          <form @submit.prevent="searchSong" class="w-100 row">
            <div class="col-12 d-flex justify-content-center align-items-center">
              <input v-model="searchData.query" class="search-bar"><div class="text-center">
                <button class="search-button">
                <i class="mdi mdi-magnify search-icon"></i>
              </button></div>
           </div>
          </form>






          <!-- TODO: ok so we have songs populated on the page from our search result. Next, we need to add a button on each song card that allows you to add a song. This button will have an onclick that will fire a get track request so we can get the song itself and save it to our DB.
          -->

          <!-- FIXME: BUT FIRST, we need to create timeblocks and do a bunch of other prereq stuff before we can create an event, add a timeblock and add a song to a timeblock.  -->


        </div>
        <div class="row main-content d-flex justify-content-center align-items-center">

          <div v-for="track in tracks" :key="track.id" class="col-12 col-md-10 elevation-2 m-2 p-2 create-track-card">
            <TrackCard :track="track"/>
          </div>

          <h2>Main Content</h2>









        </div>
        <div class="col-12 player d-flex justify-content-center align-items-center">
          <section class="row">
            <div class="col-3 devices d-flex justify-content-center align-items-center">
                <i class="devices-icon mdi mdi-shuffle-variant"></i>
            </div>
            <div class="col-6 player-controls d-flex justify-content-center p-0">
              <button class="previous elevation-3">
                <i class="mdi mdi-skip-previous"></i>
              </button>
              <!-- NOTE play button -->
              <button @click="togglePlay" class="play elevation-3">
                <i class="mdi mdi-play"></i>
                <!-- <i class="mdi mdi-pause"></i> -->
              </button>
              <button class="next elevation-3">
                <i class="mdi mdi-skip-next"></i>
              </button>
            </div>
            <div class="col-3 devices d-flex justify-content-center align-items-center">
              <i class="devices-icon mdi mdi-devices"></i>
              <i class="devices-icon mdi mdi-volume-high"></i>
            </div>
            <div class="col-12 d-flex justify-content-center align-items-center">
              <p class="duration-text m-0">2:50</p>
              <div class="song-duration-slot elevation-5">
                <div class="song-duration-bar"></div>
              </div>
              <p class="duration-text m-0">4:20</p>
            </div>
          </section>
        </div>
      </div> 
      <div class="col-2 right-panel p-0 text-center">
        <div class="right-panel-spacer">
          <router-link :to="{name: 'Home'}"><i class="mdi mdi-home home-button"></i></router-link>
        </div>
        <img class="img-fluid profile-picture" src="../assets/img/StackifySVG-footer.svg" alt="account-picture">
        <h2 class="account-text">Sample Name</h2>
        <h2 class="account-text">Account Settings</h2>
        <h2 class="account-text">Invite Collaborator</h2>
      </div>
    </section>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { spotifyPlayerService } from "../services/SpotifyPlayerService.js";
import { spotifyLoginService } from "../services/SpotifyLoginService.js";
import Pop from "../utils/Pop.js";
import {spotifyApiService} from '../services/SpotifyApiService.js'
import { logger } from "../utils/Logger.js";
import { start } from "@popperjs/core";

export default {
  setup(){
    // NOTE: this is the data submitted from the upper search bar to search for a song, album or artist
    const searchData = ref({});
    async function refreshToken() {
      if (AppState.tokenExpire == null || Date.now() > AppState.tokenExpire) {
        try {
          logger.log('Refreshing token..')
          await spotifyLoginService.refreshAccessToken()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
    async function startPlayer() {
      try {
        await spotifyPlayerService.StartPlayer()
      } catch (error) {
        Pop.error(error)
      }
    }
    async function initializePlayer() {
      if (localStorage.getItem('access_token')) {
        AppState.accessToken = localStorage.getItem('access_token')
        AppState.refreshToken = localStorage.getItem('refresh_token')
        logger.log('Access Token', AppState.accessToken, AppState.refreshToken)
      }
      else {
        try {
          logger.log(AppState.accessToken)
          await spotifyLoginService.requestAuthCode()
        } catch (error) {
          logger.error(error)
        }
      }
      startPlayer()
    }
    onMounted(()=>{
      initializePlayer()
      // NOTE call this function with the track id to load song spotifyPlayerService.loadSong(trackId)
    })
  return {
    searchData,
    tracks: computed(() => AppState.tracks),
    async togglePlay(){
      try {
        await spotifyPlayerService.togglePlay()
      } catch (error) {
        Pop.error(error)
      }
    },

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
   }
  }
};
</script>


<style lang="scss" scoped>
.full-app-view {
  background-color: #242424;
}

.app-wrapper {
  background-color: #242424;
}

// This is the Left Panel (EVENT, TIMEBLOCKS, ACTIVE SONG)

.left-panel {
  height: 100vh;
  background-color: #242424;
}

.event-title {
  background-color: #4f4f4f;
  font-size: 1.5rem;
  color: #EA94FF;
  border: solid 8px #242424;
  border-bottom: 0px;
  border-radius: 15px;
  height: 5vh;
  padding-top: 4px !important;
}

.timeblock-list {
  height: 75vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-radius: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none; 
}

.timeblock-list::-webkit-scrollbar {
  display: none;
}

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
.active-song {
  height:20vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-top: none;
  border-radius: 15px;
}

.active-song-image {
  height: 100px;
  width: 100px;
  object-fit: cover;
  margin: 1rem;
}

.song-title {
  color:#4f4f4f;
  font-size: 1.2rem;
}

// This is the Center Panel Section (SEARCH, MAIN, PLAYER)

.center-panel {
  height: 100vh;
}

input {
}
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

.main-content {
  height: 75vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-left: none;
  border-right: none;
  border-radius: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none; 
}

.main-content::-webkit-scrollbar {
  display: none;
}


.player {
  height: 20vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 15px;
  button {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    margin: 1rem;
    background-color: #eeeeee;
    border: none;
    color: #242424;
    font-size: 2rem;
    transition: .3s;
  }

  button:hover {
    background-color: #63FAAA;
  }
}

.previous {
  transform: scale(.75);
}

.play {
}

.next {
  transform: scale(.75);
}

.devices-icon {
  color: #EA94FF;
  font-size: 2rem;
  margin-left: 2rem;
}

.devices-icon:hover {
  transform: scale(1.1);
}

.song-duration-slot {
  height: 1vh;
  border-radius: 8px;
  width: 50vw;
  background-color: #eeeeee;
  position: relative;
}

.song-duration-bar {
  height: 1vh;
  border-radius: 8px;
  width: 60%;
  background-color: #EA94FF;
  position: absolute;
}

.duration-text {
  color: #eeeeee;
  padding: .5rem;
  font-size: .75rem;
}

// This is the Right Panel Section (ACCOUNT, SPACER)
.right-panel {
  height: 100vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-radius: 15px;
  color: #eeeeee;
}

.right-panel-spacer {
  height: 5vh;
}

.profile-picture {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid #EA94FF;
  margin: 5vh 0vh;
}

.account-text {
  color: #EA94FF;
  font-size: 1.2rem;
  padding: .5rem;
  transition: .3s;
}

.account-text:hover {
  color: #63FAAA;
}

.create-track-card{
  border-radius: 5px;
  background-color: #92946B;
}

.home-button {
  font-size: 2rem;
  color: #eeeeee;
}
</style>