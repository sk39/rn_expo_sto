import React, {Component} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {observable} from "mobx";
import ScreenLinkButton from "@common/components/SceenLinkButton";
import Colors from "../../constants/Colors";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";

@observer
export default class HomeLinkButton extends Component<any> {

    @observable opacity = new Animated.Value(0);
    @observable translateY = new Animated.Value(16);

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.opacity.setValue(0);
                this.translateY.setValue(16);
                Animated.parallel([
                    Animated.timing(this.opacity, {
                        easing: Easing.out(Easing.back()),
                        toValue: 1,
                        duration: 700,
                        delay: this.props.delay,
                    }),
                    Animated.timing(this.translateY, {
                        easing: Easing.out(Easing.back()),
                        toValue: 0,
                        duration: 700,
                        delay: this.props.delay,
                    }),
                ]).start();
            }
        );
        this.props.navigation.addListener(
            'didBlur',
            () => {
                this.opacity.setValue(0);
                this.translateY.setValue(16);
            }
        );
    }

    render() {
        const aniStyle = {
            opacity: this.opacity,
            transform: [{translateY: this.translateY}],
            ...getPlatformElevation(6)
        };

        return (
            <Animated.View style={[styles.container, aniStyle]}>
                <ScreenLinkButton screenName={this.props.screenName}
                                  iconSize={40}
                                  btnStyle={styles.btn}
                                  btnTextStyle={styles.btnText}/>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        margin: 8,
        flex: 1,
        borderRadius: 20,
        height: "auto",
    },
    btn: {
        backgroundColor: Colors.backColor,
        flexDirection: "column",
        flex: 1,
        borderRadius: 20,
    },
    btnText: {
        paddingTop: 8,
        fontSize: 18,
        color: Colors.fontColor
    }
});
