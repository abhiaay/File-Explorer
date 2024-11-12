<template>
    <div class="folder-action">
        <button class="btn btn-secondary" data-micromodal-trigger="create">
            <font-awesome-icon icon="fa-solid fa-folder" />
        </button>
        <button class="btn btn-secondary">
            <font-awesome-icon icon="fa-solid fa-file" />
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
// import MicroModal from 'micromodal';

onMounted(() => {
    // MicroModal.init({
    // onShow: modal => console.info(`${modal.id} is shown`), // [1]
    // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    // openTrigger: 'data-custom-open', // [3]
    // closeTrigger: 'data-custom-close', // [4]
    // openClass: 'is-open', // [5]
    // disableScroll: true, // [6]
    // disableFocus: false, // [7]
    // awaitOpenAnimation: false, // [8]
    // awaitCloseAnimation: false, // [9]
    // debugMode: true // [10]
    // });
})
</script>