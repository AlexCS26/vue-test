<script setup>
import { computed } from 'vue';
import '../../styles/appsearch.css';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Buscar...'
    }
});

const emit = defineEmits(['update:modelValue', 'input']);

const searchValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
        emit('input', value);
    }
});
</script>

<template>
    <div class="search">
        <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input v-model="searchValue" class="search__input" type="text" :placeholder="placeholder"
               aria-label="Campo de búsqueda">
    </div>
</template>
