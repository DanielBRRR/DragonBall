<template>
  <div class="app">
    <!-- Menú y encabezado -->
    <main class="main-content">     
      <header>
        <h3>{{ $t('header.title') }}</h3>
        <div class="menu">
          <router-link to="/">{{ $t('header.menu.home') }}</router-link>
          <router-link class="nav-link" to="/Personajes">{{ $t('header.menu.characters') }}</router-link>
          <router-link class="nav-link" to="/Planetas">{{ $t('header.menu.planets') }}</router-link>
          <router-link class="nav-link" to="/Femenino">{{ $t('header.menu.femaleCharacters') }}</router-link>
          <router-link class="nav-link" to="/Masculino">{{ $t('header.menu.maleCharacters') }}</router-link>
          <router-link class="nav-link" to="/Raza">{{ $t('header.menu.raceCharacters') }}</router-link>
        </div>
        <!-- Selector de idioma -->
        <select v-model="selectedLanguage" @change="changeLanguage">
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="zh">中文 (Chino)</option>
          <option value="ko">한국어 (Coreano)</option>
          <option value="it">Italiano</option>
        </select>
      </header>

      <!-- Contenedor principal para el contenido renderizado por las rutas -->
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = () => {
  locale.value = selectedLanguage.value;
};
</script>

<style>
@import './styles/styles.scss';
</style>
