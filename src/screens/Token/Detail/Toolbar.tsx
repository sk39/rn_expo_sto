import React, {PureComponent} from 'react';
import {Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons} from '@expo/vector-icons';
import TranslateAndOpacity from '../animations/TranslateAndOpacity';
import ViewUtils from "@common/utils/ViewUtils";
import Colors from "@constants/Colors";
import {STO} from "@common/model/domainModel";

interface Props {
    onBackPress: any;
    item: STO;
    isHidden?: boolean;
}

export class Toolbar extends PureComponent<Props> {

    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }

    async share() {
        try {
            const {name, symbol, description, raise} = this.props.item;
            const result = await Share.share({
                message: JSON.stringify({name, symbol, description, raise},),
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const {onBackPress} = this.props;
        return (
            <View>
                <View style={styles.statusBar}/>
                <View>
                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
                            <Ionicons name="ios-arrow-back" size={22} color="white"/>
                            <Text style={styles.titleBackText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuIconContainer} onPress={this.share}>
                            <Feather name="share-2" size={22} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbarContainer: {
        backgroundColor: Colors.toolBarInverse,
        alignItems: 'center',
        paddingHorizontal: 16,
        flexDirection: "row"
    },
    statusBar: {
        backgroundColor: Colors.toolBarInverse,
        height: ViewUtils.isIphoneX() ? 48 : 24, //TODO:
    },
    titleBackText: {
        color: 'white',
        marginLeft: 8,
    },
    backContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 8,
        paddingRight: 44
    },
    menuIconContainer: {
        marginLeft: "auto",
        width: 40,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TranslateAndOpacity(Toolbar);
