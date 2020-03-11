import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';

export default class Sandbox extends Component {

    render() {
        return (
            <HeaderImageScrollView
                maxHeight={300}
                minHeight={56}
                headerImage={{uri: "https://picsum.photos/510/300?random&d=sss"}}
                renderForeground={() => (
                    <View style={{height: 150, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity onPress={() => console.log("tap!!")}>
                            <Text style={{backgroundColor: "transparent"}}>Tap Me!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            >
                <View style={{height: 1000}}>
                    <TriggeringView onHide={() => console.log("text hidden")}>
                        <Text>Scroll Me!</Text>
                    </TriggeringView>
                </View>
            </HeaderImageScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContent: {},
    fill: {
        flex: 1,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
