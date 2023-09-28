<template>
  <section class="full-app-view p-0">
    <section class="row app-wrapper">
      <div class="col-3 left-panel p-0">
        <h2 class="event-title m-0 text-center">Event Title Sample</h2>  
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
        <div class="main">
          <form class="d-flex justify-content-center m-2">
          <input type="string" class="search-bar d-flex justify-content-between"><button class="search-button"><i class="mdi mdi-magnify search-icon"></i></button>
          </form>
          <div class="main-content d-flex justify-content-center align-items-center">
            <h2>Main Content</h2>
          </div>
        </div>
        <div class="player text-center">
          <h2>Player</h2>
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



  <!-- Modal YOU NEED TO ON MOUNTED FUNCTIONS FOR THE MODAL TO WORK IN VUE -->
  <div class="modal fade" id="activesongmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

export default {
  setup(){
    // onMounted(() => {
    //   state.modal_active = new bootstrap.Modal('#activeSongModal', {})
    // })
    // function openSongModal() {
    //   state.modal_active.show()
    // }

    // function closeSongModal() {
    //   state.modal_active.hide
    // }
  return { 
    // openSongModal,
    // closeSongModal
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
  color: #EA94FF;
  border: solid 8px #242424;
  border-bottom: 0px;
  border-radius: 15px;
  height: 5vh;
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

.center-panel {
  height: 100vh;
}

// This is the Center Panel Section (SEARCH, MAIN, PLAYER)
.main {
  height: 80vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-left: none;
  border-right: none;
  border-radius: 15px;
}

.search-bar {
  background-color: #eeeeee;
  height: 3vh;
  width: 80%;
  border-radius: 8px;
  border: none;
}

.search-icon {
  background-color: #EA94FF;
  width: 40px;
}

.search-button {
  background-color: #EA94FF ;
  border: none;
}

.main-content {
  height:73vh;
  margin: .5rem;
  border-radius: 15px;
  border: solid 3px #EA94FF;
  background-color: #eeeeee;
}

.player {
  height: 20vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 15px;
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
}

.home-button {
  font-size: 2rem;
  color: #eeeeee;
}
</style>