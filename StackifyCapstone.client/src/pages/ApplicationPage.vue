<template>
  <section class="full-app-view p-0">
    <section class="row">
      <div class="col-3 left-panel p-0">
        <h2 class="event-title m-0 text-center">Sample Event</h2>  
        <div class="timeblock-list">
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
          <div class="timeblock-card d-flex justify-content-between">
            <h3>Timeblock</h3>
            <h3>0:00</h3>
          </div>
        </div>
        <div class="active-song">
          <section class="row h-100">
            <div class="col-4 d-flex align-items-center">
              <img class="img-fluid active-song-image p-0" src="../assets/img/StackifySVG-footer.svg">
            </div>
            <div class="col-8">
              <p class="song-title m-0">Active Song</p>
            </div>
          </section>
          
        </div>
      </div>
      <div class="col-7 center-panel p-0">
        <div class="main justify-content-between">
          <div class="search-bar">search bar <i class="mdi mdi-magnify"></i></div>
        </div>
        <div class="player text-center">
          <h2>Player</h2>
        </div>
      </div> 
      <div class="col-2 right-panel p-0 text-center">
        <div class="right-panel-spacer">

        </div>
        <h2 class="account-name">account panel</h2>
      </div>

    </section>

  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.full-app-view {
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
  margin: 2rem;
  background-color: #4f4f4f;
  border-radius: 15px;
  padding: 1rem;
  color:#eeeeee;
}

.active-song {
  height:20vh;
  background-color: #4f4f4f;
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

.active-song-title {
  color:#EA94FF;
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
  margin: 1rem;
  height: 3vh;
  border-radius: 8px;
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
  border-radius: 8px;
}

.right-panel-spacer {
  height: 5vh;
}
</style>