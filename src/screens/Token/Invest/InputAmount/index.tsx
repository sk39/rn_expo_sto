import React, {PureComponent, RefObject} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import InputAmountPad from "./InputAmountPad";
import BottomModal from "@common/components/Modal/BottomModal";
import InvestTokenState from "../InvestTokenState";
import InputAmountLabel from "./InputAmountLabel";
import ViewUtils from "@common/utils/ViewUtils";

interface Props {
    tokenState: InvestTokenState,
}

@observer
export default class InputAmount extends PureComponent<Props> {

    modalRef: RefObject<BottomModal>;
    padRef: RefObject<InputAmountPad>;
    height = 416 + ViewUtils.getBottomBtnPaddingBottom();

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
                <View style={{width: 240, paddingTop: 8}}>
                    <InputAmountLabel value={tokenState.amount.value}
                                      unit={tokenState.amount.unit}
                                      offeringPrice={tokenState.offeringPrice}
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
