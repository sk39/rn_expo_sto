import React, {PureComponent} from "react";
import {Easing, Modal, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";
import {observer} from "mobx-react";
import AnimatedRow from "@common/components/Animations/AnimatedRow";


interface Props {
    show: boolean;
    onClose?: () => void;
    slideUpDuration?: number;
    slideUpDistance?: number;
    containerStyle?: StyleProp<ViewStyle>;
}

@observer
export default class BottomModal extends PureComponent<Props> {

    static defaultProps = {
        slideUpDuration: 240,
        slideUpDistance: 300,
    };

    onClose = () => {
        const {onClose} = this.props;
        if (onClose) {
            onClose();
        }
    }

    render() {
        const {show, onClose, slideUpDuration, slideUpDistance, containerStyle} = this.props;
        return (
            <Modal transparent
                   animationType="fade"
                   visible={show}
                   onRequestClose={onClose}>
                <View style={styles.root}>
                    <TouchableOpacity style={styles.disablesLayer} onPress={onClose}/>
                    <View style={{width: "100%"}}>
                        <AnimatedRow delay={0}
                                     duration={slideUpDuration}
                                     easing={Easing.ease}
                                     moveDistance={slideUpDistance}>
                            <View style={[styles.container, containerStyle]}>
                                {this.props.children}
                            </View>
                        </AnimatedRow>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    disablesLayer: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.65)"
    },
    container: {
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});
