import {observer} from "mobx-react";
import React, {Component} from "react";
import {observable} from "mobx";
import {Animated, RefreshControl, View} from "react-native";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    scroll?: Animated.Value;
    onRefresh?: () => Promise<any>;
    withFloatHeader?: boolean;
    withFloatHeaderHeight?: number;
    scrollEventThrottle?: number;
}

@observer
export default class MyScrollView extends Component<Props> {

    @observable refreshing = false;
    scrollRef;

    static defaultProps = {
        scrollEventThrottle: 16,
    };

    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
    }

    onRefresh = async () => {
        this.refreshing = true;
        await this.props.onRefresh();
        this.refreshing = false;
    }

    resetScroll(animated = true) {
        this.scrollRef.current.scrollTo({x: 0, y: 0, animated});
    }

    render() {
        const {scroll, onRefresh, withFloatHeader, withFloatHeaderHeight} = this.props;
        const viewProps: any = {};
        if (onRefresh) {
            viewProps.refreshControl = (
                <RefreshControl refreshing={this.refreshing}
                                onRefresh={this.onRefresh}/>
            )
        }

        if (scroll) {
            viewProps.scrollEventThrottle = this.props.scrollEventThrottle
            viewProps.onScroll =
                Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: scroll,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: true})
        }

        let append = null;
        if (withFloatHeader) {
            const h = withFloatHeaderHeight ||
                ViewUtils.getFloatPageHeaderHeight() - ViewUtils.getStatusBarHeight()
            append = (
                <View style={{height: h}}/>
            )
        }

        return (
            <Animated.ScrollView {...viewProps} ref={this.scrollRef}>
                {append}
                {this.props.children}
            </Animated.ScrollView>
        )
    }
}
