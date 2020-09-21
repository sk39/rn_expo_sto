import React, {Component} from "react";
import {BackHandler, Easing, StyleSheet, View} from "react-native";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import Colors from "@constants/Colors";
import DisableLayer from "@common/components/Modal/DisableLayer";
import AnimatedRow from "@common/components/Animation/AnimatedRow";
import commonStyles from "@common/utils/commonStyle";
import MobxHelper from "@common/utils/MobxHelper";
import ProcessDialogState from "./ProcessDialogState";
import ProcessDialogContent from "./ProcessDialogContent";

interface Props {
    model: ProcessDialogState;
    onClose: () => void,
    renderConfirm: () => any;
    renderSuccess?: () => any;
    renderError?: () => any;
    disablesLayerBackgroundColor?: string,
}

@observer
export default class ProcessDialog extends Component<Props> {

    static defaultProps = {
        disablesLayerBackgroundColor: Colors.disablesLayerDark
    };

    contentsRef = React.createRef<View>()
    mobxHelper = new MobxHelper();
    @observable confirmHeight: number = null;

    componentDidMount() {
        this.mobxHelper.reaction(
            () => this.props.model.showDialog,
            show => {
                setTimeout(() => {
                    if (show && this.contentsRef.current) {
                        this.contentsRef.current.measure((fx, fy, width, height, px, py) => {
                            runInAction(() => {
                                this.confirmHeight = height;
                            })
                        })
                    }
                }, 0)
            }
        )
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
        this.mobxHelper.onUnmount();
    }

    handleBackButtonPressAndroid = () => {
        const {model} = this.props
        if (model.showDialog) {
            if (model.state !== "processing") {
                this.props.onClose();
            }
            return true;
        }
    };

    renderContents() {
        const {model} = this.props
        if (!model.showDialog) {
            return null;
        }

        if (model.state === "confirm") {
            return this.props.renderConfirm();
        }

        const {renderSuccess, renderError, onClose} = this.props;
        return (
            <ProcessDialogContent
                model={model}
                startMinHeight={this.confirmHeight}
                onClose={onClose}
                renderSuccess={renderSuccess}
                renderError={renderError}
            />
        )
    }

    render() {
        const {model, disablesLayerBackgroundColor} = this.props;
        const {showDialog} = model;
        return (
            <DisableLayer show={showDialog}
                          disablesLayerBackgroundColor={disablesLayerBackgroundColor}>
                <AnimatedRow delay={0}
                             duration={200}
                             easing={Easing.ease}
                             moveDistance={20}>
                    <View ref={this.contentsRef} style={styles.contentWrapper}>
                        {this.renderContents()}
                    </View>
                </AnimatedRow>
            </DisableLayer>
        )
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        ...commonStyles.modalContent,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.back,
    }
});
