import React, {Component} from "react";
import {observer} from "mobx-react";
import LottieView from "lottie-react-native";
import {observable} from "mobx";

interface Props {
    show: boolean;
}

@observer
export default class ErrorAnimation extends Component<Props> {

    private lottieRef = React.createRef<any>();

    @observable loop = false;
    @observable speed = 1.7;

    componentDidMount() {
        this.lottieRef.current.play(700, 823);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <LottieView
                loop={false}
                speed={this.speed}
                autoSize
                ref={this.lottieRef}
                source={require("@assets/lottie/lf30_editor_woKRBL.json")}
            />
        )
    }
}

