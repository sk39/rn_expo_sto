import React, {Component} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {SharedElementRenderer} from './animations';
import List from './List/List';
import Detail from './Detail/Detail';
import ToolbarBackground from './Detail/ToolbarBackground';
import Colors from "@constants/Colors";
import {TabBarIcon} from "@common/components/ScreenIcon";


export default class Index extends Component<any, any> {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            tabBarVisible: state.params ? state.params.tabBarVisible : true,
            tabBarLabel: "Tokens",
            tabBarIcon: ({focused}) => (
                <TabBarIcon screenName="Tokens" focused={focused}/>
            )
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            tabBarVisible: true,
            selectedItem: null,
            // phase of animation
            // phase-0:
            // default
            //
            // phase-1:
            // hide list toolbar, hide list bottom bar, show toolbar background and move item
            //
            // phase-2:
            // show detail toolbar, show detail bottom bar, show details of item
            //
            // phase-3
            // hide details of item
            //
            // phase-4
            // hide detail toolbar, hide detail bootom bar, move item back to scrool view
            phase: 'phase-0',
        };
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
        const {selectedItem, position, detailItem, phase} = this.state;

        return (
            <View style={{flex: 1}}>
                <List
                    selectedItem={selectedItem}
                    onItemPress={this.onItemPressed}
                    phase={phase}
                />
                <Detail
                    phase={phase}
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
            goToDetail,
            position,
            detailItem,
            goBackRequested,
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
