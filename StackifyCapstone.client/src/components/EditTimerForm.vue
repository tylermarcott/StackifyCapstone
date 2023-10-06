<template>           
<form @submit.prevent="editTime">
    <div class="mb-3">
        <label for="duration" class="form-label">Time</label>
        <input v-model="timerData.duration" type="number" class="form-control" id="duration">
    </div>
    <button class="btn btn-dark">update timer</button>
</form>     
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { timeBlocksService } from '../services/TimeBlocksService';
import Pop from '../utils/Pop';
export default {
    setup(){
        const timerData = ref({});
        const timeblockId = computed(() => AppState.activeTimeBlock.id)
    return { 
        timerData,
        timeblockId,
        async editTime(){
            try {
                await timeBlocksService.editTimer(this.timeblockId, timerData.value)
                Pop.success('timer edited!')
            } catch (error) {
                Pop.error(error)
            }
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>