<template>
    <div class="timeblock-list">
        <div v-for="timeblock in myTimeblocks" :key="timeblock.id">
        <Timeblock :timeblock="timeblock"/>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Timeblock from '../components/Timeblock.vue'
export default {
    setup(){
    return { 
        myTimeblocks: computed(() => AppState.myTimeblocks),
     }
    },
    
    components: {Timeblock}
};
</script>


<style lang="scss" scoped>
.timeblock-list {
  height: 75vh;
  background-color: #eeeeee;
  border: solid 8px #242424;
  border-radius: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none; 
}

.timeblock-list::-webkit-scrollbar {
  display: none;
}
</style>