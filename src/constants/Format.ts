import env from '../common/plugins/env';

const isJa = env.LANG === "ja";

export default {
    baseCcy: isJa ? "JPY" : "USD",
    baseCcySymbol: isJa ? "¥" : "$",
    dateFormat: isJa ? "YYYY/MM/DD" : "YYYY-MM-DD",
    datetimeFormat: isJa ? "YYYY/MM/DD HH:mm:ss" : "YYYY-MM-DD  HH:mm:ss",
};
