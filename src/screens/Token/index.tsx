import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import List from './List/List';
import Colors from "@constants/Colors";
import {TabBarIcon} from "@common/components/ScreenIcon";
import TokenState from "./TokenState";
import {inject, observer} from "mobx-react";
import {Host} from "react-native-portalize";

@inject("rootStore")
@observer
export default class Tokens extends Component<any, any> {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            tabBarVisible: state.params ? state.params.tabBarVisible : true,
            tabBarLabel: t("navigation.tab.Tokens"),
            tabBarIcon: ({focused}) => (
                <TabBarIcon screenName="Tokens" focused={focused}/>
            )
        }
    }

    tokenState: TokenState;

    constructor(props) {
        super(props);
        this.tokenState = new TokenState(props.navigation, props.rootStore)
        this.tokenState.loadData(true)
    }

    render() {
        return (
            <Host>
                <View style={styles.container}>
                    <List tokenState={this.tokenState}/>
                </View>
            </Host>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.toolBarInverse
    },
});
