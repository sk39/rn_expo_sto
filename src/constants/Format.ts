import env from '../common/plugins/env';

const isJa = env.LANG === "ja";

export default {
    baseCcy: isJa ? "JPY" : "USD",
    baseCcySymbol: isJa ? "¥" : "$",
    dateFormat: isJa ? "YYYY/MM/DD" : "YYYY-MM-DD",
};
