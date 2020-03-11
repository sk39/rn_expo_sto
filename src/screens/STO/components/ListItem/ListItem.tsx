import React, {Component} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {ScaleAndOpacity} from 'react-native-motion';
import {Divider} from "react-native-elements";
import Header from './Header';
import Content from './Content';
import {observer} from "mobx-react";
import AnimatedCard from "./AnimatedCard";

interface Props {
    onPress?: Function;
    item: any;
    isDetail?: boolean;
    style?: any;
    detailMode?: boolean;
    phase?: string;
    isHidden?: boolean;
    animateOnDidMount?: boolean;
}

@observer
export default class ListItem extends Component<Props> {

    private cardRef;

    onPressed = event => {
        // console.log("onPressed");
        const {onPress, item} = this.props;
        onPress(item, event.nativeEvent);
    };

    onParentScroll(scrollY) {
        if (this.cardRef)
            this.cardRef.onParentScroll(scrollY)
    }

    render() {
        const {item, detailMode, phase, isDetail, style, isHidden, animateOnDidMount} = this.props;
        const {image} = item;
        // console.log("dd", `detailMode:${detailMode}, phase:${phase}`);
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
                            image={{uri: image}}
                            detailMode={detailMode}
                            phase={phase}
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

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#444',
//         marginHorizontal: 16,
//         marginVertical: 4,
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 5,
//         ...getPlatformElevation(4),
//     },
// });
