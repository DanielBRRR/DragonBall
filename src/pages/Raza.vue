<template>
  <div class="container">
    <h1 class="title">Personajes por Raza</h1>

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar personaje por nombre..."
        class="search-input"
      />
    </div>

    <!-- Raza de los personajes -->
    <div v-for="(characters, race) in filteredCharactersByRace" :key="race" class="race-section">
      <h2 class="race-title">{{ race }}</h2>

      <!-- Listado de personajes de esa raza -->
      <div class="character-grid">
        <div v-for="character in characters" :key="character.id" class="character-card">
          <router-link :to="{ name: 'detalle', params: { id: character.id } }" class="card-link">
            <img :src="character.image || 'https://via.placeholder.com/150'" alt="Imagen del personaje"
              class="character-image" />
            <h3 class="character-name">{{ character.name }}</h3>
            <p class="character-details">
              <strong>Ki:</strong> {{ character.ki }}
            </p>
            <p class="character-details">
              <strong>Descripción:</strong> {{ character.description.substring(0, 100) }}...
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Estado para almacenar los personajes agrupados por raza
const charactersByRace = ref({});
// Estado para almacenar la consulta de búsqueda
const searchQuery = ref('');

// Función para cargar los personajes y agruparlos por raza
const loadCharactersByRace = async () => {
  let page = 1;
  let allCharacters = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.items && data.items.length > 0) {
        allCharacters = [...allCharacters, ...data.items];
        page++;

        if (data.items.length < 10) {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error('Error cargando personajes:', error);
      hasMore = false;
    }
  }

  // Agrupar personajes por raza
  const groupedByRace = allCharacters.reduce((acc, character) => {
    const race = character.race || 'Desconocida';
    if (!acc[race]) {
      acc[race] = [];
    }
    acc[race].push(character);
    return acc;
  }, {});

  charactersByRace.value = groupedByRace;
};

// Computed para filtrar los personajes según la búsqueda
const filteredCharactersByRace = computed(() => {
  if (!searchQuery.value.trim()) {
    return charactersByRace.value;
  }

  const lowerSearchQuery = searchQuery.value.toLowerCase();

  // Filtrar personajes de cada raza
  const filtered = Object.keys(charactersByRace.value).reduce((acc, race) => {
    const filteredCharacters = charactersByRace.value[race].filter((character) =>
      character.name.toLowerCase().includes(lowerSearchQuery)
    );

    if (filteredCharacters.length > 0) {
      acc[race] = filteredCharacters;
    }

    return acc;
  }, {});

  return filtered;
});

// Cargar personajes al montar el componente
onMounted(() => {
  loadCharactersByRace();
});
</script>