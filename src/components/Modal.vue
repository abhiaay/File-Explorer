<template>
    <div class="modal micromodal-slide" :id="id" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
            <div class="modal__container" role="dialog" aria-modal="true" :aria-labelledby="`${id}-title`">
                <header class="modal__header">
                    <h2 class="modal__title" :id="`${id}-title`">
                        {{ title }}
                    </h2>
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                </header>
                <main class="modal__content" :id="`${id}-content`">
                    <slot></slot>
                </main>
                <footer class="modal__footer">
                    <button class="modal__btn modal__btn-primary" @click="emit('save')">{{ continueText
                        }}</button>
                    <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">{{ closeText
                        }}</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import MicroModal from 'micromodal';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
        required: true
    },
    continueText: {
        type: String,
        default: 'Continue'
    },
    closeText: {
        type: String,
        default: 'Close'
    }
})

const emit = defineEmits(['save', 'close']);

onMounted(() => {
    MicroModal.init({
        onClose: modal => emit('close', modal),
        awaitOpenAnimation: true, // [8]
        awaitCloseAnimation: true, // [9]
    });
})
</script>