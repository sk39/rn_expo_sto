import React, {PureComponent, RefObject} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import InputNumberState from "@common/components/Input/InputNumberState";
import CodePadLabel from "./CodePadLabel";
import CodePad from "./CodePad";
import BottomModal from "@common/components/Modal/BottomModal";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    inputState: InputNumberState,
}

@observer
export default class InputCodePad extends PureComponent<Props> {

    modalRef: RefObject<BottomModal>;
    padRef: RefObject<CodePad>;
    height = 408 + ViewUtils.getBottomBtnPaddingBottom();

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.padRef = React.createRef();
    }

    open = () => {
        this.modalRef.current.open();
        setTimeout(() => this.padRef.current.onOpen(), 0)
    }

    close = () => {
        this.modalRef.current.close();
    }

    render() {
        const {inputState} = this.props;
        return (
            <View>
                <CodePadLabel value={inputState.value}
                              onPress={this.open}/>
                <BottomModal
                    ref={this.modalRef}
                    height={this.height}>
                    <CodePad
                        ref={this.padRef}
                        inputState={inputState}
                        onClose={this.close}/>
                </BottomModal>
            </View>
        )
    }
}
