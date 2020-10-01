const back = '#f6f7ff';
const back2 = '#e2e3ef';
const back3 = '#e9eaf8';
const inverseBack = '#130f3c';
const font = '#201922';
const tint = '#6f6f8c';
const tint2 = '#929ab6';
const primary = '#7462ff';
const primary2 = '#7e6eda';
const primaryLight = '#d1d1ff';
const primaryDark = '#3f358d';
const second = '#fd8418';
const red1 = '#f11561';
const red2 = '#ff330f';

const Colors = {
    font,
    back,
    back2,
    back3,
    primary,
    primary2,
    primaryThin: "rgb(230,230,255)",
    primaryLight,
    primaryDark,
    second,
    secondThin: 'rgb(250,231,214)',
    labelFont: tint,
    labelFontThin: tint2,
    unitFont: tint2,
    tabDefault: tint,
    tabSelected: primary,
    tabBar: back,
    tabBorder: "#c2c2c9",
    toolBar: back,
    toolBarInverse: inverseBack,
    disablesLayer: "rgba(239,244,246,0.6)",
    disablesLayerDark: "rgba(11,10,25,0.7)",
    cardBack: '#fff',
    positive: 'rgb(75,210,16)',
    positiveThin: 'rgb(236,245,235)',
    positiveLight: 'rgb(187,252,112)',
    negative: red1,
    error: red2,
    errorThin: '#fcd6cf',
    listBorder: "rgba(15,20,92,0.08)",
    listBorderDark: "rgba(15,20,92,0.2)",
    btn: "#afafaf",
    btnPrimaryLight: primary,
    btnPrimary: primaryDark,
    btnPrimaryText: primaryLight,
    btnDark: inverseBack,
    inputBack: "#fff",
    inputBorder: "rgba(15,20,92,0.1)",
    inputPadBack: "#f1f1f4",
    link: "#6f7499",
};

export const NotifyColor = {
    normal: {
        backgroundColor: Colors.back2,
        color: Colors.font
    },
    primary: {
        backgroundColor: Colors.primaryThin,
        color: Colors.primary
    },
    success: {
        backgroundColor: Colors.positiveThin,
        color: Colors.positive
    },
    waring: {
        backgroundColor: Colors.secondThin,
        color: Colors.second
    },
    error: {
        backgroundColor: Colors.errorThin,
        color: Colors.error
    },
    disable: {
        backgroundColor: "#ccc",
        color: "#888"
    }
}
export const ChartColor = [
    '#f15073',
    '#ff7557',
    '#ffab47',
    '#ca4fd9',
    '#9559FA',
];

export const PieChartColor = [
    'rgb(255,169,0)',
    'rgb(250,91,107)',
    'rgb(165,90,232)',
    'rgb(67,114,255)',
    'rgb(40,205,255)',
];

export const BarChartColor = [
    'rgb(255,169,0)',
    'rgb(48,48,48)',
];


export default Colors;
