import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {View} from "native-base";

@observer
export default class AssetImage extends Component {
    render() {
        return (
            <View style={styles.logoWrapper}>
                <Image
                    style={styles.image}
                    source={require("@assets/asset-icon.png")}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logoWrapper: {
        position: "absolute",
        right: -7,
        bottom: -28,
    },
    image: {
        width: 180,
        height: 180,
        opacity: 0.3,
    },
});
