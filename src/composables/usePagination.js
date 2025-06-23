// composables/usePagination.js
import { ref, computed } from "vue";

/**
 * Composable para manejar la lógica de paginación.
 *
 * @param {Ref<Array>} itemsToPaginate - Una referencia reactiva (ref) al array de elementos que deseas paginar.
 * @param {number} initialItemsPerPage - El número inicial de elementos por página.
 * @returns {{
 * currentPage: Ref<number>,
 * itemsPerPage: Ref<number>,
 * totalPages: ComputedRef<number>,
 * paginatedItems: ComputedRef<Array>,
 * goToPage: (page: number) => void,
 * nextPage: () => void,
 * prevPage: () => void,
 * resetPagination: () => void
 * }}
 */
export function usePagination(itemsToPaginate, initialItemsPerPage = 5) {
  const currentPage = ref(1);
  const itemsPerPage = ref(initialItemsPerPage);

  // Propiedad calculada para el total de páginas, basada en los elementos a paginar
  const totalPages = computed(() => {
    return Math.ceil(itemsToPaginate.value.length / itemsPerPage.value);
  });

  // Propiedad calculada para los elementos de la página actual
  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return itemsToPaginate.value.slice(startIndex, endIndex);
  });

  // Método para ir a una página específica
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  // Método para ir a la página siguiente
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  // Método para ir a la página anterior
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  // Método para resetear la paginación a la primera página
  const resetPagination = () => {
    currentPage.value = 1;
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
  };
}
