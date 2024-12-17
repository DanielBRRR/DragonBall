<template>
  <div class="container">
    <h1 class="title">{{ $t('personajes.title') }}</h1>
          <!-- Buscador -->
          <div class="search-bar">
        <input type="text" v-model="searchQuery" :placeholder="$t('personajes.searchPlaceholder')" class="search-input"
          @input="filterCharacters" />
      </div>
    <div class="character-section">


      <!-- Listado de personajes -->
      <div class="character-grid">
        <div v-for="character in filteredCharacters" :key="character.id" class="character-card">
          <router-link :to="{ name: 'detalle', params: { id: character.id } }" class="card-link">
            <img :src="character.image || 'https://via.placeholder.com/150'" alt="Imagen del personaje"
              class="character-image" />
            <h2 class="character-name">{{ character.name }}</h2>

            <!-- Especie -->
            <p class="character-details">
              <strong>{{ $t('personajes.species') }}:</strong>
              <span>{{ character.race || $t('personajes.noAvailable') }}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Botones de navegación -->
    <div v-if="!searchQuery" class="pagination">
      <button :disabled="currentPage === 1" @click="loadPreviousPage" class="btn">
        {{ $t('personajes.pagePrev') }}
      </button>
      <button :disabled="isLastPage" @click="loadNextPage" class="btn">
        {{ $t('personajes.pageNext') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado
const PersonajesList = ref([]); // Todos los personajes
const filteredCharacters = ref([]); // Personajes filtrados para mostrar
const currentPage = ref(1);
const isLastPage = ref(false);
const searchQuery = ref(''); // Query de búsqueda

// Función para cargar todos los personajes de todas las páginas
const loadAllCharacters = async () => {
  let page = 1;
  let allCharacters = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);
      
      // Verificación de respuesta válida
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        allCharacters = [...allCharacters, ...data.items];
        page++;

        // Si la cantidad de elementos es menor al tamaño de página esperado, es la última página
        if (data.items.length < 10) {
          hasMore = false;
          isLastPage.value = true;
        }
      } else {
        hasMore = false;
        isLastPage.value = true;
      }
    } catch (error) {
      console.error('Error cargando personajes:', error);
      hasMore = false;
      isLastPage.value = true;
    }
  }

  PersonajesList.value = allCharacters;
  filterCharacters(); // Inicializa los personajes visibles
};

// Función para filtrar personajes
const filterCharacters = () => {
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filteredCharacters.value = PersonajesList.value.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
  } else {
    const startIndex = (currentPage.value - 1) * 10;
    const endIndex = currentPage.value * 10;
    filteredCharacters.value = PersonajesList.value.slice(startIndex, endIndex);

    // Determina si es la última página
    if (filteredCharacters.value.length < 10) {
      isLastPage.value = true;
    } else {
      isLastPage.value = false;
    }
  }
};

// Cargar personajes al inicio
loadAllCharacters();

// Función para cargar la siguiente página
const loadNextPage = () => {
  if (!isLastPage.value) {
    currentPage.value++;
    filterCharacters();
  }
};

// Función para cargar la página anterior
const loadPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    filterCharacters();
  }
};
</script>