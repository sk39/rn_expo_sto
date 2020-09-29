import React, {Component} from "react";
import {observer} from "mobx-react";
import LottieView from "lottie-react-native";
import {action, observable} from "mobx";
import {Platform} from "react-native";

interface Props {
    state: "confirm" | "processing" | "success" | "error",
    onAnimationFinish: () => void
}

@observer
export default class ProcessAnimation extends Component<Props> {

    private lottieRef = React.createRef<LottieView>();

    @observable loop = false;
    @observable speed = 1.7;
    waitFinish = false;
    waitError = false;
    waitLastAnimation = false;

    componentDidMount() {
        if (this.props.state === "processing") {
            this.startLoadingAnimation();
        }
    }

    componentDidUpdate(prevProps: Props) {
        const {state} = this.props;
        const prevState = prevProps.state;
        if (state == null) {
            this.clear();
        } else if (prevState !== state && state === "processing") {
            this.startLoadingAnimation();
        } else if (prevState !== state && state === "success") {
            this.startWaitFinish(false);
        } else if (prevState !== state && state === "error") {
            this.startWaitFinish(true);
        }
    }

    @action
    startWaitFinish(error) {
        this.loop = false;
        this.speed = 2;
        if (error) {
            this.waitFinish = false;
            this.waitError = true;
        } else {
            this.waitFinish = true;
            this.waitError = false;
        }
    }

    @action
    endWaitFinish() {
        this.speed = 1.7;
        this.waitFinish = false;
    }

    @action
    clear() {
        this.loop = false;
        this.waitFinish = false;
        this.waitError = false;
    }

    @action
    startLoadingAnimation() {
        this.clear();
        this.loop = true;
        this.waitLastAnimation = false;
        this.lottieRef.current.reset();
        this.lottieRef.current.play(0, 120);
    }

    private play(startFrame?: number, endFrame?: number) {
        // see:https://github.com/react-native-community/lottie-react-native/issues/505
        if (Platform.OS === "android") {
            setTimeout(() => this.lottieRef.current.play(startFrame, endFrame), 10)
            return;
        }
        this.lottieRef.current.play(startFrame, endFrame);
    }

    onAnimationFinish = () => {
        const {state} = this.props;
        if (this.waitLastAnimation) {
            this.props.onAnimationFinish();
            this.endWaitFinish();
        } else if (state === "success" && this.waitFinish) {
            this.play(239, 400);
            this.waitLastAnimation = true;
            this.waitFinish = false;
        } else if (state === "error" && this.waitError) {
            this.play(657, 823);
            this.waitLastAnimation = true;
            this.waitError = false;
        } else if (this.loop && state === "processing") {
            this.play(0, 120);
        }
    }

    render() {
        if (!this.props.state) {
            return null;
        }
        return (
            <LottieView
                ref={this.lottieRef}
                loop={false}
                speed={this.speed}
                autoSize
                onAnimationFinish={this.onAnimationFinish}
                source={require("@assets/lottie/lf30_editor_woKRBL.json")}
            />
        )
    }
}

