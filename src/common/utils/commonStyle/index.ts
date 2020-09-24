import Layout from "@constants/Layout";
import Colors from "@constants/Colors";
import {Platform} from "react-native";

const commonStyles: any = {
    modalBtn: {
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: Colors.btn,
        width: "100%",
        height: 44,
    },
    modalContent: {
        maxHeight: Layout.window.height - 56,
        width: Layout.window.width - 56,
        borderRadius: 10,
    },
    amountLabel: {
        fontSize: 16,
        fontWeight: "700",
        ...Platform.select({
            ios: {
                fontWeight: "700",
            },
            android: {
                fontWeight: "700",
                letterSpacing: 1,
            },
        })
    }
};

export default commonStyles;
