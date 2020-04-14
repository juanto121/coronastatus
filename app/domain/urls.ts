import config from '../config';

export type Locale =
  | 'no'
  | 'nl'
  | 'en'
  | 'en-US'
  | 'en-AU'
  | 'en-MT'
  | 'es-MX'
  | 'sk'
  | 'it'
  | 'tr'
  | 'dk'
  | 'ua'
  | 'es-CO'
  | 'es-AR'
  | 'fr-FR'
  | 'es-ES'
  | 'ca'
  | 'en-SG'
  | 'ms-MY'
  | 'se';

type Urls = {
  [locale in Locale]: {
    submitReport: string;
    profile: string;
    privacyPolicy: string;
    help: string;
    map: string;
    contributors: string;
    api: string;
    apiDocs: string;
    statistics: string;
    videocall: string;
    riskClassification: string;
  };
};

const localeAwareUrls: Urls = {
  no: {
    submitReport: '/',
    profile: '/helsetilstand',
    privacyPolicy: '/personvern',
    help: '/help',
    map: '/kart',
    contributors: '/frivillige',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistikk',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  nl: {
    submitReport: '/',
    profile: '/melding',
    privacyPolicy: '/privacy-policy',
    help: '/help',
    map: '/kaart',
    contributors: '/bijdragers',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistieken',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  en: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'en-US': {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'es-AR': {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/politica-de-privacidad',
    help: '/help',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'en-AU': {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'en-MT': {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'es-MX': {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    help: '/help',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  sk: {
    submitReport: '/',
    profile: '/zdravotny-stav',
    privacyPolicy: '/ochrana-sukromia',
    help: '/help',
    map: '/mapa',
    contributors: '/prispievatelia',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiky',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  it: {
    submitReport: '/',
    profile: '/profilo',
    privacyPolicy: '/privacy',
    help: '/help',
    map: '/mappa',
    contributors: '/contributori',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiche',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  tr: {
    submitReport: '/',
    profile: '/profil',
    privacyPolicy: '/gizlilik-bildirimi',
    help: '/help',
    map: '/harita',
    contributors: '/katkida-bulunanlar',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/istatistikler',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  dk: {
    submitReport: '/',
    profile: '/helbredstilstand',
    privacyPolicy: '/privat-politik',
    help: '/help',
    map: '/kort',
    contributors: '/frivillige',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistikker',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  ua: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'es-CO': {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/politica-de-privacidad',
    help: '/lineas-de-atencion',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'fr-FR': {
    submitReport: '/',
    profile: '/profil',
    privacyPolicy: '/politique-de-confidentialite',
    help: '/help',
    map: '/carte',
    contributors: '/contributeurs',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistiques',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'es-ES': {
    submitReport: '/',
    profile: '/estadosalud',
    privacyPolicy: '/aviso-privacidad',
    help: '/help',
    map: '/mapa',
    contributors: '/colaboradores',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/estadisticas',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  ca: {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'en-SG': {
    submitReport: '/',
    profile: '/healthcondition',
    privacyPolicy: '/privacy-statement',
    help: '/help',
    map: '/map',
    contributors: '/contributors',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistics',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  'ms-MY': {
    submitReport: '/',
    profile: '/keadaankesihatan',
    privacyPolicy: '/kenyataan-privasi',
    help: '/help',
    map: '/peta',
    contributors: '/penyumbang',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistik',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  },
  se: {
    submitReport: '/',
    profile: '/halsotillstand',
    privacyPolicy: '/integritetspolicy',
    help: '/help',
    map: '/karta',
    contributors: '/medverkare',
    api: '/api',
    apiDocs: '/api-docs',
    statistics: '/statistik',
    videocall: '/videollamada',
    riskClassification: 'clasificacion-del-riesgo'
  }
};

export const urls = localeAwareUrls[config.LANGUAGE as Locale];
