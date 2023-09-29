<template>
    <router-link :to="{ name: 'Home' }" class="">
    <h2 class="m-5 site-logo ">Stackify</h2>
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
  margin: 3rem;
}
</style>