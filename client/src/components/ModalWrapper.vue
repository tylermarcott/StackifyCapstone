

<template>
    <div v-if="showButton" type="button" data-bs-toggle="modal"
        :data-bs-target="`#${id}`">
        <slot name="button">
            
        </slot>
    </div>
    <div class="modal fade" :id="id" tabindex="-1" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content background-img">
                <div class="modal-header">
                    <slot name="header">
                        <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </slot>
                </div>
                <div class="modal-body text-light">
                    <slot name="body">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: { id: { type: String, required: true }, showButton: { type: Boolean, default: true }, btnColor: { type: String, default: 'secondary' } },
    setup() {
        return {

        }
    }
};
</script>


<style lang="scss" scoped>
.modal-wrapper {
    background-color: #4f4f4f;
    padding: 0px;
}

.modal-header {
    cursor: default;
    border: none;
}

.background-img{
  background-image: url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80');
  background-position: center;
  background-size: cover;
  backdrop-filter: blur(10px);
}

.modal {
    cursor: default;
}
</style>