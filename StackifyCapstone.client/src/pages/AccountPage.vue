<template>
  <section v-if="account.name" class="row account-wrapper p-2">
    <div class="col-12 landing-navigation landing-navigation d-flex justify-content-center align-items-center">
      <section class="row">
       <h2 class="settings-title text-center">Account Settings</h2>
         <router-link class="text-center" :to="{ name: 'Application', params: {application: 'application'} }"><i class="home-button mdi mdi-application text-center"></i></router-link>
      </section>
    
    </div>
      <section class="row py-2 text-center justify-content-center">
        <div class="col-6  about">
          <h2 class="welcome-text">{{ account.name }}</h2>
        <img class="rounded" :src="account.picture" alt="" />
        <p class="email-text">{{ account.email }}</p>
        
        <button type="button" data-toggle="collapse" data-target="#editAccount" aria-expanded="false" aria-controls="collapseExample" class="connect-button elevation-3"><b>Edit Account</b></button>
        </div>
      </section>
 
    <div class="col-6 event-list">
      <h2 class="text-center event-category-text">Event Playlists</h2>
      <div v-for="playlist in playlists" :key="playlist.id">
        <section class="row m-1" >
        <div class="text-center event-card elevation-5" :playlist="playlist">
          <div class="col-12 event-title">
            <b>{{ playlist.name }}</b>
          </div>
          <p>Songs: {{ playlist.trackCount }}</p>
          <p>{{ playlist.description }}</p>
        </div>
        </section>
      </div>
    </div>
    <div class="col-6 event-list">
      <h2 class="text-center event-category-text">Spotify Playlists</h2>
      <div v-for="playlist in playlists" :key="playlist.id">
        <section class="row m-1" >
        <div class="text-center event-card elevation-5" :playlist="playlist">
          <div class="col-12 event-title">
            <b>{{ playlist.name }}</b>
          </div>
          <div class="col-12">
            <p>Songs: {{ playlist.trackCount }}</p>
            <p>{{ playlist.description }}</p>
          </div>
        </div>
        </section>
      </div>
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

.landing-navigation {
  height: 15vh;
  background-color: #4f4f4f;
  border-radius: 15px;
 
}
.account-wrapper {
  background-color: #2f2f2f;
}
a {
}
img {
  max-width: 100px;
}

.home-button {
   font-size: 2rem;
   color: #eeeeee;
 }

.email-text {
  font-size: 2rem;
  margin: 2rem 1rem;
  color: #EA94FF;
}

.connect-button {
  color: #4f4f4f;
  background-color: #EA94FF;
  transition: .5s;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  margin-top: 1rem;
  margin-bottom: 2rem;

}
.connect-button:hover {
  color: #4f4f4f;
  background-color: #63FAF5;
}

.about {
  background-color: #4f4f4f;
  border-top: solid 8px #2f2f2f;
  border-radius: 15px;
  margin: 0px;
}

.settings-title {
  font-size: 3rem;
  color:#63FAAA;
}

.event-card {
  background-color: #eeeeee;
  border-radius: 8px;
  margin: .5rem 0px;
  padding: 0px;
}

.event-title {
  background-color: #4f4f4f;
  color: #EA94FF;
  font-size: 1.5rem;
  padding: .5rem;
  border: solid 1px #EA94FF;
}

.welcome-text {
  font-size: 4rem;
  color: #EA94FF;
  margin-top: 2rem;
  margin-bottom: 2rem;
  }

  .event-category-text {
    color: #63FAAA;
    margin: 2rem 0rem;
    font-size: 3rem;
  }

  .event-list {
    border: solid 8px #2f2f2f;
    background-color: #4f4f4f;
    border-radius: 15px;
  }




</style>
