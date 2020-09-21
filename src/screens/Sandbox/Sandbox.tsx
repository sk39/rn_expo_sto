import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Button} from "react-native-elements";
import Dialog from "@common/components/Modal/Dialog";
import BottomModal from "@common/components/Modal/BottomModal";
import Colors from "@constants/Colors";
import Skeleton from "@common/components/PageSupport/Skeleton";
import ViewUtils from "@common/utils/ViewUtils";
import ProcessDialog from "@common/components/Modal/ProcessDialog";
import ConfirmContent from "@common/components/Modal/ProcessDialog/ConfirmContent";
import ProcessDialogState from "@common/components/Modal/ProcessDialog/ProcessDialogState";

@observer
export default class Sandbox extends Component {

    @observable showDialog = false;
    @observable showErrorDialog = false;
    processState: ProcessDialogState = new ProcessDialogState();
    sheetRef;

    constructor(props) {
        super(props);
        this.sheetRef = React.createRef();
    }

    render() {
        const contents = (
            <View style={{width: "100%", padding: 12}}>
                <Text style={{fontSize: 20, fontWeight: "700"}}>Title</Text>
                <Skeleton line={7}/>
            </View>
        );

        return (
            <View style={styles.back}>
                <View style={{padding: 12}}>
                    <Button title="Dialog"
                            raised
                            onPress={() => this.showDialog = true}
                    />
                    <Dialog show={this.showDialog}
                            cancelable
                            onPress={() => this.showDialog = false}>
                        {contents}
                    </Dialog>
                </View>
                <View style={{padding: 12}}>
                    <Button title="Dialog (Error)"
                            raised
                            buttonStyle={{backgroundColor: Colors.negative}}
                            onPress={() => this.showErrorDialog = true}
                    />
                    <Dialog show={this.showErrorDialog}
                            message={"Error message"}
                            error
                            cancelable
                            onPress={() => this.showErrorDialog = false}/>
                </View>
                <View style={{padding: 12}}>
                    <Button title="Bottom Modal"
                            raised
                            buttonStyle={{backgroundColor: Colors.toolBarInverse}}
                            onPress={() => this.sheetRef.current.open()}
                    />

                    <BottomModal ref={this.sheetRef} height={300}>
                        {contents}
                    </BottomModal>
                </View>
                <View style={{padding: 12}}>
                    <Button title="Process Dialog"
                            raised
                            buttonStyle={{backgroundColor: Colors.primary}}
                            onPress={() => this.processState.confirm()}
                    />

                    <ProcessDialog onClose={() => this.processState.clear()}
                                   model={this.processState}
                                   renderConfirm={() => {
                                       return (
                                           <ConfirmContent
                                               onPress={async () => {
                                                   this.processState.startProcessing()
                                                   await ViewUtils.sleep(2000)
                                                   this.processState.success("Test Finish!")
                                               }}
                                               onCancel={() => this.processState.clear()}>
                                               <View style={{width: "100%"}}>
                                                   {contents}
                                                   <View style={{
                                                       alignItems: "center",
                                                       paddingBottom: 12,
                                                   }}>
                                                       <Button title="Processing 20 sec"
                                                               type="clear"
                                                               onPress={async () => {
                                                                   this.processState.startProcessing()
                                                                   await ViewUtils.sleep(20000)
                                                                   this.processState.success("Test Finish!")
                                                               }}
                                                       />
                                                       <Button title="Error"
                                                               type="clear"
                                                               onPress={async () => {
                                                                   this.processState.startProcessing()
                                                                   await ViewUtils.sleep(2000)
                                                                   this.processState.error("Test Error!")
                                                               }}
                                                       />
                                                   </View>
                                               </View>
                                           </ConfirmContent>
                                       )
                                   }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
        justifyContent: "center"
    }
});
