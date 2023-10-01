<template>
  <section class="row">
    <div class="col-4 d-flex justify-content-center align-items-center">
      <Logo/>
       <div class="backdrop-circle"></div>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
      <Navbar/>
      </div>
  </section>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
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

.landing-navigation {
  height: 20vh;
}
</style>
