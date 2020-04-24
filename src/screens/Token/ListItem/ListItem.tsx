import React, {Component} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import {Divider} from "react-native-elements";
import Header from './Header';
import Content from './Content';
import {observer} from "mobx-react";
import AnimatedCard from "../animations/AnimatedCard";
import {ScaleAndOpacity} from "../animations";

interface Props {
    onPress?: Function;
    item: any;
    isDetail?: boolean;
    style?: any;
    detailMode?: boolean;
    phase?: string;
    isHidden?: boolean;
    animateOnDidMount?: boolean;
    scrollY?: Animated.Value;
}

@observer
export default class ListItem extends Component<Props> {

    private cardRef;

    onPressed = event => {
        const {onPress, item} = this.props;
        onPress(item, event.nativeEvent);
    };

    render() {
        const {item, detailMode, phase, isDetail, style, isHidden, animateOnDidMount} = this.props;
        const {image, localImage} = item;
        let imageSource;
        if (image) {
            imageSource = {uri: image}
        } else {
            imageSource = localImage
        }
        return (
            <ScaleAndOpacity
                isHidden={isHidden}
                animateOnDidMount={animateOnDidMount}

                duration={360}
            >
                <TouchableWithoutFeedback onPress={this.onPressed}>
                    <View>
                        <AnimatedCard
                            ref={node => (this.cardRef = node)}
                            image={imageSource}
                            detailMode={detailMode}
                            phase={phase}
                            scrollY={this.props.scrollY}
                            isDetail={isDetail}
                            isHidden={isHidden}>
                            <Header isDetail={isDetail} item={item}/>
                            <Divider/>
                            <Content isDetail={isDetail} item={item}/>
                        </AnimatedCard>
                    </View>
                </TouchableWithoutFeedback>
            </ScaleAndOpacity>
        );
    }
}
