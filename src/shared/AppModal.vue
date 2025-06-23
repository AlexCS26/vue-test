<script setup>
import '../styles/appmodal.css';

defineProps({
    show: {
        type: Boolean,
        required: true
    }
});

defineEmits(['close']);
</script>

<template>
    <transition name="modal">
        <div v-if="show" class="modal-mask" @click.self="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                        </slot>
                        <button class="modal-close" @click="$emit('close')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
