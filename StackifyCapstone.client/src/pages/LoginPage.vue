<template>
  <section class="row login-panel d-flex justify-content-center">
      
  </section>
  <section class="row welcome">
    <div class="col-12 text-center welcome-text">
      <h2 class="login-title"><b>Welcome to <span class="stackify-accent">Stackify</span> {{ user.name }}</b></h2>
      <section class="row my-3 d-flex justify-content-center">
        <div class="col-1">
          <Login/>
        </div>
      </section>
    </div>
     <div class="col-12 text-center">
       <h3 class="login-text">Let's get your Spotify Connected</h3>
      <img class="img-fluid spotify-logo elevation-4 p-5 rounded" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify-logo">
    </div>
    <div class="col-12 text-center p-3">
      <button class="btn connect-button"><b>Connect</b></button>
    </div>
  </section>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return { 
    user: computed(() => AppState.user),
    account: computed(() => AppState.account)
   }
  }
};
</script>


<style lang="scss" scoped>
 

  .login-title {
    font-size: 4rem;
  }

  .login-text {
    color: #4f4f4f
  }

  .stackify-accent {
    color: #63FAF5;
  }

  .welcome {
    background-image: url(../assets/img/StackifySvg-loginpage.svg);
    background-size: cover;
    background-position: center;
    height: 100vh;
    color: #eeeeee;
  }

  .welcome-text {
    margin-top: 10vh;
  }

  .login-panel {
    background-color: #4f4f4f;
  }

  .spotify-logo {
    width: 25vw;
    background-color: #4f4f4f;
}

.connect-button {
  color: #4f4f4f;
  background-color: #EA94FF;
  transition: .5s;
  padding: 2rem;
}

.connect-button:hover {
  color: #4f4f4f;
  background-color: #63FAF5;
}
</style>