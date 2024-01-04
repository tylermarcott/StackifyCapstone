<template> 

    <section class="row landing-footer d-flex">
    <div class="col-12 col-md-6 footer-links d-flex justify-content-between align-items-end">
      <!-- //TODO - change Learn More Link  -->
        <router-link v-if="route.path != '/about'" :to="{ name: 'About' }" class="" style="color: #EA94FF;"><p> Learn More</p></router-link>
        <p> <a style="color: #EA94FF;" href="https://github.com/tylermarcott/StackifyCapstone" target="_blank">GitHub Repo</a> </p>
        <p> <a style="color: #EA94FF;" href="https://developer.spotify.com/terms" target="_blank">Spotify Developer Terms</a> </p>
    </div>
    </section>

</template>

<script>
import { useRoute } from 'vue-router';

export default {
setup() {
  const route = useRoute()
  return {
    route
  };
},
};
</script>


<style scoped lang="scss">

.landing-footer {
  min-height: 70vh;
  background-image: url('../assets/img/StackifySVG-footer.svg');
  background-size: cover;
  background-position: bottom;
}

.footer-links {
  margin-left: 10vw;
  margin-bottom: 5vh; 
  text-decoration: none;
  color:#E1289F;
  font-size: 1.5rem;
}
</style>