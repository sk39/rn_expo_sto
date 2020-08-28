import React, {Component} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, Toast} from 'native-base';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import PageHeader from "@common/components/PageHeader";
import {Button} from "react-native-elements";
import {observable} from "mobx";
import ViewUtils from "@common/utils/ViewUtils";

@inject('rootStore')
@observer
export default class Settings extends Component<NavigationProps & RootStoreProps> {

    @observable initializing = false;

    constructor(props) {
        super(props);
        this.changeEnableBiometric = this.changeEnableBiometric.bind(this)
        this.clear = this.clear.bind(this)
    }

    async changeEnableBiometric(val) {
        const {settings} = this.props.rootStore;
        settings.enableLocalAuth = val
        await settings.saveStorage();
    }

    toast(type: string, msg: string) {

    }

    async clear() {
        const {rootStore} = this.props;
        try {
            this.initializing = true;
            await rootStore.clear();
            Toast.show({
                text: "Initialization has completed!",
                buttonText: "Okay",
                duration: 2000,
                type: "success"
            })
        } catch (e) {
            Toast.show({
                text: "Failed Initialize!",
                buttonText: "Okay",
                duration: 2000,
                type: "danger"
            })
        } finally {
            this.initializing = false;
        }
    }

    render() {
        const {settings} = this.props.rootStore;
        return (
            <Container style={styles.container}>
                <View style={styles.statusBar}/>
                {/*<StatusBar barStyle="light-content" translucent backgroundColor={Colors.toolBarInverse}/>*/}
                <PageHeader title="Settings"/>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>Enable Biometric</Text>
                            <Text style={styles.subTitle}>
                                FaceID and TouchID (iOS) or the Biometric Prompt (Android)
                            </Text>
                        </View>
                        <Switch value={settings.enableLocalAuth}
                                onValueChange={this.changeEnableBiometric}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>Initialize</Text>
                            <Text style={styles.subTitle}>Initialize all settings. Remove all storage app data.</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Button title='Initialize'
                                loading={this.initializing}
                                buttonStyle={styles.initBtn}
                                raised
                                onPress={this.clear}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColorThin2,
    },
    row: {
        backgroundColor: Colors.backColor,
        marginTop: 16,
    },
    header: {
        padding: 12,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    body: {
        padding: 16,
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700"
    },
    subTitle: {
        marginTop: 6,
        fontSize: 12,
    },
    switchWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    switchLabel: {
        color: Colors.labelFont,
        fontSize: 16,
        fontWeight: "700",
        marginRight: 24,
    },
    initBtn: {
        width: 140,
        backgroundColor: Colors.error
    },
    initBtnText: {
        color: "white"
    },
    statusBar: {
        height: 24,
        backgroundColor: ViewUtils.isIphoneX() ? Colors.toolBar : Colors.toolBarInverse,
    },
});


