<template>
          <section class="row landing-navigation">

          <div class="col-6 m-5 d-flex justify-content-end align-items-center">
              <section class="row g-5">
                <div class="col-4">
                  <router-link :to="{ name: 'About' }" class="">
                  <h2 class="purple">About</h2>
                  </router-link>
                </div>
                <div class="col-4">
                  <router-link :to="{ name: 'Login' }" class="">
                    <h2 class="purple"> Login </h2>
                  </router-link>
                </div>
                <div class="col-4">
                  <router-link :to="{ name: 'Application' }" class="">
                  <h2 class="purple">Application</h2>
                  </router-link>
                </div>
              </section>
            </div>
        </section>
      

      

</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

</style>
