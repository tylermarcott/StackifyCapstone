<template>
  <section class="row landing-navigation">
      <div class="col-12 col-md-4 d-flex align-items-center justify-content-center">
      <Logo class="text-dark-grey"/>
        <div class="backdrop-circle">
      </div>
    </div>
    <div class="col-12 col-md-8 d-flex justify-content-center align-items-center">
      <Navbar class="text-dark-grey"/>
    </div>
  </section>

  <section class="row ">
    <div class="col-12 text-center mt-5">
      <h2 class="p-3 p-title mt-5 mb-0">Our Project</h2>
    </div>
    <div class="col-12 mb-5">
      <p class="p-3 paragraph my-5">
      Stackify is a music application tailored for event planners and amateur DJs.  It sets the stage for effortless music management. With an intuitive interface, it simplifies music selection, curation, and playback, offering dynamic features such as genre-based recommendations and sorting by BPM, Key, or dance-ability. This innovative approach to playlist curation serves as an invaluable tool for seamlessly identifying tracks that harmonize beautifully. Stackify is meticulously crafted to cater to the precise requirements of event organizers and budding DJs, empowering them to effortlessly elevate event ambiance and entertainment quality.
      
      <br><br>
      Languages and tools used: HTML, JavaScript, Vue, NodeJS, Spotify API, MongoDB
      </p>
    </div>
  </section>



  <div class="profiles mt-5 p-5">
    
    <section class="mt-5 row d-flex justify-content-between text-center ">
      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://ca.slack-edge.com/T1GGQN1RU-U05LNQW85JP-3a23bed14dbc-512" alt="">
        <h5 class="text-pink mt-2">Austin Perry</h5>
        <h5><a class="links" href="https://github.com/AustinPerry22" target="_blank"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/austin-perry22/" target="_blank"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://avatars.githubusercontent.com/u/36865028?v=4" alt="">
        <h5 class="text-pink mt-2">Everett Smith</h5>
        <h5><a class="links" href="https://github.com/everettsmith928" target="_blank"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/everett-smith-811b57132/" target="_blank"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://media.licdn.com/dms/image/D5603AQF1OQkw9eTbTQ/profile-displayphoto-shrink_800_800/0/1696514966160?e=1701907200&v=beta&t=FH5pUgCY5tjKdMYuxXrlnzA1wOGF5bhSCUxl8lzXJ5M" alt="">
        <h5 class="text-pink mt-2">Lance Fontanilla</h5>
        <h5><a class="links" href="https://github.com/LanceFontanilla" target="_blank"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/lancefontanilla/" target="_blank"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>

      <div class="col-12 col-md-3">
        <img class="profile-pic" src="https://media.licdn.com/dms/image/D5635AQGp4kuQFZpeaw/profile-framedphoto-shrink_800_800/0/1696473547278?e=1698879600&v=beta&t=Z0E7rApC7fNGK3917aTNLOaQrJN89a6PjQyeKH0W_zc" alt="">
        <h5 class="text-pink mt-2">Tyler Marcott</h5>
        <h5><a class="links" href="https://github.com/tylermarcott" target="_blank"><span class="mdi mdi-github fs-1"></span></a> <a class="links" href="https://www.linkedin.com/in/tyler-marcott-225277204/" target="_blank"><span class="mdi mdi-linkedin fs-1"></span></a> </h5>
      </div>
    </section>
    
  </div>

    
    <section>
    <Foot />
  </section>


  
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Foot from '../components/Foot.vue'
import Logo from '../components/Logo.vue'
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
  window.scrollTo(0, 0)
})
    return {

    }
  },
  components: { Navbar, Foot, Logo }
}
</script>

<style scoped lang="scss">
.landing-navigation {
  height: 20vh;
 
}

.p-title{
  background-color:#eeeeee  ;
  color: #4f4f4f ;
  margin: 30vw
}
.paragraph {
  background-color: #eeeeee;
  color:  #4f4f4f ;
  margin: 10vw;
  font-size: 1.75rem;
}
.bg-dark-grey{
  background-color: #4f4f4f;
}

.text-dark-grey{
  color: #4f4f4f
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
  color:#63B3FA ;
}

.body{
  background-color: #4f4f4f;
}

.backdrop-circle {
  height: 70vh;
  width: 37.5vw;
  background-color: #e1289f;
  border-radius: 50%;
  position: absolute;
  top: -40vh;
  left: -10vh;
  z-index: -1;
}

@media screen and (max-width: 768px){


  .backdrop-circle{
      height: 27.5vh;
      width: 100vw;
      top: -10vh;
      left: 0vh;
      border-radius: 40%;
    }
}

</style>
