import React, {Component} from 'react';
import {View} from "react-native"
import ProcessAnimation from "@common/components/Modal/ProcessDialog/ProcessAnimation";
import ProcessDialogState from "@common/components/Modal/ProcessDialog/ProcessDialogState";
import {observer} from "mobx-react";
import {Button} from "react-native-elements";

@observer
export default class ProcessAnimationExample extends Component {

    processState: ProcessDialogState = new ProcessDialogState();

    onAnimationFinish = () => {
    }

    render() {
        const {processState} = this;
        return (
            <View style={{flex: 1, paddingTop: 44}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ProcessAnimation
                        state={processState.state}
                        onAnimationFinish={this.onAnimationFinish}
                    />
                </View>
                <View style={{padding: 32}}>
                    <Button title="Start Loading"
                            raised
                            onPress={() => {
                                processState.clear();
                                setTimeout(() => processState.startProcessing(), 0)
                            }}/>
                    <View style={{marginBottom: 16}}/>
                    <Button title="Finish !"
                            raised
                            onPress={() => processState.success()}/>
                    <View style={{marginBottom: 16}}/>
                    <Button title="Error !"
                            raised
                            onPress={() => processState.error("Dummy error message.")}/>
                </View>

            </View>
        );
    }
}
