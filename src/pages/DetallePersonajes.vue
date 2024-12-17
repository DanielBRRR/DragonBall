<template>
  <div class="container">
    <h1 class="title" v-if="character">{{ character.name }}</h1>

    <div v-if="character">
      <div class="character-detail">
        <!-- Imagen del personaje -->
        <img :src="character.image" alt="Imagen del personaje" class="character-image-detail" />

        <!-- Detalles -->
        <p><strong>{{ $t('character.ki') }}:</strong> {{ character.ki }}</p>
        <p><strong>{{ $t('character.maxKi') }}:</strong> {{ character.maxKi }}</p>
        <p><strong>{{ $t('character.race') }}:</strong> {{ translateField(character.race) }}</p>
        <p><strong>{{ $t('character.gender') }}:</strong> {{ translateField(character.gender) }}</p>
        <p><strong>{{ $t('character.description') }}:</strong> {{ character.description }}</p>
        <p><strong>{{ $t('character.affiliation') }}:</strong> {{ character.affiliation }}</p>
        <p>
          <strong>{{ $t('character.originPlanet') }}:</strong>
          {{ character.originPlanet?.name || $t('character.unknown') }}
        </p>
        <img
          :src="character.originPlanet?.image || 'https://via.placeholder.com/150'"
          alt="Imagen del planeta"
          class="origin-planet-image"
        />
      </div>

      <!-- Transformaciones -->
      <div class="transformations">
        <h3>{{ $t('character.transformations') }}</h3>
        <Splide
          v-if="character.transformations && character.transformations.length > 0"
          :options="{
            type: 'loong', 
            perPage: 1, 
            perMove: 1, 
            pagination: false, 
            arrows: true,
            gap: '15px',
            width: '50%' }"
        >
          <SplideSlide
            v-for="(transformation, id) in character.transformations"
            :key="id"
          >
            <div class="transformation-item">
              <img :src="transformation.image" :alt="transformation.name" class="transformation-img" />
              <p>{{ transformation.name }}</p>
            </div>
          </SplideSlide>
        </Splide>
        <p v-else>{{ $t('character.noTransformations') }}</p>
      </div>
    </div>

    <div v-else>
      <p>Cargando detalles del personaje...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import '@splidejs/vue-splide/css';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

// Vue Router y traducción
const route = useRoute();
const { t } = useI18n();

// Datos del personaje
const character = ref(null);

const loadCharacterDetails = () => {
  const characterId = route.params.id;
  fetch(`https://dragonball-api.com/api/characters/${characterId}`)
    .then((response) => response.json())
    .then((data) => {
      character.value = data;
    })
    .catch((error) => {
      console.error('Error cargando los detalles del personaje:', error);
    });
};

// Función para traducir campos dinámicos
const translateField = (field) => {
  if (!field) return t('character.unknown');
  return t(`character.${field.toLowerCase()}`, field);
};

// Cargar detalles al montar
onMounted(() => {
  loadCharacterDetails();
});
</script>
