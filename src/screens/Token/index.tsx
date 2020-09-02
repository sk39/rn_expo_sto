import React, {Component} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {SharedElementRenderer} from './animations';
import List from './List/List';
import Detail from './Detail/Detail';
import ToolbarBackground from './Detail/ToolbarBackground';
import Colors from "@constants/Colors";
import {TabBarIcon} from "@common/components/ScreenIcon";
import TokenState from "./TokenState";
import {inject, observer} from "mobx-react";

@inject("rootStore")
@observer
export default class Index extends Component<any, any> {

    tokenState: TokenState;

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

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            phase: 'phase-0',
        };
        this.tokenState = new TokenState(props.navigation, props.rootStore)
        this.tokenState.loadData(true)
    }

    onItemPressed = item => {
        this.setState({
            phase: 'phase-1',
            selectedItem: item,
        });
        this.props.navigation.setParams({tabBarVisible: false});
    };

    onBackPressed = () => {
        this.setState({
            phase: 'phase-3',
        });
        this.props.navigation.setParams({tabBarVisible: true});
    };

    onSharedElementMovedToDestination = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                phase: 'phase-2',
            });
        });
    };

    onSharedElementMovedToSource = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                selectedItem: null,
                phase: 'phase-0',
            });
        });
    };

    renderPage() {
        const {selectedItem, phase} = this.state;

        return (
            <View style={{flex: 1}}>
                <List
                    tokenState={this.tokenState}
                    selectedItem={selectedItem}
                    onItemPress={this.onItemPressed}
                    phase={phase}
                />
                <Detail
                    tokenState={this.tokenState}
                    phase={phase}
                    navigation={this.props.navigation}
                    selectedItem={selectedItem}
                    onBackPress={this.onBackPressed}
                    onSharedElementMovedToDestination={
                        this.onSharedElementMovedToDestination
                    }
                    onSharedElementMovedToSource={this.onSharedElementMovedToSource}
                />
            </View>
        );
    }

    render() {
        const {
            selectedItem,
            phase,
        } = this.state;

        return (
            <SharedElementRenderer>
                <View style={styles.container}>
                    <ToolbarBackground
                        color={selectedItem ? (selectedItem.backgroundColor || selectedItem.color) : "#f00"}
                        isHidden={phase !== 'phase-1' && phase !== 'phase-2'}
                    />
                    {this.renderPage()}
                </View>
            </SharedElementRenderer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
});
