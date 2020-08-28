import React, {Component} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import ViewUtils from "@common/utils/ViewUtils";
import {observable} from "mobx";

const HEADER_HEIGHT = 168;
const HEADER_MIN_HEIGHT = 120;

@observer
export default class HomeHeader extends Component {

    @observable headerHeight = new Animated.Value(HEADER_HEIGHT);

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this)
    }

    onScroll(scrollY) {
        this.headerHeight.setValue(Math.max(HEADER_HEIGHT - scrollY / 4, HEADER_MIN_HEIGHT))
    }

    render() {
        const headAniStyle = {
            height: this.headerHeight,
        };

        return (
            <Animated.View style={[styles.header, headAniStyle]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: ViewUtils.getStatusBarHeight()
    }
});
