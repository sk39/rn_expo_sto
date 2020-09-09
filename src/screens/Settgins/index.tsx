import React, {Component} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {inject, observer} from "mobx-react";
import {Container, Toast} from 'native-base';
import Colors from "@constants/Colors";
import {RootStoreProps} from "@store/RootStoreProvider";
import PageHeader from "@common/components/PageSupport/PageHeader";
import {Button} from "react-native-elements";
import {observable} from "mobx";
import {CacheManager} from "react-native-expo-image-cache";

@inject('rootStore')
@observer
export default class Settings extends Component<NavigationProps & RootStoreProps> {

    @observable processing = "";

    changeEnableBiometric = async (val) => {
        const {settings} = this.props.rootStore;
        settings.enableLocalAuth = val
        await settings.saveStorage();
    }

    async exec(processName: string, process: () => Promise<any>) {
        try {
            this.processing = processName;
            await process();
            Toast.show({
                text: t(`screen.settings.${processName}.message.success`),
                buttonText: t("btn.close"),
                duration: 2000,
                type: "success"
            })
        } catch (e) {
            Toast.show({
                text: t(`screen.settings.${processName}.message.error`),
                buttonText: t("btn.close"),
                duration: 2000,
                type: "danger"
            })
        } finally {
            this.processing = "";
        }
    }

    clearImageCache = async () => {
        await CacheManager.clearCache();
    }


    clearSTOCache = () => {
        const {rootStore} = this.props;
        this.exec("clearSto", async () => {
            await this.clearImageCache();
            await rootStore.sto.clear();
        })
    }

    clear = () => {
        const {rootStore} = this.props;
        this.exec("initialize", async () => {
            await this.clearImageCache();
            await rootStore.clear();
        })
    }

    render() {
        const {settings} = this.props.rootStore;
        return (
            <Container style={styles.container}>
                <PageHeader title={t("screen.settings.pageTitle")} navigation={this.props.navigation}/>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{t("screen.settings.biometric.title")}</Text>
                            <Text style={styles.subTitle}>{t("screen.settings.biometric.subTitle")}</Text>
                        </View>
                        <Switch value={settings.enableLocalAuth}
                                onValueChange={this.changeEnableBiometric}/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{t("screen.settings.clearSto.title")}</Text>
                            <Text style={styles.subTitle}>{t("screen.settings.clearSto.subTitle")}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Button title={t("screen.settings.clearSto.done")}
                                loading={this.processing === "clearSto"}
                                buttonStyle={styles.btn}
                                raised
                                onPress={this.clearSTOCache}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{t("screen.settings.initialize.title")}</Text>
                            <Text style={styles.subTitle}>{t("screen.settings.initialize.subTitle")}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Button title={t("screen.settings.initialize.done")}
                                loading={this.processing === "initialize"}
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
        backgroundColor: Colors.back2,
    },
    row: {
        backgroundColor: Colors.back,
        marginTop: 16,
    },
    header: {
        padding: 12,
        paddingHorizontal: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    btn: {
        width: 120,
        backgroundColor: Colors.btnPrimary
    },
    initBtn: {
        width: 120,
        backgroundColor: Colors.error
    },
    initBtnText: {
        color: "white"
    },
});


