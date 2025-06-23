<template>
    <button @click="$emit('click')" class="button button--primary">
      <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Nuevo Usuario
    </button>
  </template>
  
  <script setup>
  // Este componente es puramente presentacional y solo emite un evento 'click'
  // cuando se hace clic en el botón.
  </script>
  <style scoped>
  .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      border: none;
      border-radius: var(--radius-sm);
      padding: var(--space-sm) var(--space-lg);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all var(--transition-ease);
      white-space: nowrap;
      font-size: var(--font-size-sm);
  }
  
  .button--primary {
      background-color: var(--color-primary);
      color: var(--color-text);
      box-shadow: var(--shadow);
  }
  
  .button--primary:hover {
      background-color: var(--color-primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-hover);
  }
  
  .button__icon {
      stroke-width: 2;
  }
  
  /* Estilos responsivos que afectan directamente a este botón, extraídos del componente padre */
  @media (max-width: 768px) {
      .button--primary {
          width: 100%;
          justify-content: center;
      }
  }
  </style>