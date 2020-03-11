import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {observer} from "mobx-react";
import {Container, View} from 'native-base';
import {Button, Icon} from "react-native-elements";
import LoginStore from "./LoginStore";
import PageLoading from '@common/components/PageLoading';
import Input from "@common/components/Input/Input";
import Colors from "../../constants/Colors";
import LottieView from "lottie-react-native";

@observer
export default class LoginScreen extends Component<NavigationProps> {

    store: LoginStore = new LoginStore();

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const {navigate} = this.props.navigation;
        if (this.store.validate()) {
            this.store.processing = true;
            // setTimeout instead of request login to server
            setTimeout(() => {
                this.store.processing = false;
                navigate('Home');
            }, 1000)
        }
    }

    render() {
        return (
            <Container>
                <PageLoading loading={this.store.processing}/>
                <View style={styles.back}>
                    <View style={{marginBottom: 0}}>
                        <LottieView
                            loop
                            autoPlay
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            source={require("assets/lottie/3738-blockchain-2.json")}/>
                    </View>
                    <View style={styles.form}>
                        <Input inputState={this.store.userId}
                               label="User Id"
                               leftIcon={
                                   <Icon name='user' type="feather" color='#a376c2' size={16}/>
                               }
                        />
                        <Input inputState={this.store.password}
                               label="Password"
                               secureTextEntry
                               leftIcon={
                                   <Icon name='lock' type="feather" color='#a376c2' size={16}/>
                               }
                        />
                        <Button buttonStyle={styles.btn}
                                title='Login'
                                titleStyle={styles.btnText}
                                onPress={this.handleLogin}
                        />
                        <Button buttonStyle={styles.link}
                                title='Forgot Password?'
                                type='clear'
                                titleStyle={styles.linkText}
                                onPress={() => alert("TODO: Jump forgot password.")}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
    logo: {
        width: 108,
        height: 100
    },
    back: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 24,
        backgroundColor: Colors.primaryColor,
        borderRadius: 26,
        width: 256,
    },
    btnText: {
        color: Colors.fontColor,
    },
    link: {
        marginTop: 16
    },
    linkText: {
        color: Colors.fontColor
    }
});
