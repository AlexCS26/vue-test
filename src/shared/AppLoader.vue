<script setup>
import '../styles/apploader.css';
import { defineProps } from 'vue';
defineProps({
    size: {
        type: String,
        default: 'medium',
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    color: {
        type: String,
        default: 'var(--color-primary)' // Use the global primary color by default
    },
    message: {
        type: String,
        default: 'Cargando...'
    }
});
</script>

<template>
    <div class="app-loader" :class="[size]">
        <div class="app-loader__spinner" :style="{ borderTopColor: color, borderColor: `var(--color-border)` }"></div>
        <p class="app-loader__text">{{ message }}</p>
    </div>
</template>
