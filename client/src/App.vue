<template>
  <main>
    <div class="container-fluid m-0">
    <router-view />
    </div>
  </main>
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
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

main{
  overflow: hidden;
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
