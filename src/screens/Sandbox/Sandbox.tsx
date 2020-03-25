import React, {Component} from 'react';
import {Text} from "react-native"
import {Button, View} from "native-base";
import ProcessDialogState from "@common/components/ProcessDialog/ProcessDialogState";
import ProcessAnimation from "@common/components/ProcessDialog/ProcessAnimation";
import {observer} from "mobx-react";

@observer
export default class Sandbox extends Component {

    processState: ProcessDialogState = new ProcessDialogState();

    onAnimationFinish() {
        console.log("Sandbox#onAnimationFinish");
    }

    render() {
        const {processState} = this;
        return (
            <View style={{flex: 1, paddingTop: 44}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ProcessAnimation
                        processing={processState.processing}
                        finish={processState.isFinish}
                        error={processState.isError}
                        onAnimationFinish={this.onAnimationFinish.bind(this)}
                    />
                </View>
                <View style={{padding: 32}}>
                    <Button block light onPress={() => {
                        processState.clear();
                        setTimeout(() => processState.startProcessing(), 0)
                    }}>
                        <Text>Start Loading</Text>
                    </Button>
                    <View style={{marginBottom: 16}}/>
                    <Button block light onPress={() => processState.success()}>
                        <Text>Finish !</Text>
                    </Button>
                    <View style={{marginBottom: 16}}/>
                    <Button block light onPress={() => processState.error("Dummy error message.")}>
                        <Text>Error</Text>
                    </Button>
                </View>

            </View>
        );
    }
}
