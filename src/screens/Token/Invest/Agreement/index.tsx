import React, {PureComponent, RefObject} from "react";
import {StyleSheet, Text, View} from "react-native";
import {observer} from "mobx-react";
import BottomModal from "@common/components/Modal/BottomModal";
import InvestTokenState from "../InvestTokenState";
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";
import AgreeProspectus from "./AgreeProspectus";

interface Props {
    tokenState: InvestTokenState,
}

@observer
export default class Agreement extends PureComponent<Props> {

    modalRef: RefObject<BottomModal>;

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        // this.padRef = React.createRef();
    }

    open = () => {
        this.modalRef.current.open();
        // setTimeout(() => this.padRef.current.onOpen(), 0)
    }

    close = () => {
        this.modalRef.current.close();
    }

    render() {
        const {tokenState} = this.props;
        const color = tokenState.agreed ? Colors.positiveLight : Colors.negative;
        const text = tokenState.agreed ? "OK" : "Check";
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.explanation}>
                        Check the prospectus and agree to the content.
                    </Text>
                    <Button title={text}
                            type="clear"
                            buttonStyle={styles.btn}
                            titleStyle={[styles.text, {color}]}
                            onPress={this.open}
                    />
                </View>
                <BottomModal
                    cancelable={false}
                    ref={this.modalRef}
                    height={Layout.window.height - 108}>
                    <AgreeProspectus tokenState={tokenState} onClose={this.close}/>
                </BottomModal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        backgroundColor: "#313147",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 2,
        paddingVertical: 8,
    },
    explanation: {
        color: "white",
        fontSize: 14,
        flexWrap: "wrap",
        flex: 1,
        paddingRight: 12,
    },
    btnWrapper: {
        borderRadius: 0,
    },
    btn: {
        width: 94,
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1
    }
});
