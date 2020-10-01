import React, {Component} from 'react';
import {StyleSheet, Text, View, YellowBox} from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx";
import Colors from "@constants/Colors";
import Input from "@common/components/Input/Input";
import InputState from "@common/components/Input/InputState";
import {Button, Icon} from "react-native-elements";
import PageHeader from "@common/components/PageSupport/PageHeader";
import SimpleList from "@common/components/List/SimpleList";
import TokenState from "../../Token/TokenState";
import Firestore from "@common/plugins/firebase/Firestore";
import ListPageSupport from "@common/components/PageSupport/ListPageSupport";
import CashImage from "@common/components/Image/CashImage";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import Avatar from "@common/components/Image/Avatar";
import RootStoreProvider from "@store/RootStoreProvider";
import {If} from "@common/components/PageSupport/If";
import firebase from "firebase";
import moment from "moment";
import Format from "@constants/Format";
import MyScrollView from "@common/components/PageSupport/MyScrollView";

YellowBox.ignoreWarnings(['Setting a timer']);

@observer
export default class STOComment extends Component<NavigationProps> {

    username: string;
    symbol: string;
    unsubscribe;
    tokenState: TokenState;
    newComment = new InputState;
    @observable errorMessage;
    @observable comments = [];
    @observable loading = false;
    @observable adding = false;

    constructor(props) {
        super(props);
        this.tokenState = this.props.navigation.state.params.tokenState;
        this.symbol = this.tokenState.selectedItem.symbol;
        this.username = RootStoreProvider.rootStore.auth.shortName || "";
        if (!Firestore.enable) {
            this.errorMessage = "Firestore is not available."
            return;
        }

        this.subscribe();
    }

    componentWillUnmount(): void {
        if (this.unsubscribe)
            this.unsubscribe();
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    docRef() {
        const db = Firestore.db();
        return db.collection(`stos/${this.symbol}/comments`)
    }

    subscribe() {
        this.loading = true;
        try {
            this.unsubscribe = this.docRef().onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => doc.data())
                this.comments = _.orderBy(list, item => {
                    return item.timestamp ? item.timestamp.toDate() : null
                }, "desc");
                this.loading = false;
            })
        } catch (e) {
            console.warn(e)
            this.errorMessage = "Firestore is not available."
            this.loading = false;
        }
    }

    add = async () => {
        try {
            this.adding = true;
            const ref = this.docRef();
            await ref.add({
                user: this.username,
                comment: this.newComment.value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            this.newComment.setValue("");
        } catch (e) {
            console.warn(e);
        } finally {
            this.adding = false;
        }
    }

    renderItem({item}) {
        if (item.timestamp == null) {
            return null;
        }
        return (
            <View key={item.timestamp} style={styles.row}>
                <Avatar title={item.user} size={50}/>
                <View style={styles.innerRow}>
                    <Text style={styles.time}>
                        {moment(item.timestamp.toDate()).format(Format.datetimeFormat)}
                    </Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                </View>
            </View>
        )
    }

    render() {
        const item = this.tokenState.selectedItem;
        return (
            <View style={styles.back}>
                <PageHeader title="Comment (beta)" onBackPress={this.onBack}/>
                <View style={styles.header}>
                    <View style={styles.image}>
                        <CashImage source={item.imageSource}/>
                    </View>
                    <View style={styles.overlay}/>
                    <View style={styles.tokenNameWrapper}>
                        <Text style={styles.tokenName}>{item.name}</Text>
                    </View>
                </View>
                <If test={this.username.length > 0}>
                    <View style={styles.inputArea}>
                        <View style={{flex: 1}}>
                            <Input inputState={this.newComment}
                                   placeholder="New Comment"
                            />
                        </View>
                        <Button buttonStyle={styles.btn}
                                titleStyle={styles.btnText}
                                disabled={this.newComment.value.length === 0}
                                loading={this.adding}
                                icon={<Icon type="feather" name="send"/>}
                                onPress={this.add}
                        />
                    </View>
                </If>
                <MyScrollView>
                    <SimpleList
                        data={this.comments}
                        renderItem={this.renderItem}/>
                </MyScrollView>
                <ListPageSupport
                    processing={this.loading}
                    list={this.comments}
                    errorMessage={this.errorMessage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        flex: 1,
        backgroundColor: Colors.back,
        justifyContent: "flex-start",
    },
    btn: {
        marginHorizontal: 4,
        backgroundColor: Colors.primaryLight
    },
    btnText: {},
    header: {
        borderBottomWidth: 1,
        backgroundColor: Colors.back3,
        borderBottomColor: Colors.listBorder,
        height: 80,
        justifyContent: "center"
    },
    inputArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 8,
        paddingTop: 10,
        paddingBottom: 16,
        borderBottomColor: Colors.listBorder,
        borderBottomWidth: 1,
        backgroundColor: "white",
        ...getPlatformElevation(2)
    },
    tokenNameWrapper: {
        padding: 6
    },
    image: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    tokenName: {
        color: "white",
        fontSize: 18,
        marginLeft: 12
    },
    row: {
        padding: 16,
        borderBottomColor: Colors.listBorder,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    innerRow: {
        paddingLeft: 16
    },
    time: {
        color: Colors.labelFontThin,
        fontSize: 12,
        marginBottom: 2,
    },
    comment: {
        color: Colors.font,
        fontSize: 16
    }
});
