import React, {PureComponent, RefObject} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import InputNumberState from "@common/components/Input/InputNumberState";
import NumberPadLabel from "./NumberPadLabel";
import NumberPad from "./NumberPad";
import BottomModal from "@common/components/Modal/BottomModal";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    inputState: InputNumberState,
}

@observer
export default class InputNumberPad extends PureComponent<Props> {

    modalRef: RefObject<BottomModal>;
    padRef: RefObject<NumberPad>;
    height = 372 + ViewUtils.getBottomBtnPaddingBottom();

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
                <View style={{width: 240, paddingTop: 8}}>
                    <NumberPadLabel value={inputState.value}
                                    unit={inputState.unit}
                                    onPress={this.open}/>
                </View>
                <BottomModal
                    ref={this.modalRef}
                    height={this.height}>
                    <NumberPad
                        ref={this.padRef}
                        inputState={inputState}
                        onClose={this.close}/>
                </BottomModal>
            </View>
        )
    }
}
