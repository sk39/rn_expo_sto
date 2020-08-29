import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native'
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import Skeleton from "@common/components/Skeleton";
import AnimatedRow from "@common/components/Animations/AnimatedRow";
import {STO} from "@common/model/domainModel";
import {TranslateYAndOpacity} from "../animations";

interface Props {
    selectedItem: STO
    phase?: string;
}

@observer
export default class DetailContents extends PureComponent<Props> {

    renderItem({content, index}) {
        const {phase} = this.props;
        const delayBase = 56;
        if (phase) {
            return (
                <TranslateYAndOpacity key={index} isHidden={phase !== 'phase-2'} delay={100 + delayBase * index}>
                    {content}
                </TranslateYAndOpacity>
            )
        } else {
            return (
                <AnimatedRow key={index} delay={300 + delayBase * index}>
                    {content}
                </AnimatedRow>
            )
        }
    }

    renderList() {
        let index = 0;
        return [
            this.renderItem({
                content: (
                    <View style={{paddingBottom: 8}}>
                        <Text style={styles.descriptionDetail}>
                            This section is a example security token detail page.
                            You can move to the purchase screen from the button at the bottom of the page.
                        </Text>
                    </View>
                ),
                index: index++
            }),
            this.renderItem({
                content: (
                    <View>
                        <Skeleton line={3}/>
                    </View>
                ),
                index: index++
            }),
            this.renderItem({
                content: (
                    <View>
                        <Skeleton line={5}/>
                    </View>
                ),
                index: index++
            }),
            this.renderItem({
                content: (
                    <View>
                        <Skeleton line={2}/>
                    </View>
                ),
                index: index++
            }),
        ]
    }

    render() {
        const {selectedItem} = this.props;
        if (!selectedItem) {
            return null;
        }

        return (
            <View style={{padding: 16, paddingBottom: 56}}>
                {this.renderList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1
    },
    titleContainer: {
        flex: 1,
    },
    itemContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: "row"
    },
    titleText: {
        color: '#f1f1f1',
    },
    amountText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#f1f1f1',
    },
    vatText: {
        fontSize: 10,
        color: 'gray',
    },
    descriptionDetail: {
        color: Colors.labelFont,
        fontSize: 14,
        lineHeight: 22
    },
    areaCard: {
        padding: 12,
        paddingTop: 6,
    },
    headerText: {
        fontSize: 20,
        color: Colors.primaryColorDark,
        opacity: 0.5,
        fontWeight: "700",
        letterSpacing: 2,
    }
});
