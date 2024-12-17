<template>
    <div class="container-masculino">
      <h1 class="title">Personajes Masculinos de Dragon Ball</h1>
      <div class="container-masculino">
      <!-- Buscador -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Introduzca el nombre del personaje masculino..."
          class="search-input"
          @input="filterCharacters"
        />
      </div>
  
      <!-- Listado de personajes -->
      <div class="character-grid">
        <div
          v-for="character in filteredCharacters"
          :key="character.id"
          class="character-card"
        >
          <router-link 
            :to="{ name: 'detalle', params: { id: character.id } }"
            class="card-link"
          >
            <img
              :src="character.image || 'https://via.placeholder.com/150'"
              alt="Imagen del personaje"
              class="character-image"
            />
            <h2 class="character-name">{{ character.name }}</h2>
  
            <!-- Especie -->
            <p class="character-details">
              <strong>Especie:</strong>
              <span>{{ character.race || 'No disponible' }}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
      <!-- Botones de navegación -->
      <div v-if="!searchQuery" class="pagination">
        <button 
          :disabled="currentPage === 1"
          @click="loadPreviousPage"
          class="boton"
        >
          Página anterior
        </button>
        <button 
          :disabled="isLastPage"
          @click="loadNextPage"
          class="boton"
        >
          Página siguiente
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
        const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=50`);
        const data = await response.json();
  
        if (data.items && data.items.length > 0) {
          allCharacters = [...allCharacters, ...data.items];
          page++;
  
          // Si la cantidad de elementos en la respuesta es menor al límite, es la última página
          if (data.items.length < 50) {
            hasMore = false;
            isLastPage.value = true; // Actualiza el estado cuando se alcanza la última página
          }
        } else {
          hasMore = false;
          isLastPage.value = true; // Si no hay más personajes, también es la última página
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
  
  // Función para filtrar personajes masculinos
  const filterCharacters = () => {
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      filteredCharacters.value = PersonajesList.value.filter((character) =>
        character.name.toLowerCase().includes(query) && character.gender === 'Male' // Filtra solo personajes masculinos
      );
    } else {
      const maleCharacters = PersonajesList.value.filter(character => character.gender === 'Male');
      const startIndex = (currentPage.value - 1) * 10;
      const endIndex = currentPage.value * 10;
      filteredCharacters.value = maleCharacters.slice(startIndex, endIndex);
  
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
  
  