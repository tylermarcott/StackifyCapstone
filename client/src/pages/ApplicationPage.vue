<template>
  <section class="full-app-view p-0">
    <section class="row app-wrapper">
      <div class="col-12 col-md-3 left-panel p-0">
        <section class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <EventDropdown/> 
          <ModalWrapper id="create-event">
              <template #button> 
                <div class="add-wrapper">
                <i class="mdi mdi-plus add-button"></i>
                </div>
              </template>
                <template #body>
                <CreateEventForm/>
              </template>
          </ModalWrapper>
        </div>
        </section>
        <TimeBlockList/>
        <div class="active-song d-flex align-items-center justify-content-center invisible-scrollbar" type="button" data-toggle="modal" data-target="#activesongmodal">
          <ActiveSong/>
        </div>
      </div>
      <div class="col-12 col-md-7 center-panel p-0">
        <SongSearchBar/>
        <div class="main-content row justify-content-center mx-1 background-img mt-3 mb-2">
          <!-- NOTE use a row on the search songs component-->
          <div v-if="tracks[0]" class="row justify-content-center">
            <div v-for="track in tracks" :key="track.id" class="col-12 col-md-10 elevation-2 m-2 searched-song-card ms-2">
              <SearchedTrackCard :track="track"/>
            </div>
          </div>
          <div v-else-if="activeTimeblock">
            <div v-if="activeTimeblock.isSilent">
              <ActiveTimeblockSilent/>
            </div>
            <div v-if="!activeTimeblock.isSilent">
              <ActiveTimeblockMusic/>
            </div>
          </div>
          <div v-else>
            <div v-if="!activeEvent">
              <EventSelect/>
            </div>
            <div v-if="!gettingActiveTimeblock && activeEvent">
              <CreateTimeblock/>
            </div>
          </div>
        </div>
        <Player/>
      </div> 
      <div class="col-12 col-md-2 right-panel text-center">
        <Profile/>x
      </div>
    </section>
  </section>
  <ModalWrapper id="my-song">
      <template #body>
        <TimeBlockTrackDetails/>
      </template>
    </ModalWrapper>
    <ModalWrapper id="edit-timer">
          <template #body>
             <EditTimerForm/>
        </template>
    </ModalWrapper>
  <ModalWrapper id="save-notes">
      <template #body>
      <NotesForm/>
      </template>
    </ModalWrapper>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted} from 'vue';
import { spotifyPlayerService } from "../services/SpotifyPlayerService.js";
import { spotifyLoginService } from "../services/SpotifyLoginService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import SongSearchBar from '../components/SongSearchBar.vue';
import Player from '../components/Player.vue';
import EventDropdown from '../components/EventDropdown.vue';
import TimeBlockList from '../components/TimeBlockList.vue';
import ActiveTimeblockMusic from '../components/ActiveTimeblockMusic.vue';
import ActiveTimeblockSilent from '../components/ActiveTimeblockSilent.vue';
import EventSelect from '../components/EventSelect.vue';
import CreateTimeblock from '../components/CreateTimeblock.vue';

export default {
    setup() {
        // NOTE: this is the data submitted from the upper search bar to search for a song, album or artist
        
        async function refreshToken() {
          try {
            logger.log('Refreshing token..');
            await spotifyLoginService.refreshAccessToken();
          }
          catch (error) {
            Pop.error(error);
          }
        }
        async function startPlayer() {
          try {
            await spotifyPlayerService.StartPlayer();
          }
          catch (error) {
            Pop.error(error);
          }
        }
        async function initializePlayer() {
            if (localStorage.getItem('access_token')) {
              AppState.accessToken = localStorage.getItem('access_token');
              AppState.refreshToken = localStorage.getItem('refresh_token');
              logger.log('Access Token', AppState.accessToken, AppState.refreshToken);
            }
            else {
              try {
                  logger.log(AppState.accessToken);
                  await spotifyLoginService.requestAuthCode();
              }
              catch (error) {
                  logger.error(error);
              }
            }
            startPlayer();
        }
        onMounted(() => {
            initializePlayer();
            setInterval(refreshToken, 600000);
        });
        return {
            tracks: computed(() => AppState.tracks),
            activeTrack: computed(() => AppState.activeTrack),
            activeTimeblock: computed(()=> AppState.activeTimeBlock),
            activeEvent: computed(()=> AppState.activeEvent),
            gettingActiveTimeblock: computed(()=> AppState.gettingActiveTimeblock)
        };
    },
    components: { SongSearchBar, Player, EventDropdown, TimeBlockList, ActiveTimeblockMusic, ActiveTimeblockSilent, EventSelect, CreateTimeblock }
};
</script>


<style lang="scss" scoped>
.full-app-view {
  background-color: #303030;
}

.app-wrapper {
  background-color: #303030;
}

// This is the Left Panel (EVENT, TIMEBLOCKS, ACTIVE SONG)

.left-panel {
  height: 100vh;
  background-color: #303030;
}

.active-song {
  height:20vh;
  // background-color: #eeeeee;
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  border: solid 8px #303030;
  border-top: none;
  border-radius: 15px;
}

.searched-song-card{
  padding: 1em;
  background-color: #4f4f4fdc;
  color: #eeeeee;
  font-size: 18px;
  border-radius: 5px;
  max-height: 60vh;
}

.background-img{
  background-image: url('https://images.unsplash.com/photo-1594623930572-300a3011d9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGolMjBjb250cm9sbGVyfGVufDB8fDB8fHww&w=1000&q=80');
  background-position: center;
  background-size: cover;
  backdrop-filter: blur(10px);
}

// This is the Center Panel Section (SEARCH, MAIN, PLAYER)

.center-panel {
  height: 100vh;
  
}

.add-wrapper {
  height: 3vh;
}

.add-button {
  background-color: #63FAAA ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  font-size: 20px;
  transition: .1s;
}

.add-button:hover {
  transform: scale(1.1);
}


.main-content {
  height: 71.5vh;
  background-color: #0f0f0f;
  // border: solid 8px #303030;
  border-left: none;
  border-right: none;
  border-radius: 10px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none; 
}

.main-content::-webkit-scrollbar {
  display: none;
}


// This is the Right Panel Section (ACCOUNT, SPACER)
.right-panel {
  max-height: 100vh;
  // background-color: #4f4f4f;
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  background-position: center;
  border: solid 8px #303030;
  border-radius: 15px;
  color: #eeeeee;
}

@media screen and (max-width: 768px){
    .left-panel{
      height: min-content;
    }
    .right-panel{
      height: min-content;
    }
    .center-panel{
      height: fit-content;
    }

    .searched-song-card{
      height: fit-content;
    }
}
</style>