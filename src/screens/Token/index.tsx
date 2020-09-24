import React, {Component, RefObject} from 'react';
import {StyleSheet, View} from 'react-native';
import List from './List/List';
import Colors from "@constants/Colors";
import {TabBarIcon} from "@common/components/ScreenIcon";
import {inject, observer} from "mobx-react";
import {Tab, Tabs} from "native-base";
import {RootStoreProps} from "@store/RootStoreProvider";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import PageHeader from "@common/components/PageSupport/PageHeader";

@inject("rootStore")
@observer
export default class Tokens extends Component<NavigationProps & RootStoreProps> {

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

    static status = ["offering", "waiting", "closed", "all"]
    tabRefs: RefObject<List>[];

    constructor(props) {
        super(props);
        this.tabRefs = Tokens.status.map(() => React.createRef());
    }

    componentDidMount() {
        this.props.rootStore.sto.loadData(true)
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.props.rootStore.sto.loadData(true)
            }
        );
    }

    onChangeTab = ev => {
        const beforeTab = this.tabRefs[ev.from];
        if (beforeTab.current) {
            beforeTab.current.resetScroll(false);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <PageHeader title="Browse Security Tokens"
                            navigation={this.props.navigation}
                            noShadow
                            dense/>
                <Tabs
                    tabContainerStyle={styles.tabContainerStyle}
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    onChangeTab={this.onChangeTab}
                >
                    {Tokens.status.map((status, index) => {
                        return (
                            <Tab key={index}
                                 tabStyle={styles.tab}
                                 textStyle={styles.tabText}
                                 activeTabStyle={styles.activeTab}
                                 activeTextStyle={styles.activeTabText}
                                 heading={t(`screen.tokens.status.${status}`)}>
                                <List ref={this.tabRefs[index]}
                                      showStatus={status}
                                      navigation={this.props.navigation}
                                      rootStore={this.props.rootStore}/>
                            </Tab>
                        )
                    })}
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.back
    },
    tabContainerStyle: {
        height: 40,
        ...getPlatformElevation(0),
    },
    tabBarUnderlineStyle: {
        backgroundColor: Colors.font,
        height: 2
    },
    tab: {
        backgroundColor: Colors.toolBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorderDark,
    },
    tabText: {
        color: Colors.labelFontThin,
        fontWeight: "700",
        opacity: 0.86
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.listBorder,
        backgroundColor: Colors.toolBar
    },
    activeTabText: {
        color: Colors.font,
        fontWeight: "700"
    }
});
