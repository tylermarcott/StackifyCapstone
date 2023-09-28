<template>

<div class="main">
  
  <section class="row landing-navigation">
    <div class="about col-10 d-flex justify-content-end align-items-center">
      <Navbar />
    </div>
  </section>

  <section class="row bg-dark-grey">
    <div class="col-12 text-center mt-5">
      <h3 class="p-3 p-title my-0">Paragraph Title</h3>
    </div>
    <div class="col-12">
      <p class="p-3 paragraph my-5">
      "Stackify is a music application tailored for event planners and amateur DJs.  It sets the stage for effortless music management. With an intuitive interface, it simplifies music selection, curation, and playback, offering dynamic features such as genre-based recommendations and sorting by BPM, Key, or dance-ability. This innovative approach to playlist curation serves as an invaluable tool for seamlessly identifying tracks that harmonize beautifully. Stackify is meticulously crafted to cater to the precise requirements of event organizers and budding DJs, empowering them to effortlessly elevate event ambiance and entertainment quality."
      <br><br>
      "Our concept is elegantly straightforward: Harnessing the power of Spotify's API, we seamlessly retrieve music information tailored to the user's preferences. Our user-friendly platform empowers individuals to curate playlists effortlessly, utilizing criteria such as Genre, BPM, Key, or dance-ability. These playlists are custom-crafted to suit any niche, mood, or musical style, ensuring a perfect harmony for every occasion."
      <br><br>
      Languages and tools used: HTML, JavaScript, Vue, NodeJS, Spotify API
      </p>
    </div>
  </section>

  <div class="">

    <section class="row d-flex justify-content-between text-center bg-dark-grey">
      <div class="col-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LNQW85JP-3a23bed14dbc-512" alt="">
      </div>
      <div class="col-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LNTZ1ULS-eaef7b01235f-512" alt="">
      </div>
      <div class="col-3">
        <img class="profile-pic" src="https://media.licdn.com/dms/image/C5603AQEI57XOlFhY5Q/profile-displayphoto-shrink_800_800/0/1596575033704?e=1701302400&v=beta&t=aZQP3MWQ9g8CJyQfkKp4H1wpu1yEnKAxOSwWTFvvJxQ" alt="">
      </div>
      <div class="col-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LG8XL8NA-e5f49bb82361-512" alt="">
      </div>
    </section>
    
    <section class="row d-flex justify-content-between text-center bg-dark-grey text-pink">
      <div class="col-3">
        <h5>Austin Perry</h5>
      </div>
      <div class="col-3">
        <h5>Everett Smith</h5>
      </div>
      <div class="col-3">
        <h5>Lance Fontanilla</h5>
      </div>
      <div class="col-3">
        <h5>Tyler Marcott</h5>
      </div>
    </section>
    <section class="row d-flex justify-content-between text-center bg-dark-grey text-light-blue">
      <div class="col-3">
        <h5><span class="mdi mdi-github fs-2"></span> <span class="mdi mdi-linkedin fs-2"></span></h5>
      </div>
      <div class="col-3">
        <h5><span class="mdi mdi-github fs-2"></span> <span class="mdi mdi-linkedin fs-2"></span></h5>
      </div>
      <div class="col-3">
        <h5><span class="mdi mdi-github fs-2"></span> <span class="mdi mdi-linkedin fs-2"></span></h5>
      </div>
      <div class="col-3">
        <h5><span class="mdi mdi-github fs-2"></span> <span class="mdi mdi-linkedin fs-2"></span></h5>
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
  background-color: #eeeeee;
  margin: 30vw
}
.paragraph {
  background-color: #eeeeee;
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
  margin: 10vh;
  background-color: #4f4f4f;
}

.main{
  background-color: #4f4f4f;
}

</style>
