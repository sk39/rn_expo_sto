import React, {Component} from 'react';
import AnimatedSlide from "@common/components/Animation/AnimatedSlide";

interface Props {
    delay: number;
    duration?: number;
    easing?: (value: number) => number;
    moveDistance?: number;
}

export default class AnimatedRow extends Component<Props> {

    static defaultProps = {
        duration: 700,
    };

    render() {
        return (
            <AnimatedSlide
                {...this.props}
                direction="up"
                changeOpacity/>
        );
    }
}
