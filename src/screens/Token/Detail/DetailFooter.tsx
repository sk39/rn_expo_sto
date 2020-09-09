import React, {PureComponent} from 'react';
import {BackHandler, StyleSheet} from 'react-native'
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {STO} from "@common/model/domainModel";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import {computed, observable} from "mobx";
import TokenState from "../TokenState";

interface Props {
    selectedItem: STO;
    tokenState: TokenState;
    onBackPress?: () => void;
    hardwareBackPress?: boolean;
}

@observer
export default class DetailFooter extends PureComponent<Props> {

    @observable isWaitSignIn = false;
    ignoreHardwareBackPress = false;

    @computed
    get loggedIn() {
        const {tokenState} = this.props;
        return tokenState.loggedIn;
    }

    componentDidMount() {
        const {navigation, selectedItem} = this.props.tokenState;
        navigation.addListener(
            'didFocus',
            () => {
                if (this.loggedIn && this.isWaitSignIn && selectedItem) {
                    this.startInvest();
                }
                this.isWaitSignIn = false;
                this.ignoreHardwareBackPress = false;
            }
        );

        if (this.props.hardwareBackPress) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (this.props.hardwareBackPress) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        }
    }

    onBackPress = () => {
        const {onBackPress} = this.props;
        if (!onBackPress || this.ignoreHardwareBackPress) {
            return false;
        }

        onBackPress();
        return true;
    }

    startInvest = () => {
        const {navigation} = this.props.tokenState;
        this.ignoreHardwareBackPress = true;
        if (!this.loggedIn) {
            this.isWaitSignIn = true;
            navigation.navigate("Login");
            return;
        }

        const {selectedItem} = this.props;
        navigation.navigate("InvestToken", {symbol: selectedItem.symbol})
    }

    render() {
        const {selectedItem} = this.props;
        if (!selectedItem) {
            return null;
        }

        return (
            <PageBottomBtn
                onPress={this.startInvest}
                text={this.loggedIn ? "Invest" : "Sign In & Invest"}
                animation
                animationDelay={200}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1
    },
    titleContainer: {
        flex: 1,
    },
    itemContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: "row"
    },
    titleText: {
        color: '#f1f1f1',
    },
    amountText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#f1f1f1',
    },
    vatText: {
        fontSize: 10,
        color: 'gray',
    },
    descriptionDetail: {
        color: Colors.labelFont,
        fontSize: 14,
        lineHeight: 22
    },
    areaCard: {
        padding: 12,
        paddingTop: 6,
    },
    headerText: {
        fontSize: 20,
        color: Colors.primaryDark,
        opacity: 0.5,
        fontWeight: "700",
        letterSpacing: 2,
    }
});
