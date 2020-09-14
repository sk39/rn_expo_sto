import Layout from "../../constants/Layout";
import {Platform, StatusBar} from "react-native";

export default class ViewUtils {

    static isIphoneX() {
        const dimen = Layout.window;
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
        );
    }

    static getStatusBarHeight(safe?: boolean) {
        return Platform.select({
            ios: this.isIphoneX ? (safe ? 44 : 30) : 12,
            android: StatusBar.currentHeight,
            default: 0
        });
    }

    static numberFormat(num: string | number, decimals?: number): string {
        return s.numberFormat(Number(num), decimals);
    }

    static getBottomBtnHeight() {
        return this.isIphoneX()
            ? Layout.bottomBtn.heightIPhoneX :
            Layout.bottomBtn.height
    }

    static getPagePaddingTop() {
        return this.isIphoneX() ? 16 : 0
    }

    static getBottomBtnPaddingBottom() {
        return this.isIphoneX() ? 16 : 0
    }

    static sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    static ifIphoneXStyle(style: any) {
        return this.isIphoneX() ? style : {}
    }
}
