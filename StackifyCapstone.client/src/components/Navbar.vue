<template>
        
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
                  <router-link :to="{ name: '' }" class="">
                  <h2 class="purple">Application</h2>
                  </router-link>
                </div>
              </section>
          
    
      

      

</template>

<script>

export default {
  setup() {
    return {}
  },

}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

</style>
