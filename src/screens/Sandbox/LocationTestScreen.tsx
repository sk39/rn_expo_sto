import React, {Component} from 'react';
import {Platform, StyleSheet, Text} from "react-native"
import {View} from "native-base";
import {observer} from "mobx-react";
import {observable} from "mobx";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ViewUtils from "@common/utils/ViewUtils";
import {Constants} from "expo-constants";

@observer
export default class LocationTestScreen extends Component<NavigationProps> {

    @observable location: any = null;
    @observable errorMessage: string = "";

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.location = null;
                this.errorMessage = null;
                // @ts-ignore
                if (Platform.OS === 'android' && Constants && !Constants.isDevice) {
                    this.errorMessage = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!';
                } else {
                    this.getLocationAsync().then();
                }
            }
        );
    }

    async getLocationAsync() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.errorMessage = 'Permission to access location was denied';
        }

        this.location = await Location.getCurrentPositionAsync({
            timeout: 20000
        });
    };

    render() {
        let text = 'Waiting..';
        let style: any = styles.paragraph;
        if (this.errorMessage) {
            text = this.errorMessage;
        } else if (this.location) {
            text = JSON.stringify(this.location, null, "  ");
            style = styles.paragraph2;
        }

        return (
            <View style={styles.container}>
                <Text style={style}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: ViewUtils.getStatusBarHeight(),
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    paragraph2: {
        margin: 12,
        marginHorizontal: 0,
        fontSize: 14,
        textAlign: 'left',
    },
});
