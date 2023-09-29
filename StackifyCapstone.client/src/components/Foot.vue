<template> 

    <section class="row landing-footer d-flex">
    <div class="col-8 footer-links d-flex justify-content-between align-items-end">
      <!-- //TODO - change Learn More Link  -->
        <router-link :to="{ name: 'About' }" class="" style="color: #e1289f;"><p> Learn More</p></router-link>
        <p> <a style="color: #e1289f;" href="https://github.com/tylermarcott/StackifyCapstone">GitHub Repo</a> </p>
        <p> <a style="color: #e1289f;" href="https://github.com/tylermarcott/StackifyCapstone">Spotify Developer Terms</a> </p>
    </div>
    </section>

</template>

<script>
export default {
setup() {
  return {};
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
  font-size: 2rem;
}

.footer-link-style{

}
</style>