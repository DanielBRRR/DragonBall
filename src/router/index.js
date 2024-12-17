import { createRouter, createWebHistory } from 'vue-router';

// Importa los componentes correspondientes a las rutas
import Home from '../pages/Home.vue';
import Personajes from '../pages/Personajes.vue';
import DetallePersonajes from '../pages/DetallePersonajes.vue';
import Planetas from '../pages/Planetas.vue';
import DetallePlaneta from '../pages/DetallePlaneta.vue';
import Femenino from '../pages/Femenino.vue';
import Masculino from '../pages/Masculino.vue';
import Raza from '../pages/Raza.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/personajes', name: 'personajes', component: Personajes },
    { path: '/character/:id', name: 'detalle', component: DetallePersonajes },
    { path: '/Planetas', name: 'Planetas', component: Planetas },
    { path: '/planeta/:id',name: 'detallePlaneta',component: DetallePlaneta,},
    { path: '/Femenino',name: 'Femenino',component: Femenino,},
    {path: '/Masculino', name: 'Masculino',component: Masculino,},
    {path: '/Raza', name: 'Raza',component: Raza,},
  ],
});


export default router;
