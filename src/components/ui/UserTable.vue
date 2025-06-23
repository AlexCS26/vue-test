<script setup>
import '../../styles/usertable.css';
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    users: {
        type: Array,
        required: true
    }
});

const emits = defineEmits(['edit', 'delete', 'view']);
</script>

<template>
    <div class="table-container">
        <div class="table-wrapper">
            <table class="data-table">
                <thead class="data-table__header">
                    <tr class="data-table__row">
                        <th class="data-table__cell data-table__cell--id">ID</th>
                        <th class="data-table__cell">Nombre</th>
                        <th class="data-table__cell">Usuario</th>
                        <th class="data-table__cell">Email</th>
                        <th class="data-table__cell">Celular</th>
                        <th class="data-table__cell data-table__cell--actions">Acciones</th>
                    </tr>
                </thead>
                <tbody class="data-table__body">
                    <tr v-if="users.length === 0" class="data-table__empty-row">
                        <td colspan="6" class="data-table__empty-cell">
                            <div class="empty-state">
                                <svg class="empty-state__icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <h4 class="empty-state__title">No hay usuarios disponibles</h4>
                                <p class="empty-state__message">No se encontraron usuarios registrados en el sistema.
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr v-else v-for="user in users" :key="user.id" class="data-table__row">
                        <td class="data-table__cell data-table__cell--id">{{ user.id }}</td>
                        <td class="data-table__cell">
                            <div class="user-display">
                                <div class="user-display__avatar">
                                    <img class="user-display__image" :src="`https://i.pravatar.cc/40?u=${user.id}`"
                                        :alt="user.name">
                                </div>
                                <div class="user-display__info">
                                    <span class="user-display__name">{{ user.name }}</span>
                                    <span class="user-display__role" v-if="user.role">{{ user.role }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="data-table__cell">{{ user.username }}</td>
                        <td class="data-table__cell">{{ user.email }}</td>
                        <td class="data-table__cell">
                            <div class="phone-display">
                                <svg class="phone-display__icon" xmlns="http://www.w3.org/2000/svg" width="14"
                                    height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path
                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                                    </path>
                                </svg>
                                {{ user.phone || 'N/A' }}
                            </div>
                        </td>
                        <td class="data-table__cell data-table__cell--actions">
                            <div class="action-buttons">
                                <button @click="emits('view', user)" class="action-button action-button--view"
                                    title="Ver detalles">
                                    <svg class="action-button__icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                                <button @click="emits('edit', user)" class="action-button action-button--edit"
                                    title="Editar">
                                    <svg class="action-button__icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                                <button @click="emits('delete', user.id)" class="action-button action-button--delete"
                                    title="Eliminar">
                                    <svg class="action-button__icon" xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
