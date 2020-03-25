import React, {Component} from "react";
import {observer} from "mobx-react";
import LottieView from "lottie-react-native";
import {action, observable} from "mobx";

interface Props {
    processing?: boolean,
    finish?: boolean,
    error?: boolean,
    onAnimationFinish: (finish: boolean, error: boolean) => void
}

@observer
export default class ProcessAnimation extends Component<Props> {

    private lottieRef = React.createRef<any>();

    @observable loop = false;
    @observable speed = 1.7;
    waitFinish = false;
    waitError = false;
    waitLastAnimation = false;

    constructor(props) {
        super(props);
        this.onAnimationFinish = this.onAnimationFinish.bind(this)
    }

    componentDidMount() {
        if (this.props.processing) {
            this.startLoadingAnimation();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!this.props.processing) {
            this.clear();
        } else if (!prevProps.processing && this.props.processing) {
            this.startLoadingAnimation();
        } else if (!prevProps.finish && this.props.finish) {
            this.startWaitFinish(false);
        } else if (!prevProps.error && this.props.error) {
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

    onAnimationFinish() {
        const {finish, error, processing} = this.props;
        if (this.waitLastAnimation) {
            this.props.onAnimationFinish(finish, error);
            this.endWaitFinish();
        } else if (finish && this.waitFinish) {
            this.lottieRef.current.play(239, 400);
            this.waitLastAnimation = true;
            this.waitFinish = false;
        } else if (error && this.waitError) {
            this.lottieRef.current.play(657, 823);
            this.waitLastAnimation = true;
            this.waitError = false;
        } else if (this.loop && processing) {
            this.lottieRef.current.play(0, 120);
        }
    }

    render() {
        if (!this.props.processing) {
            return null;
        }
        return (
            <LottieView
                loop={false}
                speed={this.speed}
                autoSize
                ref={this.lottieRef}
                onAnimationFinish={this.onAnimationFinish}
                source={require("@assets/lottie/lf30_editor_woKRBL.json")}
            />
        )
    }
}

