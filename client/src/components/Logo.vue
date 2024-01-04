<template>
    <router-link :to="{ name: 'Home' }" class="">
    <h2 class="site-logo ">Stackify</h2>
    </router-link>
</template>

<script>
export default {
setup() {
    return {};
},
};
</script>


<style scoped lang="scss">

.site-logo {
  z-index: 5;
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  margin-right: 7rem;
  margin-left: 7rem;
  color: #EA94FF;
}
</style>