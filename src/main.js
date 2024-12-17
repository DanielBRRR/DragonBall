import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

// Traducciones
const messages = {
  en: {
    header: {
      title: 'DRAGON BALL',
      menu: {
        home: 'Home',
        characters: 'Characters',
        planets: 'Planets',
        femaleCharacters: 'Female Characters',
        maleCharacters: 'Male Characters',
        raceCharacters: 'Characters by Race', // Añadido para "Personajes por raza"
      },
    },
    inicio: {
      welcomeTitle: 'Welcome to the Dragon Ball Universe',
      subtitle: 'Explore the most iconic aspects of Dragon Ball.',
      introDescription:
        'Immerse yourself in the Dragon Ball universe and discover characters, planets, transformations, and facts from the series!',
      ctaButton: 'Start Exploring',
    },
    personajes: {
      title: 'Dragon Ball Characters',
      searchPlaceholder: 'Enter character name...',
      pagePrev: 'Previous Page',
      pageNext: 'Next Page',
      species: 'Species',
      noAvailable: 'Not available',
    },
    planets: {
      title: 'Dragon Ball Planets',
      pagePrev: 'Previous Page',
      pageNext: 'Next Page',
      description: 'Description',
      isDestroyed: 'Has been destroyed',
      yes: 'Yes',
      no: 'No',
    },
    character: {
      ki: 'Ki',
      maxKi: 'Max Ki',
      race: 'Race',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      description: 'Description',
      affiliation: 'Affiliation',
      originPlanet: 'Origin Planet',
      unknown: 'Unknown',
      transformations: 'Transformations',
      noTransformations: 'This character has no transformations.',
    },
  },
  es: {
    header: {
      title: 'DRAGON BALL',
      menu: {
        home: 'Inicio',
        characters: 'Personajes',
        planets: 'Planetas',
        femaleCharacters: 'Personajes Femeninos',
        maleCharacters: 'Personajes Masculinos',
        raceCharacters: 'Personajes por Raza', // Añadido para "Personajes por raza"
      },
    },
    inicio: {
      welcomeTitle: 'Bienvenido al Universo de Dragon Ball',
      subtitle: 'Explora lo más emblemático de Dragon Ball.',
      introDescription:
        '¡Sumérgete en el universo de Dragon Ball y descubre los personajes, planetas, transformaciones, y datos que aparecen en la serie!',
      ctaButton: 'Comenzar a explorar',
    },
    personajes: {
      title: 'Personajes de Dragon Ball',
      searchPlaceholder: 'Introduzca el nombre del personaje...',
      pagePrev: 'Página anterior',
      pageNext: 'Página siguiente',
      species: 'Especie',
      noAvailable: 'No disponible',
    },
    planets: {
      title: 'Planetas de Dragon Ball',
      pagePrev: 'Página anterior',
      pageNext: 'Página siguiente',
      description: 'Descripción',
      isDestroyed: 'Ha sido destruido',
      yes: 'Sí',
      no: 'No',
    },
    character: {
      ki: 'Ki',
      maxKi: 'Máximo Ki',
      race: 'Especie',
      gender: 'Género',
      male: 'Masculino',
      female: 'Femenino',
      description: 'Descripción',
      affiliation: 'Afiliación',
      originPlanet: 'Planeta de origen',
      unknown: 'Desconocido',
      transformations: 'Transformaciones',
      noTransformations: 'Este personaje no tiene transformaciones.',
    },
  },
  zh: {
    header: {
      title: '龙珠',
      menu: {
        home: '主页',
        characters: '角色',
        planets: '行星',
        femaleCharacters: '女性角色',
        maleCharacters: '男性角色',
        raceCharacters: '按种族分类角色', // Añadido para "Personajes por raza"
      },
    },
    inicio: {
      welcomeTitle: '欢迎来到龙珠宇宙',
      subtitle: '探索龙珠最具代表性的元素。',
      introDescription:
        '沉浸在龙珠宇宙中，发现角色、行星、变身以及系列中的事实！',
      ctaButton: '开始探索',
    },
    personajes: {
      title: '龙珠角色',
      searchPlaceholder: '输入角色名称...',
      pagePrev: '上一页',
      pageNext: '下一页',
      species: '物种',
      noAvailable: '不可用',
    },
    planets: {
      title: '龙珠行星',
      pagePrev: '上一页',
      pageNext: '下一页',
      description: '描述',
      isDestroyed: '已被摧毁',
      yes: '是',
      no: '否',
    },
    character: {
      ki: '气',
      maxKi: '最大气',
      race: '种族',
      gender: '性别',
      male: '男性',
      female: '女性',
      description: '描述',
      affiliation: '隶属',
      originPlanet: '原始行星',
      unknown: '未知',
      transformations: '变身',
      noTransformations: '此角色没有变身。',
    },
  },
  ko: {
    header: {
      title: '드래곤볼',
      menu: {
        home: '홈',
        characters: '캐릭터',
        planets: '행성',
        femaleCharacters: '여성 캐릭터',
        maleCharacters: '남성 캐릭터',
        raceCharacters: '종족별 캐릭터', // Añadido para "Personajes por raza"
      },
    },
    inicio: {
      welcomeTitle: '드래곤볼 우주에 오신 것을 환영합니다',
      subtitle: '드래곤볼의 가장 상징적인 부분을 탐험하세요.',
      introDescription:
        '드래곤볼 우주에 빠져들고 캐릭터, 행성, 변신 및 시리즈의 사실들을 발견하세요!',
      ctaButton: '탐험 시작',
    },
    personajes: {
      title: '드래곤볼 캐릭터',
      searchPlaceholder: '캐릭터 이름 입력...',
      pagePrev: '이전 페이지',
      pageNext: '다음 페이지',
      species: '종족',
      noAvailable: '사용 불가',
    },
    planets: {
      title: '드래곤볼 행성',
      pagePrev: '이전 페이지',
      pageNext: '다음 페이지',
      description: '설명',
      isDestroyed: '파괴됨',
      yes: '예',
      no: '아니오',
    },
    character: {
      ki: '기',
      maxKi: '최대 기',
      race: '종족',
      gender: '성별',
      male: '남성',
      female: '여성',
      description: '설명',
      affiliation: '소속',
      originPlanet: '원래 행성',
      unknown: '알 수 없음',
      transformations: '변신',
      noTransformations: '이 캐릭터는 변신하지 않습니다.',
    },
  },
  it: {
    header: {
      title: 'DRAGON BALL',
      menu: {
        home: 'Casa',
        characters: 'Personaggi',
        planets: 'Pianeti',
        femaleCharacters: 'Personaggi Femminili',
        maleCharacters: 'Personaggi Maschili',
        raceCharacters: 'Personaggi per Razza', // Añadido para "Personajes por raza"
      },
    },
    inicio: {
      welcomeTitle: 'Benvenuto nell\'Universo di Dragon Ball',
      subtitle: 'Esplora gli aspetti più iconici di Dragon Ball.',
      introDescription:
        'Immergiti nell\'universo di Dragon Ball e scopri personaggi, pianeti, trasformazioni e curiosità della serie!',
      ctaButton: 'Inizia ad esplorare',
    },
    personajes: {
      title: 'Personaggi di Dragon Ball',
      searchPlaceholder: 'Inserisci il nome del personaggio...',
      pagePrev: 'Pagina precedente',
      pageNext: 'Pagina successiva',
      species: 'Specie',
      noAvailable: 'Non disponibile',
    },
    planets: {
      title: 'Pianeti di Dragon Ball',
      pagePrev: 'Pagina precedente',
      pageNext: 'Pagina successiva',
      description: 'Descrizione',
      isDestroyed: 'È stato distrutto',
      yes: 'Sì',
      no: 'No',
    },
    character: {
      ki: 'Ki',
      maxKi: 'Max Ki',
      race: 'Razza',
      gender: 'Genere',
      male: 'Maschile',
      female: 'Femminile',
      description: 'Descrizione',
      affiliation: 'Affiliazione',
      originPlanet: 'Pianeta di origine',
      unknown: 'Sconosciuto',
      transformations: 'Trasformazioni',
      noTransformations: 'Questo personaggio non ha trasformazioni.',
    },
  },
};

// Configuración de vue-i18n
const i18n = createI18n({
  legacy: false, // Usar Composition API
  globalInjection: true, // Permitir $t globalmente
  locale: 'es', // Idioma predeterminado
  fallbackLocale: 'en', // Idioma de respaldo
  messages,
});

// Crear la aplicación
const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
