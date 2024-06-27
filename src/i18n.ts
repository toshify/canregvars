import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
  // lng: 'no',
  resources: {
    en: {
      translation: {
        name: "Name",
        category: "Category",
        dataType: "Data Type",
        registrationMethod: "Registration Method",
        status: "Status",
        variableType: "Variable Type",
        informationLevel: "Information Level",
        validFrom: "Valid From",
        createdOn: "Created On",
        dataSize: "Data Size",
        validForExtraction: "Valid For Extraction",
        techName: 'Tech name',
        sorting: 'Sorting',
        parent: 'Parent',
        shortName: 'Short name',
        mappedName: 'Mapped name',
        loading: 'Loading...',
        fetching: 'Fetching data from the metadata registry...',
        title: 'Variables',
        export: 'Export view',
        defaultFileName: 'metadata-variables',
      }
    },
    no: {
      translation: {
        name: "Navn",
        category: "Kategori",
        dataType: "Datatype",
        registrationMethod: "Registreringsmetode",
        status: "Status",
        variableType: "Variabeltype",
        informationLevel: "Informasjonsnivå",
        validFrom: "Gyldig fra",
        createdOn: "Opprettet",
        dataSize: "Datastørrelse",
        validForExtraction: "Gyldig for uthenting",
        techName: 'Teknologinavn',
        sorting: 'Sortering',
        parent: 'Forelder',
        shortName: 'Kortnavn',
        mappedName: 'Tilordnet navn',
        loading: 'Laster inn...',
        fetching: 'Henter data fra metadata registeret...',
        title: 'Variabler',
        export: 'Eksporter visning',
        defaultFileName: 'metadata-variabler',
      },
    },
  },
  supportedLngs: ['en', 'no'],
  fallbackLng: {
    'nb': ['no'],
    default: ['no']
  },
  detection: {
    order: ['querystring', 'localStorage', 'cookie', 'navigator'],
    lookupQuerystring: 'lng',
    caches: [],
  },
});

export default i18n;