<template>
<header>
  <div class="row">
    <div class="col-11 text-center">
      <h1>Test Page</h1>
    </div>
    <div class="col-1 test-button">
      <router-link :to="{ name: 'Home' }"><i class="mdi mdi-home home-button"></i></router-link>
    </div>
  </div>
</header>

<section class="container">
  <div class="row justify-content-center">
    <div class="col-6">
      <CreateEventForm/>
    </div>
  </div>
</section>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

.test-button{
  font-size: 50px;
}

</style>