import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Colors from "@constants/Colors";
import {Button, Icon} from "react-native-elements";

interface Props {
    title: string;
    linkTitle: string;
    onLinkPress: () => void;
}

export default class HomeChildTitle extends Component<Props> {
    render() {
        const {title, linkTitle, onLinkPress} = this.props;
        return (
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
                <Button
                    icon={
                        <Icon
                            name="chevron-right"
                            type="feather"
                            size={15}
                            color={Colors.link}
                        />
                    }
                    type="clear"
                    iconRight
                    buttonStyle={{alignItems: "center"}}
                    titleStyle={{color: Colors.link, fontSize: 14, letterSpacing: 1}}
                    title={linkTitle}
                    onPress={onLinkPress}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    titleWrapper: {
        paddingLeft: 16,
        paddingRight: 6,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        color: Colors.toolBarInverse,
        opacity: 0.7,
        fontWeight: "700",
        letterSpacing: 1,
    },
});
