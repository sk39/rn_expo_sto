import React from 'react';
import "@common/plugins"
import 'react-native-gesture-handler';
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import {Feather, Ionicons} from '@expo/vector-icons';
import {observable} from "mobx";
import {observer, Provider} from "mobx-react";
import RootStack from "./src/navigation/RootStack";
import {createAppContainer} from "react-navigation";
import RootStoreProvider from "./src/store/RootStoreProvider";
import {EasingFunction} from "react-native";
import {Root} from 'native-base';
import {Host} from "react-native-portalize";
import UpdateManager from "@common/plugins/UpdateManager";
import Update from "./src/screens/System/Update";

const AppContainer = createAppContainer(RootStack);

declare module "react-native" {
    interface EasingStatic {
        back(s?: number): EasingFunction;

        in(easing?: EasingFunction): EasingFunction;

        out(easing?: EasingFunction): EasingFunction;

        inOut(easing?: EasingFunction): EasingFunction;
    }
}

@observer
export default class App extends React.Component {

    @observable isReady: boolean = false;
    @observable isUpdateNew: boolean = false;

    async componentDidMount() {
        await Promise.all([
            Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Feather.font,
                ...Ionicons.font,
            }),
            this.checkUpdate(),
            RootStoreProvider.rootStore.initialize()
        ]);

        this.isReady = true;
    }

    async checkUpdate() {
        this.isUpdateNew = await UpdateManager.checkUpdate();
    }

    render() {
        if (!this.isReady) {
            return <AppLoading/>;
        } else if (this.isUpdateNew) {
            return <Update/>;
        }

        return (
            <Root>
                <Host>
                    <Provider rootStore={RootStoreProvider.rootStore}>
                        <AppContainer/>
                    </Provider>
                </Host>
            </Root>
        )
    }
}
