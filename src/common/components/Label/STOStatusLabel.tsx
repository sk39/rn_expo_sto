import React, {FC} from "react"
import StoVM from "@common/model/StoVM";
import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";
import {NotifyColor} from "@constants/Colors";

interface Props {
    item: StoVM;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}

const COLOR_DIC = {
    default: NotifyColor.disable,
    offering: NotifyColor.primary,
    waiting: NotifyColor.waring
}
const STOStatusLabel: FC<Props> = ({item, containerStyle, titleStyle}) => {

    const {backgroundColor, color} = COLOR_DIC[item.status] || COLOR_DIC.default;
    return (
        <View style={[styles.container, containerStyle, {backgroundColor}]}>
            <Text style={[styles.title, titleStyle, {color}]}>
                {t(`screen.tokens.status.${item.status}`)}
            </Text>
        </View>
    )
}

export default STOStatusLabel;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
    }
});
