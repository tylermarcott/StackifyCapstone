<template>
 <header>
    <section class="row landing-navigation">
      <div class="col-4 d-flex align-items-center justify-content-center">
        <h2 class="m-5 site-logo purple">Stackify</h2>
         <div class="backdrop-circle">

        </div>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
          <section class="row g-5">
            <div class="col-4">
              <h2 class="purple">About</h2>
            </div>
            <div class="col-4">
              <h2 class="purple">Login</h2>
            </div>
            <div class="col-4">
              <h2 class="purple">Application</h2>
            </div>
          </section>
        </div>
    </section>
    <section class="row landing-splash">
      <div class="col-4">
      </div>
      <div class="col-8 text-center">
        <img class="img-fluid spotify-logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify-logo">
        <div class="m-5 text-center splash-caption">
          <p><b>Extend the functionality of your Spotify Premium</b></p>
        </div>
      </div>
    </section>
    <section class="row landing-overview d-flex justify-content-center ">
      <div class="col-12 d-flex justify-content-center align-items-end">
        <h3 class="overview-title my-5">Concept</h3>
      </div>
      <div class="col-6">
        <p class="overview-body">New concept for how you manage your spotify playlists, something about how it is useful to use timeblocks, gain control over the event, random marketing stuff that makes sense for what we are doing or maybe appeals to someone that might use the app. Potentially event planners and or DJs and stuff like that.</p>
      </div>
    </section>
    <section class="row spacer">

    </section>
    <section class="row cta d-flex align-items-center">
      <div class="col-6">
        <div class="cta-image"></div>
      </div>
      <div class="col-6">
        <div class="cta-text">
          <h3 class="cta-title">Call To Action Title</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere neque voluptatem, assumenda exercitationem impedit mollitia qui quas accusamus id pariatur sed quasi. Mollitia tenetur recusandae iste voluptate, eos tempore dolorem sunt modi voluptates necessitatibus! Quos laborum nam, repellendus quae beatae vitae accusamus labore placeat itaque cumque voluptate dignissimos ab facilis!</p>
          <router-link :to="{ name: 'Login' }">
            <button class="btn cta-button" >Launch App</button>
          </router-link>
        </div>  
      </div>
    </section>
    <section class="row landing-footer d-flex">
      <div class="col-6 footer-links d-flex justify-content-between align-items-end">
        <p>Footer Link</p>
        <p>Footer Link</p>
        <p>Footer Link</p>
      </div>
    </section>
 </header>

  
  

</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">


.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

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
  width: 25vw;
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
  font-size: 2rem;
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
  width: 70vh;
  background-color: #4f4f4f;
  border-radius: 50%;
  position: absolute;
  top: -40vh;
  left: -10vh;
  z-index: -1;
}

.site-logo {
  z-index: 5;
  font-size: 5rem;
  margin: 3rem;
}
</style>
