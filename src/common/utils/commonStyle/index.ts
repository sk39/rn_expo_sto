import Layout from "@constants/Layout";
import Colors from "@constants/Colors";

const commonStyles = {
    modalBtn: {
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: Colors.btn,
        height: 44,
    },
    modalContent: {
        width: Layout.window.width - 56,
        borderRadius: 10,
    }
};

export default commonStyles;
