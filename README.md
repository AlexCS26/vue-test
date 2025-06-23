
# 🧑‍💼 Vue User Dashboard

Panel de administración de usuarios moderno, responsive y rápido. Construido con **Vue 3** y un sistema de componentes limpios, este proyecto es ideal como base para un dashboard completo o como prueba técnica frontend.

> Minimalista por fuera, modular por dentro.

---

## 🚀 Stack tecnológico

- ⚙️ **Vue 3** con Composition API y `<script setup>`
- ⚡ **Vite** como bundler para desarrollo rápido
- 🎨 **Tailwind CSS** con variables personalizadas para un dark theme elegante
- 🧩 Componentes modulares y reutilizables
- 💾 Preparado para integración futura con API real

---

## ⚙️ ¿Cómo funciona?

El proyecto está pensado como un sistema de gestión de usuarios, con funcionalidades listas para escalar:

### 📁 Estructura general:

```
client/
├── assets/           # Variables CSS y estilos base
├── components/
│   ├── SearchBar.vue       # Barra de búsqueda con emit para filtrar usuarios
│   ├── UserTable.vue       # Tabla con acciones (editar, eliminar, ver)
│   └── ActionButton.vue    # Botones con íconos (reutilizables)
├── views/
│   ├── UserList.vue        # Vista principal con tabla y búsqueda
│   ├── UserForm.vue        # Vista para crear o editar usuario
│   └── UserProfile.vue     # Vista individual (opcional)
├── App.vue
├── main.js
└── vite.config.js
```

### 🧩 Flujo del dashboard:

- La **tabla de usuarios** recibe datos vía `props` y muestra acciones (`ver`, `editar`, `eliminar`) por cada usuario.
- La **barra de búsqueda** emite texto para filtrar dinámicamente.
- Los botones y componentes están desacoplados y utilizan `emits` para comunicarse con el componente padre.
- Todos los estilos están controlados por variables CSS para una personalización rápida del tema.

---

## 🛠️ Instalación y uso

```bash
# Clona el repositorio
git clone https://github.com/AlexCS26/vue-test.git

# Entra al proyecto
cd vue-test/client

# Instala dependencias
npm install

# Corre el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la app.

---

## ✅ Funcionalidades actuales

- Vista de usuarios en tabla responsive
- Filtro de usuarios por texto en tiempo real
- Botón “Nuevo Usuario” destacado
- Interacciones suaves con animaciones sutiles
- Estilos consistentes en tema oscuro moderno

---

## 🧠 Ideas para extender

- Conectar a una API real (Node.js, Laravel, Firebase, etc.)
- Agregar Vue Router para navegación entre vistas
- Autenticación y control de roles
- Modo claro/oscuro dinámico
- Uso de Pinia o Vuex para estado global

---

## 👨‍💻 Autor

**Alexis Casazola**  
📬 [@AlexCS26](https://github.com/AlexCS26)

Proyecto hecho con enfoque en buenas prácticas de frontend, diseño moderno y estructura escalable.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Libre para usar, modificar y adaptar.
