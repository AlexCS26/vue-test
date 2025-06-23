// src/composables/useUserSearch.js
import { ref, computed } from "vue";

/**
 * Un composable para manejar la lógica de búsqueda y filtrado de usuarios.
 * @param {Ref<Array>} allUsersRef - Una referencia (ref) al array completo de usuarios.
 * @returns {{searchQuery: Ref<string>, filteredUsers: ComputedRef<Array>}} Un objeto con la cadena de búsqueda y la lista de usuarios filtrados.
 */
export function useUserSearch(allUsersRef) {
  // La variable que guarda lo que el usuario escribe en la barra de búsqueda.
  const searchQuery = ref("");

  // Una propiedad 'computed' que se recalcula automáticamente cuando cambia
  // la búsqueda o la lista original de usuarios.
  const filteredUsers = computed(() => {
    // Si la caja de búsqueda está vacía, mostramos todos los usuarios.
    if (!searchQuery.value) {
      return allUsersRef.value;
    }

    // Convertimos la búsqueda a minúsculas para que no importe si es mayúscula o minúscula.
    const query = searchQuery.value.toLowerCase();

    // Filtramos los usuarios. Un usuario coincide si su nombre, email, nombre de usuario,
    // o la ciudad en su dirección incluye lo que estamos buscando.
    return allUsersRef.value.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        // ¡Ojo! Aseguramos que 'address' y 'city' existan antes de intentar leerlos.
        (user.address?.city?.toLowerCase().includes(query) ?? false)
    );
  });

  // Devolvemos las dos piezas que serán útiles en el componente principal.
  return {
    searchQuery,
    filteredUsers,
  };
}
