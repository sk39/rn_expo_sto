import React, {PureComponent} from 'react';
import {BackHandler} from 'react-native'
import {observer} from "mobx-react";
import PageBottomBtn from "@common/components/PageSupport/PageBottomBtn";
import {computed, observable} from "mobx";
import TokenState from "../TokenState";
import StoVM from "@common/model/StoVM";

interface Props {
    item: StoVM;
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

        const {item} = this.props;
        navigation.navigate("InvestToken", {symbol: item.symbol})
    }

    render() {
        const {item} = this.props;
        if (!item) {
            return null;
        }

        return (
            <PageBottomBtn
                onPress={this.startInvest}
                text={this.loggedIn ? "Invest" : "Sign In & Invest"}
                hidden={!item.canInvest}
                animation
                animationDelay={200}
            />
        );
    }
}
