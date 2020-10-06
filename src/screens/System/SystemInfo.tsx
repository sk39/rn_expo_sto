import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from "react-native";
import Colors from "@constants/Colors";
import PageHeader from "@common/components/PageSupport/PageHeader";
import Layout from "@constants/Layout";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {If} from "@common/components/PageSupport/If";
import Logo from "@common/components/Image/Logo";
import ShareHelper from "@common/plugins/ShareHelper";
import {Button, Icon} from "react-native-elements";
import MyScrollView from "@common/components/PageSupport/MyScrollView";

const {name, sdkVersion, version, releaseChannel} = Constants.manifest;
const isExpoClient = Constants.appOwnership === "expo";
export default class SystemInfo extends Component<NavigationProps> {

    info = {
        app: {
            name,
            sdkVersion,
            version,
            releaseChannel: releaseChannel || "Default",
            ownership: Constants.appOwnership,
            isExpoClient,
            expoVersion: isExpoClient ? Constants.expoVersion : ""
        },
        device: {
            id: Constants.installationId,
            os: `${Device.osName} ${Device.osVersion}`,
            model: Device.modelName,
            size: `${Layout.window.width.toFixed(0)} x ${Layout.window.height.toFixed(0)}`,
            apiLevel: Device.platformApiLevel
        },
    }

    share = () => {
        ShareHelper.share("System info", this.info)
    }

    render() {
        const {app, device} = this.info;
        return (
            <View style={styles.back}>
                <PageHeader title={t("navigation.menu.SystemInfo")}
                            navigation={this.props.navigation}>
                    <Button icon={<Icon name="share-2" type="feather"/>}
                            onPress={this.share}
                            type="clear"/>
                </PageHeader>
                <MyScrollView>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Logo/>
                        <View>
                            <Text style={{fontSize: 18, marginLeft: 8}}>{app.name}</Text>
                            <Text style={{
                                fontWeight: "700",
                                fontSize: 16,
                                marginTop: 4,
                                marginLeft: 8,
                                color: Colors.primary
                            }}>
                                v{app.version}
                            </Text>
                        </View>
                    </View>
                    <Area title="App">
                        <Row title="SDK" value={app.sdkVersion}/>
                        <Row title="Release Channel" value={app.releaseChannel}/>
                        <Row title="Ownership" value={app.ownership}/>
                        <If test={app.isExpoClient}>
                            <Row title="Expo Client Version" value={app.expoVersion}/>
                        </If>
                    </Area>
                    <Area title="Device">
                        <Row title="ID" value={device.id}/>
                        <Row title="OS" value={device.os}/>
                        <Row title="Model" value={device.model}/>
                        <Row title="Size" value={device.size}/>
                        <If test={Platform.OS === "android"}>
                            <Row title="API Level" value={device.apiLevel}/>
                        </If>
                    </Area>
                </MyScrollView>
            </View>
        );
    }
}

function Area({title, children}) {
    return (
        <View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.areaBody}>
                {children}
            </View>
        </View>
    )
}


function Row({title, value}) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
    },
    areaBody: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder
    },
    titleWrapper: {
        padding: 8,
        paddingLeft: 12,
        backgroundColor: Colors.back3
    },
    title: {
        fontWeight: "700",
        color: Colors.labelFont
    },
    label: {
        color: Colors.labelFont
    },
    value: {
        flex: 1,
        paddingLeft: 24,
        textAlign: "right"
    }
});
