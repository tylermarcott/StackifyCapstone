<template>
  <section class="row landing-navigation">
    <div class="col-4 d-flex justify-content-center align-items-center">
      <Logo/>
       <div class="backdrop-circle"></div>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
      <Navbar/>
      </div>
  </section>
  <section class="row">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <h2 class="text-center">Event Playlists</h2>
      <div class="col-6" v-for="playlist in playlists" :key="playlist.id">
        <section class="row m-1" >
        <div class="col-12 text-center" :playlist="playlist">
          <b>{{ playlist.name }}</b>
          <p>Songs: {{ playlist.trackCount }}</p>
        </div>
        </section>
      </div>
    <h2 class="text-center">Playlists</h2>
    <div class="col-6" v-for="playlist in playlists" :key="playlist.id">
      <section class="row m-1" >
      <div class="col-12 text-center" :playlist="playlist">
        <b>{{ playlist.name }}</b>
        <p>Songs: {{ playlist.trackCount }}</p>
      </div>
      </section>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { spotifyPlaylistService } from "../services/SpotifyPlaylistService";
export default {
  setup() {
    async function getUserPlaylists() {
      try {
        logger.log('Fetching User Playlists')
        await spotifyPlaylistService.getUserPlaylists()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getUserPlaylists()
    })
    return {
      account: computed(() => AppState.account),
      playlists: computed(() => AppState.playlists)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.about {
  margin-bottom: 10vh;
}

.backdrop-circle {
  height: 70vh;
  width: 70vh;
  background-color: #4f4f4f;
  border-radius: 50%;
  position: absolute;
  top: -40vh;
  left: -10vh;
  z-index: -1;
}

.landing-navigation {
  height: 20vh;
}
</style>
