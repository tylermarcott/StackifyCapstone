<template>
  <section class="row">

      <div class="col-6 col-md-4">
        <router-link v-if="route.path != '/about'" :to="{ name: 'About' }" class="">
          <h2 class="purple">About</h2>
        </router-link>
      </div>
      <div v-if="account.id == null && tokenOk == false" class="col-6 col-md-4">
        <router-link :to="{ name: 'Login' }" class="">
          <h2 class="purple"> Login </h2>
        </router-link>
    </div>
    <div v-if="account.id != null && tokenOk == true" class="col-6 col-md-4">
      <router-link :to="{ name: 'Account' }" class="">
        <h2 class="purple"> Account </h2>
      </router-link>
    </div>
    <div v-if="tokenOk == true && account.id != null" class="col-6 col-md-4">
      <router-link :to="{ name: 'Application', params: { application: 'application' } }" class="">
      <h2 class="purple">Application</h2>
      </router-link>
    </div>
    <div v-else class="col-6 col-md-4">
      <router-link :to="{ name: 'Login' }" class="">
      <h2 class="purple">Connect Spotify</h2>
      </router-link>
    </div>
    <!-- //NOTE - Div classes for spacing -->
    <div class="col-4"></div>
    <div class="col-4"></div>
    <div class="col-4"></div>
    <div class="col-4"></div>

    <!-- TODO: -->
    <!-- NOTE: if user IS logged in, display this -->
    <!-- <div class="col-4">
        <router-link :to="{ name: 'Account' }" class="">
          <h2 class="purple">Account</h2>
        </router-link>
      </div> -->
    </section>
  </template>

<script>
import { computed, onMounted, watchEffect } from "vue"
import { AppState } from "../AppState"
import { spotifyLoginService } from "../services/SpotifyLoginService"
import { logger } from "../utils/Logger"
import { useRoute } from "vue-router"


export default {
  setup() {
    
  const route = useRoute()
  let tokenOk = computed(()=> AppState.tokenOk)
  let account = computed(()=> AppState.account)


    async function accessTokenCheck() {
      if (localStorage.getItem('access_token')) {
        AppState.accessToken = localStorage.getItem('access_token')
        AppState.refreshToken = localStorage.getItem('refresh_token')
        logger.log('Access Token', AppState.accessToken, AppState.refreshToken)
        // Now we need to see if this token is expired by sending a simple request with a function
        if (await checkExpired()) {
          logger.log('Token is expired.. Refreshing')
          await spotifyLoginService.refreshAccessToken()
          AppState.tokenOk = true
          
        } else {
          AppState.tokenOk = true
          logger.log('token ok', tokenOk)
        }
      } else {
        logger.log('no token')
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
    watchEffect(() => tokenOk)
    onMounted(() => accessTokenCheck())
    return {
      tokenOk,
      account,
      route
    }
  }

}
</script>

<style scoped lang="scss">
a:hover {
  text-decoration: none;
}

</style>
