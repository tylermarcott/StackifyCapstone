<template>
  <header>
    <section class="row d-flex landing-navigation">
      <div class="col-12 col-md-4 d-flex justify-content-center align-items-center ">
        <Logo/>
        <div class="backdrop-circle">
        </div>
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-evenly align-items-center">
        <NavBar />
        </div>
    </section>

    <section class="row landing-splash">
      <div class="col-12 col-md-4">
      </div>
      <div class="col-12 col-md-8 text-center">
        <a href="https://open.spotify.com/" target="_blank">
        <img class="img-fluid spotify-logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify-logo">
      </a>
        <div class="m-5 text-center splash-caption">
          <p><b>Extend the functionality of your Spotify Premium</b></p>
        </div>
      </div>
    </section>
    <section class="row landing-overview d-flex justify-content-center ">
      <div class="col-12 d-flex justify-content-center align-items-end">
        <h3 class="overview-title my-5">Concept</h3>
      </div>
      <div class="col-12 col-md-6">
        <p class="overview-body">Harnessing the power of Spotify's API our user-friendly platform empowers individuals to curate playlists effortlessly, utilizing criteria such as Genre, BPM, Key, or dance-ability. Your playlists can be custom crafted towards the event type that you are hosting.</p>
      </div>
    </section>
    <section class="row spacer">
    </section>
    <section class="row cta d-flex align-items-center">
      <div class="col-12 col-md-6">
        <div class="cta-image image-fluid"></div>
      </div>
      <div class="col-12 col-md-6">
        <div class="cta-text">
          <h3 class="cta-title">Our Application</h3>
          <p>Discover Stackify, a helpful spotify premium extension for event planners and amateur DJs. </p>
          <router-link :to="{ name: 'Login' }">
            <button class="btn cta-button" >Launch App</button>
          </router-link>
        </div>  
      </div>
    </section>
    <Foot />
  </header>




</template>

<script>
import NavBar from '../components/Navbar.vue'
import Foot from '../components/Foot.vue'
import Logo from '../components/Logo.vue'
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
  window.scrollTo(0, 0)
})
    return {}
  },
  components : { NavBar, Foot, Logo, }
}
</script>

<style scoped lang="scss">



.spacer {
  height: 20vh;
  background-color: #4f4f4f;
}

.landing-navigation {
  height: 20vh;
}

.landing-splash {
  margin-top: 20vh;
  min-height: 80vh;
  background-image: url('../assets/img/StackifySVG.svg');
  background-size: cover;
  background-position: bottom;
  z-index: 3;
}

.splash-caption {
  font-size: 2rem;
}

.spotify-logo {
  width: 15vw;
}

.landing-overview {
  min-height: 50vh;
  background-color: #4f4f4f;
}

.overview-title {
  color: #eeeeee;
  font-size: 4rem;
}

.overview-body {
  color: #eeeeee;
  font-size: 1.75rem;
}

.cta {
  min-height: 100vh;
  background-image: url('../assets/img/StackifySVG-cta.svg');
  background-size: cover;
  background-position: bottom;
}

.cta-image {
  max-width: 40vw;
  aspect-ratio: 16/9;
  background-color: #eeeeee;
  margin-left: 10vw;
  background-size: cover;
  background-image: url('../assets/img/AppPageSnapshotImg.png');
}

.cta-title {
  color: #eeeeee;
  font-size: 3rem;
  margin-bottom: 2rem;
}
.cta-text {
  color: #eeeeee;
  margin-right: 10vw;
  margin-left: 10vw;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  color: #eeeeee;
  background-color: #E1289F;
  transition: .5s;
}

.cta-button:hover {
  color: #4f4f4f;
  background-color: #63FAF5;
}

.landing-footer {
  min-height: 70vh;
  background-image: url('../assets/img/StackifySVG-footer.svg');
  background-size: cover;
  background-position: bottom;
}

.footer-links {
  margin-left: 10vw;
  margin-bottom: 5vh;
  font-size: 2rem;
  color:#E1289F;
}

.backdrop-circle {
  height: 70vh;
  width: 37.5vw;
  background-color: #4f4f4f;
  border-radius: 50%;
  position: absolute;
  top: -40vh;
  left: -10vh;
  z-index: -1;
}
@media screen and (max-width: 768px){
    .spotify-logo{
      width: 75vw;
    }
    .backdrop-circle{
      height: 27.5vh;
      width: 100vw;
      top: -10vh;
      left: 0vh;
      border-radius: 40%;
    }

    .cta-image{
      height: 30vh;
      max-width: max-content;
      margin-left: 0;
    }
  }

</style>
