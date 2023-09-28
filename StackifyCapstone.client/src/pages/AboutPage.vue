<template>

<div class="">
  
  <section class="row landing-navigation">
    <div class="col-10 d-flex justify-content-end align-items-center">
      <Navbar />
    </div>
  </section>

  <section class="row bg-dark-grey">
    <div class="col-12 text-center mt-5">
      <h2 class="p-3 p-title my-0">Our Business</h2>
    </div>
    <div class="col-12 mb-5">
      <p class="p-3 paragraph my-5 fs-5">
      "Stackify is a music application tailored for event planners and amateur DJs.  It sets the stage for effortless music management. With an intuitive interface, it simplifies music selection, curation, and playback, offering dynamic features such as genre-based recommendations and sorting by BPM, Key, or dance-ability. This innovative approach to playlist curation serves as an invaluable tool for seamlessly identifying tracks that harmonize beautifully. Stackify is meticulously crafted to cater to the precise requirements of event organizers and budding DJs, empowering them to effortlessly elevate event ambiance and entertainment quality."
      <br><br>
      "Our concept is elegantly straightforward: Harnessing the power of Spotify's API, we seamlessly retrieve music information tailored to the user's preferences. Our user-friendly platform empowers individuals to curate playlists effortlessly, utilizing criteria such as Genre, BPM, Key, or dance-ability. These playlists are custom-crafted to suit any niche, mood, or musical style, ensuring a perfect harmony for every occasion."
      <br><br>
      Languages and tools used: HTML, JavaScript, Vue, NodeJS, Spotify API
      </p>
    </div>
  </section>



  <div class="profiles mt-5 p-5">
    
    <section class="mt-5 row d-flex justify-content-between text-center ">
      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LNQW85JP-3a23bed14dbc-512" alt="">
        <h5 class="text-pink mt-2">Austin Perry</h5>
        <h5><a class="links" href="https://github.com/AustinPerry22"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/austin-perry22/"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LNTZ1ULS-eaef7b01235f-512" alt="">
        <h5 class="text-pink mt-2">Everett Smith</h5>
        <h5><a class="links" href="https://github.com/everettsmith928"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/everett-smith-811b57132/"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://media.licdn.com/dms/image/C5603AQEI57XOlFhY5Q/profile-displayphoto-shrink_800_800/0/1596575033704?e=1701302400&v=beta&t=aZQP3MWQ9g8CJyQfkKp4H1wpu1yEnKAxOSwWTFvvJxQ" alt="">
        <h5 class="text-pink mt-2">Lance Fontanilla</h5>
        <h5><a class="links" href="https://github.com/LanceFontanilla"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/lancefontanilla/"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LG8XL8NA-e5f49bb82361-512" alt="">
        <h5 class="text-pink mt-2">Tyler Marcott</h5>
        <h5><a class="links" href="https://github.com/tylermarcott"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/tyler-marcott-225277204/"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>
    </section>
    
  </div>

    
    <section>
    <Foot />
  </section>

  </div>
  
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Foot from '../components/Foot.vue'
export default {
  setup() {
    return {

    }
  },
  components: { Navbar, Foot }
}
</script>

<style scoped lang="scss">
.landing-navigation {
  height: 20vh;
  background-color: #4f4f4f;
}

.p-title{
  background-color: #4f4f4f;
  color: #eeeeee;
  margin: 30vw
}
.paragraph {
  background-color: #4f4f4f;
  color: #eeeeee;
  margin: 10vw
}
.bg-dark-grey{
  background-color: #4f4f4f;
}

.text-pink{
  color: #e1289F
}

.text-light-blue{
  color: #63FAF5
}

.profile-pic{
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

.profiles{
  margin: 5vw; 
  background-color: #eeeeee;
}

.links{
  text-decoration: none;
  color:#63FAF5 ;
}

.body{
  background-color: #4f4f4f;
}

</style>
