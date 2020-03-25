import React, {PureComponent} from 'react';
import {Animated, StyleSheet} from 'react-native';
import ViewUtils from "@common/utils/ViewUtils";

class ToolbarBackground extends PureComponent<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            translateY: new Animated.Value(props.isHidden ? -150 : 0),
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isHidden && this.props.isHidden) {
            this.hideAnimation();
        }
        if (prevProps.isHidden && !this.props.isHidden) {
            this.showAnimation();
        }
    }

    hideAnimation() {
        Animated.timing(this.state.translateY, {
            toValue: -150,
            useNativeDriver: true,
            duration: 300,
        }).start();
    }

    showAnimation() {
        Animated.timing(this.state.translateY, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300,
        }).start();
    }

    render() {
        const {translateY} = this.state;
        const animationStyle = {
            transform: [{translateY}],
        };

        return <Animated.View style={[styles.toolbarBackground, animationStyle]}/>;
    }
}

const styles = StyleSheet.create({
    toolbarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: ViewUtils.isIphoneX() ? 104 : 80,
        backgroundColor: '#0f153c',
    },
});

export default ToolbarBackground;
