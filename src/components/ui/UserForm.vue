<script setup>
import '../../styles/userform.css';
import { ref, watch, computed } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: null // Será nulo para un nuevo usuario, o un objeto para editar
    }
});

const emit = defineEmits(['submit', 'cancel']);

// Campos del formulario reactivos
const id = ref(null);
const name = ref('');
const username = ref('');
const email = ref('');
const phone = ref('');

// Estado de validación
const emailError = ref('');

// Propiedad computada para el título del formulario (Nuevo/Editar Usuario)
const formTitle = computed(() => {
    return props.user ? 'Editar Usuario' : 'Nuevo Usuario';
});

// Observa cambios en la prop 'user' para rellenar el formulario cuando se edita
watch(() => props.user, (newUser) => {
    if (newUser) {
        id.value = newUser.id;
        name.value = newUser.name;
        username.value = newUser.username;
        email.value = newUser.email;
        phone.value = newUser.phone;
    } else {
        // Reinicia el formulario para un nuevo usuario
        id.value = null;
        name.value = '';
        username.value = '';
        email.value = '';
        phone.value = '';
    }
    emailError.value = ''; // Limpia errores al cambiar de usuario
}, { immediate: true }); // Ejecuta inmediatamente al montar el componente para el caso inicial

// Validación del correo electrónico
const validateEmail = () => {
    if (!email.value) {
        emailError.value = 'El correo electrónico es requerido.';
        return false;
    }
    // Expresión regular básica para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.value = 'Formato de correo electrónico inválido.';
        return false;
    }
    emailError.value = '';
    return true;
};

// Maneja el envío del formulario
const handleSubmit = () => {
    if (!validateEmail()) { // Valida el email antes de enviar
        return;
    }

    const userData = {
        id: id.value, // 'id' será nulo para nuevos usuarios, se manejará en la lógica principal
        name: name.value,
        username: username.value,
        email: email.value,
        phone: phone.value
    };

    emit('submit', userData); // Emite el evento 'submit' con los datos
};

const handleCancel = () => {
    emit('cancel'); // Emite el evento 'cancel'
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="user-form">
        <h2 class="user-form__title">{{ formTitle }}</h2>

        <div class="form-group">
            <label for="name" class="form-label">Nombre Completo</label>
            <input type="text" id="name" v-model="name" class="form-input" required>
        </div>

        <div class="form-group">
            <label for="username" class="form-label">Nombre de Usuario</label>
            <input type="text" id="username" v-model="username" class="form-input" required>
        </div>

        <div class="form-group">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" class="form-input" :class="{ 'has-error': emailError }"
                @input="validateEmail" required>
            <p v-if="emailError" class="form-error">{{ emailError }}</p>
        </div>

        <div class="form-group">
            <label for="phone" class="form-label">Teléfono</label>
            <input type="tel" id="phone" v-model="phone" class="form-input">
        </div>

        <div class="form-actions">
            <button type="button" @click="handleCancel" class="button button--secondary">Cancelar</button>
            <button type="submit" class="button button--primary">Guardar Usuario</button>
        </div>
    </form>
</template>
