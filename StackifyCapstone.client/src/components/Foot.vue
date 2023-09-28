<template> 

    <section class="row landing-footer d-flex">
    <div class="col-6 footer-links d-flex justify-content-between align-items-end">
        <p>Footer Link</p>
        <p>Footer Link</p>
        <p>Footer Link</p>
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
  font-size: 2rem;
  color:#E1289F;
}
</style>