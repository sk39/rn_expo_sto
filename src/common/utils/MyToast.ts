import {Toast} from 'native-base';
import Colors from "@constants/Colors";

export default class MyToast {

    static success(message, duration = 2000) {
        Toast.show({
            text: message,
            buttonText: t("btn.close"),
            duration,
            textStyle: {color: Colors.positiveLight},
        })
    }

    static error(message, duration = 2000) {
        Toast.show({
            text: message,
            buttonText: t("btn.close"),
            duration,
            textStyle: {color: Colors.error},
        })
    }
}
