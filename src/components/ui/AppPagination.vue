<script setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['goToPage', 'nextPage', 'prevPage']);

const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 5; // Número máximo de botones de página visibles directamente
    
    // Calcular el rango de páginas a mostrar alrededor de la página actual
    let startPage = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(props.totalPages, startPage + maxVisible - 1);

    // Ajustar el rango si nos acercamos al final para asegurar 'maxVisible'
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
            pages.push('...');
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < props.totalPages) {
        if (endPage < props.totalPages - 1) {
            pages.push('...');
        }
        pages.push(props.totalPages);
    }
    return pages;
});

const goToPage = (page) => {
    if (typeof page === 'number' && page !== props.currentPage) { // Asegura que solo se navegue si es un número de página diferente
        emit('goToPage', page);
    }
};

const nextPage = () => {
    emit('nextPage');
};

const prevPage = () => {
    emit('prevPage');
};
</script>

<template>
    <div v-if="totalPages > 1" class="pagination">
        <div class="pagination__info">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage *
                itemsPerPage, totalItems) }}
            de {{ totalItems }} entradas
        </div>

        <div class="pagination__controls">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="button button--pagination button--prev"
                aria-label="Página anterior">
                <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Anterior
            </button>

            <div class="pagination__numbers">
                <button v-for="(page, index) in visiblePages" :key="index" @click="goToPage(page)"
                    :class="{ 
                        'button': true, 
                        'button--pagination': true, 
                        'button--active': page === currentPage,
                        'button--ellipsis': typeof page !== 'number'
                    }"
                    :disabled="typeof page !== 'number'"
                    :aria-label="typeof page === 'number' ? `Ir a la página ${page}` : 'Páginas intermedias'"
                >
                    {{ page }}
                </button>
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="button button--pagination button--next"
                aria-label="Página siguiente">
                Siguiente
                <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Las variables CSS se asumen que están definidas globalmente vía @import './base.css'; */

/* Pagination Container */
.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg) var(--space-xl); /* Usando variables de espaciado */
    background-color: var(--color-dark-light);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    margin-top: auto;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: var(--space-md); /* Usando variable de espaciado */
    box-shadow: var(--shadow);
    color: var(--color-text);
}

.pagination__info {
    color: var(--color-text-medium);
    font-size: var(--font-size-sm); /* Usando variable de tamaño de fuente */
    flex-shrink: 0;
}

.pagination__controls {
    display: flex;
    align-items: center;
    gap: var(--space-md); /* Usando variable de espaciado */
}

.pagination__numbers {
    display: flex;
    gap: var(--space-xs); /* Usando variable de espaciado */
}

/* Button Base Styles (general, no específicos de paginación) */
/* Idealmente, estos estilos deberían venir de un componente AppButton compartido o de base.css */
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs); /* Usando variable de espaciado */
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--space-sm) var(--space-lg); /* Usando variables de espaciado */
    font-weight: var(--font-weight-medium); /* Usando variable de peso de fuente */
    cursor: pointer;
    transition: all var(--transition-ease); /* Usando variable de transición */
    white-space: nowrap;
    font-size: var(--font-size-sm); /* Usando variable de tamaño de fuente */
    line-height: 1;
}

.button__icon {
    stroke-width: 2;
    transition: all var(--transition-fast); /* Usando variable de transición rápida */
}

/* Pagination Buttons */
.button--pagination {
    background-color: transparent;
    color: var(--color-text-medium);
    border: 1px solid var(--color-border);
    padding: var(--space-xs) var(--space-md); /* Usando variables de espaciado */
    font-size: var(--font-size-xs); /* Usando variable de tamaño de fuente */
    font-weight: var(--font-weight-medium);
    min-width: 40px;
    height: 40px;
    border-radius: var(--radius-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.button--pagination:hover:not(:disabled) {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md); /* Usando variable de sombra */
}

.button--pagination:disabled {
    opacity: 0.6; /* Ligeramente más opaco para deshabilitado */
    cursor: not-allowed;
    background-color: var(--color-dark);
    border-color: var(--color-border);
    color: var(--color-text-light);
    box-shadow: none;
    transform: none;
}

.button--pagination:disabled .button__icon {
    color: var(--color-text-light);
}

.button--active {
    background-color: var(--color-primary);
    color: var(--color-text); /* Blanco de la paleta de texto */
    border-color: var(--color-primary);
    font-weight: var(--font-weight-semibold); /* Usando variable de peso de fuente */
    box-shadow: var(--shadow-md); /* Usando variable de sombra */
    transform: translateY(-1px);
}

.button--active:hover {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
}

.button--prev .button__icon {
    margin-right: var(--space-xxs); /* Usando variable de espaciado */
}

.button--next .button__icon {
    margin-left: var(--space-xxs); /* Usando variable de espaciado */
}

.button--ellipsis {
    cursor: default;
    background-color: transparent;
    border: none;
    pointer-events: none;
    color: var(--color-text-light);
    font-weight: var(--font-weight-normal); /* Usando variable de peso de fuente */
    padding: 0 var(--space-xxs); /* Usando variable de espaciado */
    min-width: unset;
    height: auto;
}

/* Responsive styles for pagination */
@media (max-width: 768px) {
    .pagination {
        flex-direction: column;
        gap: var(--space-lg); /* Usando variable de espaciado */
        align-items: center;
        padding: var(--space-md); /* Usando variable de espaciado */
    }

    .pagination__controls {
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .pagination__numbers {
        flex-grow: 1;
        justify-content: center;
    }

    .pagination__info {
        text-align: center;
        width: 100%;
    }
}

@media (max-width: 480px) {
    .pagination__numbers {
        gap: var(--space-xxs); /* Usando variable de espaciado */
    }

    .button--pagination {
        padding: var(--space-xs) var(--space-sm); /* Usando variables de espaciado */
        font-size: var(--font-size-xxs); /* Usando variable de tamaño de fuente */
        min-width: 35px;
        height: 35px;
    }
}
</style>