<script setup>
import '../styles/appsidebar.css';
import { ref, onMounted } from 'vue';
import { UserService } from '../services/client/useUsers'; // Ajusta la ruta si es necesario.

defineProps({
    title: {
        type: String,
        default: 'Users'
    }
});

const isMenuOpen = ref(true);
const activeSubItem = ref('List');
const subMenuItems = ref(['List']);
const userCount = ref(0); // Ref para almacenar el número de usuarios
const isLoading = ref(true); // Nuevo ref para el estado de carga
const error = ref(null); // Nuevo ref para manejar errores

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Función para cargar los usuarios y actualizar el conteo
const loadUserCount = async () => {
    isLoading.value = true; // Iniciar estado de carga
    error.value = null; // Limpiar errores anteriores
    try {
        // Asegúrate de que los usuarios estén inicializados. Si UserService.initializeUsers()
        // hace una llamada a la API, debería manejar su propio estado de carga y errores.
        await UserService.initializeUsers();
        userCount.value = UserService.getUsers().length; // Obtiene el conteo de usuarios
    } catch (err) {
        console.error("Error al cargar el conteo de usuarios:", err);
        error.value = 'No se pudo cargar el conteo de usuarios.'; // Asignar mensaje de error
    } finally {
        isLoading.value = false; // Finalizar estado de carga
    }
};

// Cargar usuarios cuando el componente se monte
onMounted(() => {
    loadUserCount();
});
</script>

<template>
    <aside class="app-sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="logo-icon">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M25.7508 10.75C28.2508 13.25 29.2508 17 27.2508 20C25.2508 23 21.0008 24.25 17.5008 23.25C14.0008 22.25 11.2508 19.5 10.2508 16C9.2508 12.5 11.2508 9.25 14.2508 7.25C17.2508 5.25 21.2508 6.25 24.2508 9.25"
                            stroke="#4F46E5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14.25 32.75C11.75 30.25 10.75 26.5 12.75 23.5C14.75 20.5 19 19.25 22.5 20.25C26 21.25 28.75 24 29.75 27.5C30.75 31 28.75 34.25 25.75 36.25C22.75 38.25 18.75 37.25 15.75 34.25"
                            stroke="#4F46E5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <span class="app-name">MANAGEMENT</span>
                <span class="app-badge">PRO</span>
            </div>
        </div>

        <div class="sidebar-content">
            <nav class="sidebar-nav">
                <div class="menu-section">
                    <span class="section-title">MAIN MENU</span>
                    <div class="menu-item" :class="{ 'active': isMenuOpen }">
                        <div class="menu-item-header" @click="toggleMenu">
                            <span class="menu-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </span>
                            <span class="menu-title">{{ title }}</span>
                            <span class="menu-badge">
                                <template v-if="isLoading">Cargando...</template>
                                <template v-else-if="error">{{ error }}</template>
                                <template v-else>{{ userCount }}</template>
                            </span>
                            <span class="menu-arrow" :class="{ 'rotate-180': !isMenuOpen }">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </div>

                        <transition name="slide-fade">
                            <ul class="sub-menu" v-show="isMenuOpen">
                                <li v-for="item in subMenuItems" :key="item" @click="activeSubItem = item"
                                    :class="{ 'sub-item-active': activeSubItem === item }">
                                    <span class="sub-item-icon">
                                        <svg v-if="item === 'List'" xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="8" y1="6" x2="21" y2="6"></line>
                                            <line x1="8" y1="12" x2="21" y2="12"></line>
                                            <line x1="8" y1="18" x2="21" y2="18"></line>
                                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path
                                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                            </path>
                                        </svg>
                                    </span>
                                    {{ item }}
                                    <span v-if="item === 'List'" class="new-badge">New</span>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </nav>
        </div>

        <div class="sidebar-footer">
            <div class="user-profile">
                <div class="avatar">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar">
                </div>
                <div class="user-info">
                    <span class="username">Admin User</span>
                    <span class="user-email">admin@example.com</span>
                </div>
                <div class="user-actions">
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </button>
                    <button class="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>
