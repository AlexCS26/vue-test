<script setup>
import '../styles/admin.css';
import { ref, onMounted, watch } from 'vue';
import AppModal from '../shared/AppModal.vue';
import AppLoader from '../shared/AppLoader.vue';
import UserForm from '../components/ui/UserForm.vue';
import UserTable from '../components/ui/UserTable.vue';
import AppPagination from '../components/ui/AppPagination.vue';
import AppSearch from '../components/ui/AppSearch.vue';
import AppNewUserButton from '../components/ui/AppNewUserButton.vue';
import { UserService } from '../services/client/useUsers.js';
import { useUserSearch } from '../composables/useUserSearch.js';
import { usePagination } from '../composables/usePagination.js';

const users = ref([]);
const loading = ref(false);
const isSearching = ref(false);
const error = ref(null);
const showModal = ref(false);
const selectedUser = ref(null);
const { searchQuery, filteredUsers } = useUserSearch(users);
const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination
} = usePagination(filteredUsers);

// Resetea la paginación cuando los usuarios filtrados cambian
watch(filteredUsers, () => {
    resetPagination();
});

// Muestra el loader de búsqueda cuando el query cambia
watch(searchQuery, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        isSearching.value = true;
        setTimeout(() => {
            isSearching.value = false;
        }, 200);
    }
});

const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
        await UserService.initializeUsers();
        users.value = UserService.getUsers();
    } catch (err) {
        error.value = 'Error al cargar usuarios';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const handleAddUser = () => {
    selectedUser.value = null;
    showModal.value = true;
};

const handleEditUser = (user) => {
    selectedUser.value = { ...user };
    showModal.value = true;
};

const handleSubmit = async (userData) => {
    loading.value = true;
    try {
        error.value = null;
        // Determina si es una adición o edición basada en selectedUser
        const finalUserData = selectedUser.value && selectedUser.value.id
            ? { ...userData, id: selectedUser.value.id }
            : userData;

        if (finalUserData.id) {
            UserService.updateUser(finalUserData);
        } else {
            UserService.addUser(finalUserData);
        }
        users.value = UserService.getUsers();
        showModal.value = false;
        selectedUser.value = null;
    } catch (err) {
        error.value = 'Error al guardar usuario';
        console.error('Error saving user:', err);
    } finally {
        loading.value = false;
    }
};

const handleDelete = async (userId) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        loading.value = true;
        try {
            UserService.deleteUser(userId);
            users.value = UserService.getUsers();
            // Ajusta la página actual si la última página queda vacía
            if (paginatedItems.value.length === 0 && currentPage.value > 1) {
                prevPage();
            }
        } catch (err) {
            error.value = 'Error al eliminar usuario';
            console.error(err);
        } finally {
            loading.value = false;
        }
    }
};

onMounted(() => {
    loadUsers();
});
</script>

<template>
    <div class="admin">
        <div class="admin__header">
            <h1 class="admin__title">
                <svg class="admin__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Administración de Usuarios
            </h1>

            <div class="admin__actions">
                <AppSearch v-model="searchQuery" placeholder="Buscar usuarios..." @input="resetPagination" />
                
                <AppNewUserButton @click="handleAddUser" />
            </div>
        </div>

        <div class="admin__content">
            <AppLoader v-if="loading || isSearching" />

            <template v-if="!loading && !isSearching">
                <div v-if="error" class="alert alert--error">
                    <svg class="alert__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {{ error }}
                </div>

                <div v-if="filteredUsers.length === 0 && !loading && !isSearching" class="empty-state">
                    <svg class="empty-state__icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 class="empty-state__title">No se encontraron usuarios</h3>
                    <p class="empty-state__message" v-if="searchQuery">No hay resultados para "{{ searchQuery }}"</p>
                    <p class="empty-state__message" v-else>No hay usuarios registrados todavía</p>
                    <AppNewUserButton @click="handleAddUser" />
                </div>

                <template v-else>
                    <UserTable :users="paginatedItems" @edit="handleEditUser" @delete="handleDelete"
                        @view="user => selectedUser = user" />

                    <AppPagination
                        :current-page="currentPage"
                        :items-per-page="itemsPerPage"
                        :total-pages="totalPages"
                        :total-items="filteredUsers.length"
                        @go-to-page="goToPage"
                        @next-page="nextPage"
                        @prev-page="prevPage"
                    />
                </template>
            </template>

            <AppModal :show="showModal" @close="showModal = false">
                <UserForm :user="selectedUser" @submit="handleSubmit" @cancel="showModal = false" />
            </AppModal>
        </div>
    </div>
</template>