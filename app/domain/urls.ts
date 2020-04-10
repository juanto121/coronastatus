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
    statistics: '/statistikk'
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
    statistics: '/statistieken'
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
    statistics: '/statistics'
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
    statistics: '/statistics'
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
    statistics: '/estadisticas'
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
    statistics: '/statistics'
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
    statistics: '/statistics'
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
    statistics: '/estadisticas'
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
    statistics: '/statistiky'
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
    statistics: '/statistiche'
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
    statistics: '/istatistikler'
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
    statistics: '/statistikker'
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
    statistics: '/statistics'
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
    statistics: '/estadisticas'
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
    statistics: '/statistiques'
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
    statistics: '/estadisticas'
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
    statistics: '/statistics'
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
    statistics: '/statistics'
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
    statistics: '/statistik'
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
    statistics: '/statistik'
  }
};

export const urls = localeAwareUrls[config.LANGUAGE as Locale];
