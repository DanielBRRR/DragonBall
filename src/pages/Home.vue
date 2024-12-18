<template>
  <div class="inicio-container">
    <!-- Encabezado con menú de navegación -->
    <header class="header">
      <h1 class="title animate-title">{{ $t('inicio.welcomeTitle') }}</h1>
      <p class="subtitle">{{ $t('inicio.subtitle') }}</p>
    </header>

    <!-- Imagen de fondo y mensaje -->
    <div class="intro-section">
      <div class="video-wrapper">
        <video controls autoplay muted loop>
          <source
            src="../components/img/Dragon Ball Super Opening 2 en ESPAÑOL LATINO [Oficial] Full HD ((stereo)) Pascual Reyes, GTXS..mp4"
            type="video/mp4" />
        </video>
      </div>
      <p class="description">{{ $t('inicio.introDescription') }}</p>
    </div>

    <!-- Botón para comenzar -->
    <div class="cta-container">
      <router-link to="/Personajes">
        <button class="cta-btn">{{ $t('inicio.ctaButton') }}</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Lógica adicional si es necesario
</script>

<style>
@import '../styles/home.scss';
</style>
