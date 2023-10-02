<template>
  <section class="full-app-view p-0">
    <section class="row app-wrapper">
      <div class="col-3 left-panel p-0">
        <section class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <EventDropdown/> 
        </div>
        </section>
        <TimeBlockList/>
        <div v-if="activeTrack" class="active-song" type="button" data-toggle="modal" data-target="#activesongmodal">
          <ActiveSong/>
        </div>
      </div>
      <div class="col-7 center-panel p-0">
        <!-- NOTE: this is the search for song form at the top of the page -->
        <!-- FIXME: BUT FIRST, we need to create timeblocks and do a bunch of other prereq stuff before we can create an event, add a timeblock and add a song to a timeblock.  -->
        <!-- TODO: ok so we have songs populated on the page from our search result. Next, we need to add a button on each song card that allows you to add a song. This button will have an onclick that will fire a get track request so we can get the song itself and save it to our DB.
        -->
        <SongSearchBar/>

        <div class="main-content d-flex justify-content-center align-items-center">
          <!-- NOTE use a row on the search songs component-->
          <!-- <div v-if>
            search songs
            <div v-for="track in tracks" :key="track.id" class="col-12 col-md-10 elevation-2 m-2 p-2 create-track-card">
              <TrackCard :track="track"/>
            </div>
          </div>
          <div v-else>
            active Timeblock
          </div> -->


          <h2>Main Content</h2>

        </div>
        <Player/>
      </div> 
      <div class="col-2 right-panel p-0 text-center">
        <Profile/>
        <!-- <div class="right-panel-spacer">
          <router-link :to="{name: 'Home'}"><i class="mdi mdi-home home-button"></i></router-link>
        </div>
        <img class="img-fluid profile-picture" src="../assets/img/StackifySVG-footer.svg" alt="account-picture">
        <h2 class="account-text">Sample Name</h2>
        <h2 class="account-text">Account Settings</h2>
        <h2 class="account-text">Invite Collaborator</h2> -->
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
import ActiveSong from '../components/ActiveSong.vue'
import SongSearchBar from '../components/SongSearchBar.vue';
import Player from '../components/Player.vue';
import Profile from '../components/Profile.vue'
import { spotifyPlaylistService } from "../services/SpotifyPlaylistService.js";
import EventDropdown from '../components/EventDropdown.vue';
import TimeBlockList from '../components/TimeBlockList.vue';

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
            // NOTE call this function with the track id to load song spotifyPlayerService.loadSong(trackId)
        });
        return {
            tracks: computed(() => AppState.tracks),
            activeTrack: computed(() => AppState.activeTrack)
        };
    },
    components: { SongSearchBar, Player, EventDropdown, TimeBlockList }
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

.active-song {
  height:20vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-top: none;
  border-radius: 15px;
}



// This is the Center Panel Section (SEARCH, MAIN, PLAYER)

.center-panel {
  height: 100vh;
}

input {
}
// .search {
//   background-color: #4f4f4f;
//   border: solid 8px #242424;
//   border-left: none;
//   border-right: none;
//   border-bottom: 0px;
//   border-radius: 15px;
//   height: 5vh;
// }



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


// This is the Right Panel Section (ACCOUNT, SPACER)
.right-panel {
  height: 100vh;
  background-color: #4f4f4f;
  border: solid 8px #242424;
  border-radius: 15px;
  color: #eeeeee;
}

// .right-panel-spacer {
//   height: 5vh;
// }

// .profile-picture {
//   height: 100px;
//   width: 100px;
//   border-radius: 50%;
//   border: 1px solid #EA94FF;
//   margin: 5vh 0vh;
// }

// .account-text {
//   color: #EA94FF;
//   font-size: 1.2rem;
//   padding: .5rem;
//   transition: .3s;
// }

// .account-text:hover {
//   color: #63FAAA;
// }

// NOTE UNCOMMENT THIS MAYBE
// .create-track-card{
//   border-radius: 5px;
//   background-color: #92946B;
// }

// .home-button {
//   font-size: 2rem;
//   color: #eeeeee;
// }
</style>