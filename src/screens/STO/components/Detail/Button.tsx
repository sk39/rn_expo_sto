import React, {Component} from 'react';
import {Animated, Easing, InteractionManager, StyleSheet} from 'react-native';
import Colors from "../../../../constants/Colors";
import {Button, Text} from "native-base";
import {observable} from "mobx";
import Layout from "../../../../constants/Layout";

interface Props {
    isHidden: boolean;
    title: string;
    delay?: number;
}

interface State {
    translateY: any;
}

export default class SButton extends Component<Props, State> {

    @observable investMode = false;
    @observable height = new Animated.Value(48);

    constructor(props) {
        super(props);

        this.state = {
            translateY: new Animated.Value(112),
        };
        this.onPress = this.onPress.bind(this);
    }

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
        Animated.timing(this.state.translateY, {
            easing: Easing.out(Easing.back()),
            toValue: 0,
            delay: props.delay,
        }).start();
    }

    hideAnimation(props) {
        Animated.timing(this.state.translateY, {
            easing: Easing.in(Easing.back()),
            toValue: 112,
            delay: props.delay,
        }).start();
    }

    onPress() {
        setTimeout(() => {
            this.investMode = !this.investMode;
            if (this.investMode) {
                this.height.setValue(48);
                Animated.parallel([
                    Animated.timing(this.height, {
                        easing: Easing.in(),
                        toValue: Layout.window.height,
                        duration: 250,
                        delay: 0,
                    }),
                ]).start();
            } else {
                this.height.setValue(Layout.window.height);
                Animated.parallel([
                    Animated.timing(this.height, {
                        easing: Easing.in(),
                        toValue: 48,
                        duration: 250,
                        delay: 0,
                    }),
                ]).start();
            }
        }, 100)
    }

    render() {
        const {title} = this.props;
        const {translateY} = this.state;

        const animationStyle = {
            transform: [{translateY}],
            height: this.height
        };

        return (
            <Animated.View style={[styles.buttonContainer, animationStyle]}>
                <Button style={[styles.btn]} onPress={this.onPress}>
                    <Text style={{color: Colors.primaryColorLight, fontSize: 16, fontWeight: "700"}}>{title}</Text>
                </Button>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1
    },
    btn: {
        flex: 1,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColorDark
    },
});
