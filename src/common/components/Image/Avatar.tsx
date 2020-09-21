import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import gravatarApi from "gravatar-api";
import {observer} from "mobx-react";
import {observable} from "mobx";
import Colors from "@constants/Colors";

interface Props {
    size?: number,
    email?: string;
    title?: string;
    demo?: boolean;
}

const demoUri = "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"

@observer
export default class Avatar extends Component<Props> {

    static defaultProps = {
        size: 60,
    };

    @observable notSet;

    render() {
        const {email, size, demo, title} = this.props;
        const options = {
            email: email,
            parameters: {"size": size},
        }

        let uri = gravatarApi.imageUrl(options)
        let d = "404";
        if (demo) {
            d = demoUri;
        } else if (this.notSet) {
            return (
                <View style={[styles.titleCircle, {width: size, height: size}]}>
                    <Text style={[styles.title, {fontSize: size / 3}]}>{title}</Text>
                </View>
            )
        }

        uri += `&d=${d}`
        return (
            <View style={styles.imageWrapper}>
                <Image style={[styles.image, {width: size, height: size}]}
                       source={{uri}}
                       onError={(e) => this.notSet = true}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageWrapper: {},
    image: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 50
    },
    titleCircle: {
        // borderWidth: 1,
        // borderColor: 'white',
        backgroundColor: Colors.link,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.72
    },
    title: {
        color: "white"
    }
});
