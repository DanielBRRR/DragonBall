<template>
  <div class="planet-details">
    <div class="planet-header">
      <h1>{{ planet.name }}</h1>
    </div>

    <div class="planet-content">
      <img 
        :src="planet.image || 'https://via.placeholder.com/300'" 
        alt="Imagen del planeta" 
        class="planet-image"
      />
      <div class="planet-info">
        <p><strong>Nombre:</strong> {{ planet.name }}</p>
        <p><strong>Descripción:</strong> {{ planet.description || 'No disponible' }}</p>
        <p><strong>Ha sido destruido:</strong> {{ planet.isDestroyed ? 'Sí' : 'No' }}</p>
      </div>
    </div>

    <div v-if="planet.characters?.length" class="planet-characters">
      <h2>Personajes del Planeta</h2>
      <div class="character-grid">
        <div 
          v-for="character in planet.characters" 
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
            <p class="character-name">{{ character.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-link to="/planetas" class="back-button">Volver a la lista</router-link>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const planetId = route.params.id;

const planet = ref({});

const fetchPlanetDetails = async () => {
  try {
    const response = await fetch(`https://dragonball-api.com/api/planets/${planetId}`);
    const data = await response.json();
    planet.value = data;
  } catch (error) {
    console.error('Error al obtener los detalles del planeta:', error);
  }
};

onMounted(() => {
  fetchPlanetDetails();
});
</script>
