import { API_CONFIG } from "../config/BaseUrl.js";

const LOCAL_STORAGE_KEY = "users_data";
let localUsers = [];

/**
 * Guarda la lista de usuarios en el almacenamiento local del navegador.
 */
const saveUsersToLocalStorage = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUsers));
  } catch (e) {
    console.error("Error al guardar usuarios localmente:", e);
  }
};

/**
 * Carga los usuarios desde el almacenamiento local del navegador.
 * @returns {boolean} True si se cargaron usuarios, false en caso contrario.
 */
const loadUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedUsers) {
    try {
      localUsers = JSON.parse(storedUsers);
      console.log("Usuarios cargados desde el almacenamiento local.");
      return localUsers.length > 0;
    } catch (e) {
      console.error(
        "Error al parsear usuarios desde el almacenamiento local:",
        e
      );
      localUsers = [];
      return false;
    }
  }
  return false;
};

export const UserService = {
  /**
   * Inicializa la lista de usuarios, cargándolos desde el almacenamiento local
   * o desde la API si no están disponibles localmente.
   * @returns {Promise<boolean>} True si los usuarios se inicializaron correctamente, false si hubo un error.
   */
  async initializeUsers() {
    if (loadUsersFromLocalStorage()) {
      return true;
    }

    console.log("Cargando usuarios desde la API.");
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users`, {
        method: "GET",
        headers: API_CONFIG.HEADERS,
        signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener usuarios: ${response.status}`);
      }

      localUsers = await response.json();
      saveUsersToLocalStorage();
      console.log("Usuarios cargados desde la API y guardados localmente.");
      return true;
    } catch (error) {
      console.error("Error al cargar usuarios desde la API:", error);
      localUsers = [];
      return false;
    }
  },

  /**
   * Obtiene la lista actual de usuarios.
   * @returns {Array} Una copia de la lista de usuarios.
   */
  getUsers() {
    return [...localUsers];
  },

  /**
   * Añade un nuevo usuario a la lista local con un ID generado automáticamente.
   * @param {Object} userData - Los datos del nuevo usuario (sin ID).
   * @returns {Object} El usuario recién creado, incluyendo su ID.
   */
  addUser(userData) {
    const newId =
      localUsers.length > 0 ? Math.max(...localUsers.map((u) => u.id)) + 1 : 1;

    // Asegura que el newId sobrescriba cualquier ID existente en userData
    const newUser = { ...userData, id: newId };
    localUsers.push(newUser);
    saveUsersToLocalStorage();
    console.log(
      `Nuevo usuario "${newUser.name}" añadido con ID: ${newUser.id}.`
    );
    return newUser;
  },

  /**
   * Actualiza los datos de un usuario existente en la lista local.
   * @param {Object} userData - Los datos actualizados del usuario (debe incluir el ID).
   * @returns {boolean} True si el usuario fue actualizado, false si no se encontró.
   */
  updateUser(userData) {
    const index = localUsers.findIndex((u) => u.id === userData.id);
    if (index === -1) {
      console.warn(
        `No se encontró al usuario con ID ${userData.id} para actualizar.`
      );
      return false;
    }

    localUsers[index] = { ...localUsers[index], ...userData };
    saveUsersToLocalStorage();
    console.log(`Usuario con ID ${userData.id} actualizado.`);
    return true;
  },

  /**
   * Elimina un usuario de la lista local.
   * @param {number} userId - El ID del usuario a eliminar.
   * @returns {boolean} True si el usuario fue eliminado, false si no se encontró.
   */
  deleteUser(userId) {
    const initialLength = localUsers.length;
    localUsers = localUsers.filter((user) => user.id !== userId);

    if (localUsers.length !== initialLength) {
      saveUsersToLocalStorage();
      console.log(`Usuario con ID ${userId} eliminado.`);
      return true;
    }
    console.warn(`No se encontró al usuario con ID ${userId} para eliminar.`);
    return false;
  },
};
