import Layout from "@constants/Layout";
import Colors from "@constants/Colors";

const commonStyles = {
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
    }
};

export default commonStyles;
