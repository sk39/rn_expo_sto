import React from 'react';
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

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Feather.font,
            ...Ionicons.font,
        });
        this.isReady = true;
    }

    render() {
        if (!this.isReady) {
            return <AppLoading/>;
        }

        return (
            <Root>
                <Provider rootStore={RootStoreProvider.rootStore}>
                    <AppContainer/>
                </Provider>
            </Root>
        )
    }
}
