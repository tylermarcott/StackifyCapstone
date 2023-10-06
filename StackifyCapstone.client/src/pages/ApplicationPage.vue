<template>
  <section class="full-app-view p-0">
    <section class="row app-wrapper">
      <div class="col-3 left-panel p-0">
        <section class="row">
        <div class="col-12 d-flex justify-content-center align-items-end">
          <EventDropdown/> 
          <ModalWrapper id="create-event">
              <!-- FIXME: formatting is off for this compared to the item to the left of it. -->
              <template #button> 
                      <i class="mdi mdi-plus add-button"></i>
              </template>
                  <template #body>
                  <CreateEventForm/>
              </template>
          </ModalWrapper>
        </div>
        </section>
        <TimeBlockList/>
        <div class="active-song d-flex align-items-center justify-content-center" type="button" data-toggle="modal" data-target="#activesongmodal">
          <ActiveSong/>
        </div>
      </div>
      <div class="col-7 center-panel p-0">
        <!-- NOTE: this is the search for song form at the top of the page -->
        <!-- FIXME: BUT FIRST, we need to create timeblocks and do a bunch of other prereq stuff before we can create an event, add a timeblock and add a song to a timeblock.  -->
        <!-- TODO: ok so we have songs populated on the page from our search result. Next, we need to add a button on each song card that allows you to add a song. This button will have an onclick that will fire a get track request so we can get the song itself and save it to our DB.
        -->
        <SongSearchBar/>
        <div class="main-content justify-content-center align-items-center background-img">
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
            <h1 class="text-light mt-5 ms-5">
              No active timeblock or searched song...
            </h1>
          </div>
          <!-- <div v-else>
            active Timeblock
          </div>
          <h2>Main Content</h2> -->
        </div>
        <Player/>
      </div> 
      <div class="col-2 right-panel p-0 text-center">
        <Profile/>
      </div>
    </section>
  </section>
  <ModalWrapper id="my-song">
      <template #body>
        <TimeBlockTrackDetails/>
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
import { spotifyPlaylistService } from "../services/SpotifyPlaylistService.js";
import EventDropdown from '../components/EventDropdown.vue';
import TimeBlockList from '../components/TimeBlockList.vue';
import ActiveTimeblockMusic from '../components/ActiveTimeblockMusic.vue';
import ActiveTimeblockSilent from '../components/ActiveTimeblockSilent.vue';

export default {
    setup() {
        // NOTE: this is the data submitted from the upper search bar to search for a song, album or artist
        async function getUserPlaylists() {
          try {
            logger.log('Fetching User Playlists')
            await spotifyPlaylistService.getUserPlaylists()
          } catch (error) {
            Pop.error(error)
          }
        }
        async function refreshToken() {
            if (AppState.tokenExpire == null || Date.now() > AppState.tokenExpire) {
                try {
                    logger.log('Refreshing token..');
                    await spotifyLoginService.refreshAccessToken();
                }
                catch (error) {
                    Pop.error(error);
                }
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
            getUserPlaylists();
            setInterval(refreshToken, 600000);
        });
        return {
            tracks: computed(() => AppState.tracks),
            activeTrack: computed(() => AppState.activeTrack),
            activeTimeblock: computed(()=> AppState.activeTimeBlock)
            

            
        };
    },
    components: { SongSearchBar, Player, EventDropdown, TimeBlockList, ActiveTimeblockMusic, ActiveTimeblockSilent }
};
</script>


<style lang="scss" scoped>
.full-app-view {
  background-color: #053b81;
}

.app-wrapper {
  background-color: #053b81;
}

// This is the Left Panel (EVENT, TIMEBLOCKS, ACTIVE SONG)

.left-panel {
  height: 100vh;
  background-color: #053b81;
}

.active-song {
  height:20vh;
  // background-color: #eeeeee;
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  border: solid 8px #053b81;
  border-top: none;
  border-radius: 15px;
}


.searched-song-card{
  padding: 1em;
  background-color: #4F4F4F;
  color: #FFFFFF;
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


.add-button {
  background-color: #63FAAA ;
  border: none;
  border-radius: 8px;
  margin-left: 5px;
  margin-right: 12px;
  font-size: 26px;
  transition: .1s;
  padding: 4px;
}

.add-button:hover {
  transform: scale(1.1);
}


.main-content {
  height: 75vh;
  background-color: #eeeeee;
  border: solid 8px #053b81;
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


// This is the Right Panel Section (ACCOUNT, SPACER)
.right-panel {
  height: 100vh;
  // background-color: #4f4f4f;
  background-image: url('https://wallpapers.com/images/hd/plain-black-background-02fh7564l8qq4m6d.jpg');
  background-position: center;
  border: solid 8px #053b81;
  border-radius: 15px;
  color: #eeeeee;
}
</style>