import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Button} from "react-native-elements";
import Dialog from "@common/components/Modal/Dialog";
import BottomModal from "@common/components/Modal/BottomModal";

@observer
export default class Sandbox extends Component {

    @observable showDialog = false;
    @observable showErrorDialog = false;


    sheetRef;

    constructor(props) {
        super(props);
        this.sheetRef = React.createRef();
    }

    render() {
        const contents = (
            <View style={{height: 300, justifyContent: "center", alignItems: "center"}}>
                <Text>Hoge</Text>
            </View>
        );

        return (
            <View style={styles.back}>
                <Button title="showDialog"
                        buttonStyle={styles.btn}
                        onPress={() => this.showDialog = true}
                />
                <Dialog show={this.showDialog}
                        cancelable
                        onPress={() => this.showDialog = false}>
                    {contents}
                </Dialog>

                <Button title="showErrorDialog"
                        buttonStyle={styles.btn}
                        onPress={() => this.showErrorDialog = true}
                />
                <Dialog show={this.showErrorDialog}
                        message={"Error message"}
                        error
                        cancelable
                        onPress={() => this.showErrorDialog = false}/>

                <Button title="showBottom"
                        buttonStyle={styles.btn}
                        onPress={() => this.sheetRef.current.open()}
                />

                <BottomModal ref={this.sheetRef} height={400}>
                    {contents}
                </BottomModal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: "#ccc",
        justifyContent: "center"
    },
    btn: {
        margin: 12
    }
});
