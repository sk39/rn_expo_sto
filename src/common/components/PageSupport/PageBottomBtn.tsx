import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Colors from "@constants/Colors";
import ViewUtils from "@common/utils/ViewUtils";
import {Button} from "react-native-elements";
import {observer} from "mobx-react";
import AnimatedSlide from "@common/components/Animation/AnimatedSlide";
import {observable} from "mobx";

interface Props {
    onPress: any;
    text: string;
    loading?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    animation?: boolean;
    animationDelay?: number;
}

@observer
export default class PageBottomBtn extends Component<Props> {

    @observable opacity = new Animated.Value(1);

    renderContents() {
        const {onPress, text, loading, disabled} = this.props;
        return (
            <Button title={text}
                    containerStyle={[styles.btnWrapper]}
                    buttonStyle={styles.btn}
                    titleStyle={styles.text}
                    loading={loading}
                    disabled={disabled}
                    onPress={onPress}
            />
        );
    }

    render() {
        const {hidden, animation, animationDelay} = this.props;
        if (hidden) {
            return null;
        }

        if (animation) {
            return (
                <View style={styles.container}>
                    <AnimatedSlide delay={animationDelay || 500}
                                   moveDistance={56}>
                        {this.renderContents()}
                    </AnimatedSlide>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {this.renderContents()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        borderRadius: 0,
    },
    btnWrapper: {
        borderRadius: 0,
    },
    btn: {
        height: ViewUtils.getBottomBtnHeight(),
        flex: 1,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.btnPrimary,
        ...ViewUtils.ifIphoneXStyle({
            paddingBottom: ViewUtils.getBottomBtnPaddingBottom()
        })
    },
    text: {
        color: Colors.btnPrimaryText,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1
    }
});
