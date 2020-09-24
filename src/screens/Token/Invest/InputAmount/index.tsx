import React, {PureComponent, RefObject} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import InputAmountPad from "./InputAmountPad";
import BottomModal from "@common/components/Modal/BottomModal";
import InvestTokenState from "../InvestTokenState";
import ViewUtils from "@common/utils/ViewUtils";
import NumberPadLabel from "@common/components/Input/InputNumber/NumberPadLabel";

interface Props {
    tokenState: InvestTokenState,
}

@observer
export default class InputAmount extends PureComponent<Props> {

    modalRef: RefObject<BottomModal>;
    padRef: RefObject<InputAmountPad>;
    height = 386 + ViewUtils.getBottomBtnPaddingBottom();

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
        const {tokenState} = this.props;
        return (
            <View>
                <View style={{width: 180, paddingRight: 12}}>
                    <NumberPadLabel value={tokenState.amount.value}
                                    unit={tokenState.amount.unit}
                                    onPress={this.open}/>
                </View>
                <BottomModal
                    ref={this.modalRef}
                    height={this.height}>
                    <InputAmountPad
                        ref={this.padRef}
                        inputState={tokenState.amount}
                        offeringPrice={tokenState.offeringPrice}
                        onClose={this.close}/>
                </BottomModal>
            </View>
        )
    }
}
