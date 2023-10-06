<template>
  <!-- Here is the default App.vue -->
  <!-- <header>
    
  </header> -->
  <main>
    <div class="container-fluid m-0">
    <router-view />
    </div>
  </main>
   <!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { logger } from "./utils/Logger"
import Pop from "./utils/Pop"
import { spotifyLoginService } from "./services/SpotifyLoginService"

export default {
  setup() {
    onMounted(() => {
      accessTokenCheck()
    })
    // This checks for a token in local storage
    async function accessTokenCheck() {
      if (localStorage.getItem('access_token')) {
        AppState.accessToken = localStorage.getItem('access_token')
        AppState.refreshToken = localStorage.getItem('refresh_token')
        logger.log('Access Token', AppState.accessToken, AppState.refreshToken)
        // Now we need to see if this token is expired by sending a simple request with a function
        if (await checkExpired()) {
          logger.log('Token is expired.. Refreshing')
          await spotifyLoginService.refreshAccessToken()
        }
      }
    }

    // This checks if the token is expired
    async function checkExpired() {
      try {
        await spotifyLoginService.checkExpired()
      } catch (error) {
        return true
      }
    }
    return {
      appState: computed(() => AppState)
    }
  },
  // components: { Navbar }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

main {
  // background-color: #eeeeee;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

// Color Classes
.darkgrey {
  color: #4f4f4f;
  // color: #0E3160;
}

.purple {
  color: #E1289F;
}
</style>
