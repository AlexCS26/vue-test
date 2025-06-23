<script setup>
import { ref } from 'vue';
import HomeView from './views/HomeView.vue';
import Sidebar from './shared/SideBar.vue';

const currentView = ref('list');

const handleNavigate = (view) => {
  currentView.value = view;
  if (view === 'create') {
    console.log('Navigating to "Add New User". Please click the "Agregar Usuario" button.');
    currentView.value = 'list';
  }
};
</script>

<template>
  <div class="app-container">
    <Sidebar :currentView="currentView" @navigate="handleNavigate" />

    <main class="main-content">
      <div class="content-wrapper">
        <HomeView v-if="currentView === 'list'" />
      </div>
    </main>
  </div>
</template>

<style>
/* The global CSS variables and base resets are now in `src/assets/main.css`,
    which is imported once in `main.js`. 
    You no longer need the `:root` block or the `html, body, #app` reset styles here,
    unless you want to override them specifically for this component (which is unlikely for root styles).
*/

/* Layout principal */
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  /* Altura fija */
  min-height: 100vh;
  /* Respaldo */
}

/* Contenido principal que puede tener scroll horizontal */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  /* Prevent main-content from vertical scrolling itself */
  overflow-x: auto;
  /* Enable horizontal scrolling for this container */
}

.content-wrapper {
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.table-responsive {
  flex: 1;
}
</style>