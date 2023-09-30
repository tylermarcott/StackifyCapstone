<template>
    <div class="timeblock-card d-flex justify-content-between align-items-center elevation-4">
        <h3 class="timeblock-text">Timeblock</h3>
        <h3 class="timeblock-timer">0:00</h3>
    </div>
</template>

<script>
export default {
setup() {
  return {};
},
};
</script>


<style lang="scss" scoped>
.timeblock-card {
  margin: 1rem;
  background-color: #4f4f4f;
  border-radius: 8px;
  padding: .5rem;
  color:#eeeeee;
}

.timeblock-card:hover {
  transform: scale(1.01);
}

.timeblock-text {
  font-size: 1rem;
  margin: 0px;
}

.timeblock-timer {
  font-size: 1rem;
}
</style>