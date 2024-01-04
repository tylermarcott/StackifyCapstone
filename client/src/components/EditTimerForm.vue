<template>           
<form @submit.prevent="editTime">
    <!-- //FIXME - change modal size to smaller size -->
    <div class="mb-3">
        <label for="duration" class="form-label">Minutes</label>
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
import { Modal } from 'bootstrap';
export default {
    setup(){
        const timerData = ref({});
        const timeblockId = computed(() => AppState.activeTimeBlock.id)
        function resetForm() {
            timerData.value = { type: '' }
    }
    return { 
        timerData,
        timeblockId,
        resetForm,
        async editTime(){
            try {
                await timeBlocksService.editTimer(this.timeblockId, timerData.value)
                Modal.getOrCreateInstance('#edit-timer').hide()
                resetForm()
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