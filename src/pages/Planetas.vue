<template>
  <div class="container">
    <h1 class="title">{{ ('planetas') }}</h1>

    <!-- Listado de planetas -->
    <div class="planet-grid">
      <div
        v-for="planet in filteredPlanets"
        :key="planet.id"
        class="planet-card"
      >
        <router-link 
          :to="{ name: 'detallePlaneta', params: { id: planet.id } }"
          class="card-link"
        >
          <h2 class="planet-name">{{ planet.name }}</h2>
          <img
            :src="planet.image || 'https://via.placeholder.com/150'"
            alt="Imagen del planeta"
            class="planet-image"
            style="width: 50%;"
          />
        </router-link>
      </div>
    </div>

    <!-- Botones de navegación -->
    <div class="pagination">
      <button 
        :disabled="!previousPage"
        @click="loadPreviousPage"
        class="btn"
      >
        {{ $t('Pagina Anterior') }}
      </button>
      <button 
        :disabled="!nextPage"
        @click="loadNextPage"
        class="btn"
      >
        {{ $t('Pagina Siguiente') }}
      </button>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Variables de estado
  const PlanetsList = ref([]);
  const nextPage = ref(null); 
  const previousPage = ref(null);
  
  // URL inicial
  const initialUrl = 'https://dragonball-api.com/api/planets?page=1&limit=10';
  
  // Función para cargar los planetas
  const loadPlanets = (url) => {
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        PlanetsList.value = data.items;
        nextPage.value = data.links.next || null;
        previousPage.value = data.links.previous || null;
      });
  };
  
  // Cargar los planetas iniciales
  loadPlanets(initialUrl);
  
  // Función para cargar la siguiente página
  const loadNextPage = () => {
    if (nextPage.value) {
      loadPlanets(nextPage.value);
    }
  };
  
  // Función para cargar la página anterior
  const loadPreviousPage = () => {
    if (previousPage.value) {
      loadPlanets(previousPage.value);
    }
  };
  
  // Computada para los planetas filtrados (si necesitas aplicar algún filtro adicional)
  const filteredPlanets = computed(() => {
    return PlanetsList.value;
  });
  </script>
  