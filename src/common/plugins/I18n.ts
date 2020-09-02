import i18n from 'i18n-js';
import env from './env';

const lang = env.LANG
i18n.translations = {
    en: require("@constants/i18n/en.json"),
    ja: require("@constants/i18n/ja.json"),
};
i18n.locale = lang;
i18n.fallbacks = true;

export default i18n;
