<template>
    <form @submit.prevent="saveNotes">
    <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea v-model="notesData.notes" class="form-control" id="notes" rows="10"></textarea>
    </div>
    <button class="btn btn-dark">Save Notes</button>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { timeBlocksService } from '../services/TimeBlocksService';
import { Modal } from 'bootstrap';

export default {
    setup(){
        const notesData = ref({});
    return { 
        notesData,
        async saveNotes() {
        try {
            await timeBlocksService.saveNotes(AppState.activeTimeBlock.id, notesData.value);
            Pop.success('notes saved!');
            Modal.getOrCreateInstance('#save-notes').hide()
        }
        catch (error) {
            Pop.error(error);
        }
    }, 
    }
    }
};
</script>


<style lang="scss" scoped>

</style>