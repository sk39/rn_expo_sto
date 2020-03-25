import React, {Component} from 'react';
import {Animated, Easing, InteractionManager, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    onPress: any;
    isHidden: boolean;
    disabled: boolean;
}

const BTN_HEIGHT = ViewUtils.isIphoneX() ? 66 : 48;
@observer
export default class InvestButton extends Component<Props> {

    @observable translateY = new Animated.Value(112);

    componentDidMount() {
        InteractionManager.runAfterInteractions().then(() => {
            this.showAnimation(this.props);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isHidden && this.props.isHidden) {
            this.hideAnimation(this.props);
        }
    }

    showAnimation(props) {
        this.translateY.setValue(112);
        Animated.timing(this.translateY, {
            easing: Easing.out(Easing.back()),
            toValue: 0,
            delay: 0,
        }).start();
    }

    hideAnimation(props) {
        this.translateY.setValue(112);
    }

    render() {

        const {translateY} = this;
        const {disabled} = this.props;

        const animationStyle = {
            transform: [{translateY}],
        };

        return (
            <View style={styles.container}>
                <Animated.View style={[animationStyle]}>
                    <TouchableOpacity style={disabled ? [styles.btn, styles.disabledBtn] : styles.btn}
                                      onPress={this.props.onPress}
                                      disabled={disabled}>
                        <Text style={disabled ? [styles.text, styles.disabledBtnText] : styles.text}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    btn: {
        height: BTN_HEIGHT,
        // width: 200,
        flex: 1,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColorDark,
    },
    disabledBtn: {
        backgroundColor: '#b1b2b6',
    },
    text: {
        color: Colors.primaryColorLight,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 1
    },
    disabledBtnText: {
        color: 'rgba(42,40,45,0.4)'
    }
});
