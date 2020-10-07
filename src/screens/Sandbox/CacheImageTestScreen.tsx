import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from "react-native"
import {observer} from "mobx-react";
import ViewUtils from "@common/utils/ViewUtils";
import {action, observable, runInAction} from "mobx";
import {Button} from "react-native-elements";
import {CacheImage, ImageStore} from "@sk39/expo-image-cache";
import Colors from "@constants/Colors";
import {If} from "@common/components/PageSupport/If";

@observer
export default class CacheImageTestScreen extends Component<NavigationProps> {

    index: number = 1;
    @observable clearing: boolean = false;
    @observable loadCount: number = 0;
    @observable uri1: string = null;
    @observable uri2: string = null;
    @observable uriInvalid: string = null;

    @action
    clear = async () => {
        this.uri1 = null;
        this.uri2 = null;
        this.uriInvalid = null;
        this.clearing = true;
        await ImageStore.getInstance().clear()
        this.clearing = false;
    }

    @action
    set = () => {
        this.uri1 = null;
        this.uri2 = null;
        this.uriInvalid = null;
        this.loadCount = 6;
        setTimeout(() => {
            runInAction(() => {
                this.uri1 = `https://picsum.photos/510/300?random&d=${++this.index}`;
                this.uri2 = `https://picsum.photos/510/300?random&d=${++this.index}`;
                this.uriInvalid = `https://dummy.url/&d=${++this.index}`;
            })
        }, 100)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <If test={Platform.OS !== "ios" || !s.isBlank(this.uri1)}>
                        <View style={{width: 100, height: 60, margin: 8}}>
                            <CacheImage source={{uri: this.uri1}}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        <View style={{width: 200, height: 120, margin: 8}}>
                            <CacheImage source={{uri: this.uri1}}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        <View style={{width: 300, height: 100, margin: 8}}>
                            <CacheImage source={{uri: this.uri1}}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        <View style={{width: 100, height: 60, margin: 8}}>
                            <CacheImage source={{uri: this.uri2}}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        <View style={{width: 200, height: 120, margin: 8}}>
                            <CacheImage source={{uri: this.uri2}}
                                        backgroundColor={Colors.second}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        <View style={{width: 300, height: 100, margin: 8}}>
                            <CacheImage source={{uri: this.uri2}}
                                        onLoaded={() => this.loadCount--}/>
                        </View>
                        {/*<View style={{width: 300, height: 100, margin: 8}}>*/}
                        {/*    <CacheImage source={{uri: this.uriInvalid}}*/}
                        {/*                onError={() => console.log("onError")}/>*/}
                        {/*</View>*/}
                    </If>
                </View>
                <View style={{alignItems: "center"}}>
                    <Text>{`Loading count=${this.loadCount}`}</Text>
                </View>
                <View style={styles.footer}>
                    <Button title="Clear"
                            raised
                            containerStyle={styles.btn}
                            loading={this.clearing}
                            onPress={this.clear}
                    />
                    <Button title="Set"
                            raised
                            containerStyle={styles.btn}
                            loading={this.loadCount > 0}
                            onPress={this.set}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: ViewUtils.getStatusBarHeight(),
        backgroundColor: Colors.back
    },
    body: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flexDirection: "row",
        justifyContent: 'center',
        paddingVertical: 16,
        width: "100%"
    },
    btn: {
        width: 150,
        marginHorizontal: 10
    },
});
