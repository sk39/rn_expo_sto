import React, {FC} from 'react'
import {StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import Colors from "@constants/Colors";

interface Props {
    title: string
    onPress: () => void;
}

const ModalFooterBtn: FC<Props> = ({title, onPress}) => {
    return (
        <Button title={title}
                containerStyle={{borderRadius: 0}}
                buttonStyle={styles.btn}
                onPress={onPress}/>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomStartRadius: 10,
        backgroundColor: Colors.btn,
        height: 44,
    },
});

export default ModalFooterBtn;
