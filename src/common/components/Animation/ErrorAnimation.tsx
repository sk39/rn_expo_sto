import React, {Component} from "react";
import {observer} from "mobx-react";
import LottieView from "lottie-react-native";

interface Props {
    show: boolean;
}

@observer
export default class ErrorAnimation extends Component<Props> {

    private lottieRef = React.createRef<any>();

    componentDidMount() {
        this.lottieRef.current.play();
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <LottieView
                loop={false}
                style={{width: 150, height: 150, marginTop: -10, marginBottom: -30}}
                ref={this.lottieRef}
                source={require("@sk39/lottie-files/dist/error-icon-bounce.json")}
            />
        )
    }
}

