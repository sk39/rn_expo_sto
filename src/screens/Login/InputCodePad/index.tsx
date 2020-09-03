import React, {PureComponent} from "react";
import {View} from "react-native";
import {observer} from "mobx-react";
import InputNumberState from "@common/components/Input/InputNumberState";
import {observable} from "mobx";
import CodePadLabel from "./CodePadLabel";
import CodePad from "./CodePad";

interface Props {
    inputState: InputNumberState,
}

@observer
export default class InputNumberPad extends PureComponent<Props> {

    @observable showPad = false;

    show = () => {
        this.showPad = true;
    }

    hide = () => {
        this.showPad = false;
    }

    render() {
        const {inputState} = this.props;
        return (
            <View>
                <View style={{width: 240, paddingTop: 8}}>
                    <CodePadLabel value={inputState.value}
                                  onPress={this.show}/>
                </View>
                <CodePad inputState={inputState}
                         show={this.showPad}
                         onClose={this.hide}/>
            </View>
        )
    }
}
