import {
    Animated,
    Easing,
    Image,
    ImageSourcePropType,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {observer} from "mobx-react";
import React, {Component} from "react";
import {getPlatformElevation} from "@common/utils/getPlatformElevation";
import {observable, reaction, runInAction} from "mobx";
import {Portal} from "react-native-portalize";
import Layout from "@constants/Layout";
import AnimatedCard from "./AnimatedCard";
import Colors from "@constants/Colors";
import AnimatedCardHeader from "@common/components/CardWithModal/AnimatedCardHeader";
import AnimatedCardContents from "@common/components/CardWithModal/AnimatedCardContents";

interface Props {
    image: ImageSourcePropType;
    modal: boolean;
    onPressed?: () => void;
    renderModalHeader: () => any;
    renderModal: () => any;
    renderModalFooter: () => any;
}

const duration = {
    phase1: 0,
    phase2: 240,
    phase3: 240,
};

@observer
export default class CardWithModal extends Component<Props> {

    @observable openingModal = false;
    @observable closingModal = false;
    @observable active = new Animated.Value(0);
    @observable phase1 = new Animated.Value(0);
    @observable phase2 = new Animated.Value(0);
    @observable phase3 = new Animated.Value(0);
    @observable scrollY = new Animated.Value(0);
    @observable pressItemTop = null;
    @observable pressItemHeight = null;
    cardRef;
    cardModalModeRef;
    scrollRef;
    disposer;

    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
        this.cardModalModeRef = React.createRef();
        this.scrollRef = React.createRef();
        this.disposer = reaction(
            () => this.props.modal,
            modal => modal ? this.openModal() : this.closeModal()
        )
    }

    componentWillUnmount() {
        this.disposer();
    }

    openModal() {
        this.openingModal = true;
        this.phase1.setValue(1)
        this.phase2.setValue(0)
        Animated.sequence([
            Animated.timing(this.phase2, {
                easing: Easing.inOut(Easing.ease),
                toValue: 1,
                duration: duration.phase2,
                delay: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.phase3, {
                easing: Easing.out(Easing.back()),
                toValue: 1,
                duration: duration.phase3,
                delay: 0,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            if (this.cardModalModeRef.current) {
                this.cardModalModeRef.current.open(duration.phase2)
            }
        }, 0)
    }

    async closeModal() {
        if (this.scrollRef.current)
            this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
        if (this.cardModalModeRef.current)
            this.cardModalModeRef.current.close(duration.phase2);

        Animated.parallel([
            Animated.timing(this.phase3, {
                easing: Easing.inOut(Easing.ease),
                toValue: 0,
                duration: duration.phase3,
                delay: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.phase2, {
                easing: Easing.inOut(Easing.ease),
                toValue: 0,
                duration: duration.phase2,
                delay: 0,
                useNativeDriver: true,
            }),
        ]).start(() => {
                this.phase1.setValue(0)
                this.openingModal = false
            }
        );
    }

    onPressed = () => {
        this.cardRef.current.measure((fx, fy, width, height, px, py) => {
            runInAction(() => {
                this.active.setValue(0);
                this.pressItemTop = py;
                this.pressItemHeight = height;
                if (this.props.onPressed)
                    this.props.onPressed()
            })
        })
    }

    onPressedIn = () => {
        this.active.setValue(1);
    }

    onPressOut = () => {
        this.active.setValue(0);
    }

    renderModal() {
        const {image, modal, renderModal, renderModalHeader, renderModalFooter} = this.props;
        if (!modal && !this.openingModal) {
            return null;
        }

        const cardPos = {
            position: "absolute",
            top: this.pressItemTop,
        }

        const ani = {
            modalBack: {
                opacity: this.phase2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                })
            },
            card: {
                // opacity: this.phase2.interpolate({
                //     inputRange: [0, 0.5, 1],
                //     outputRange: [1, 0.5, 1],
                // }),
                transform: [
                    {
                        translateY: this.phase2.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -(this.pressItemTop)],
                        })
                    },
                ]
            }
        };

        const {imageHeight, imageHeightLarge} = Layout.card;
        const paddingTop = this.pressItemHeight + (imageHeightLarge - imageHeight);
        return (
            <Portal>
                <View style={styles.modal}>
                    <Animated.View style={[styles.modalBack, ani.modalBack]}/>
                    <AnimatedCardHeader phase={this.phase3} scrollY={this.scrollY}>
                        {renderModalHeader()}
                    </AnimatedCardHeader>
                    <Animated.ScrollView
                        ref={this.scrollRef}
                        scrollEventThrottle={16}
                        onScroll={
                            Animated.event([
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.scrollY,
                                            },
                                        },
                                    },
                                ],
                                {useNativeDriver: true})
                        }
                    >
                        <Animated.View style={[cardPos, ani.card]}>
                            <AnimatedCard
                                ref={this.cardModalModeRef}
                                style={styles.card}
                                imageWrapperStyle={styles.imageWrapper}
                                scrollY={this.scrollY}
                            >
                                <Image
                                    style={styles.image}
                                    source={image}
                                />
                                <View>
                                    {this.props.children}
                                </View>
                            </AnimatedCard>
                        </Animated.View>
                        <AnimatedCardContents phase={this.phase3}>
                            <View style={{flex: 1, paddingTop: paddingTop, zIndex: 0}}>
                                {renderModal()}
                            </View>
                        </AnimatedCardContents>
                    </Animated.ScrollView>
                    {renderModalFooter()}
                </View>
            </Portal>
        )
    }

    render() {
        const {image} = this.props;
        const ani = {
            card: {
                opacity: this.phase1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                })
            },
            touch: {
                opacity: this.active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.72],
                })
            }
        };

        return (
            <React.Fragment>
                <TouchableWithoutFeedback onPress={this.onPressed} onPressIn={this.onPressedIn}
                                          onPressOut={this.onPressOut}>
                    <Animated.View style={ani.touch}>
                        <View style={styles.cardWrapper}>
                            <Animated.View ref={this.cardRef} style={[styles.card, ani.card]}>
                                <Animated.View style={[styles.imageWrapper]}>
                                    <Image
                                        style={styles.image}
                                        source={image}
                                    />
                                </Animated.View>
                                <View>
                                    {this.props.children}
                                </View>
                            </Animated.View>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                {this.renderModal()}
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        ...Platform.select({
            ios: {
                ...getPlatformElevation(6)
            }
        })
    },
    card: {
        overflow: 'hidden',
        backgroundColor: Colors.cardBackColor,
        borderRadius: 10,
        ...Platform.select({
            android: {
                ...getPlatformElevation(6)
            }
        })
    },
    imageWrapper: {
        overflow: 'hidden',
        backgroundColor: "#0f153c",
        padding: 0,
        width: "100%",
        height: Layout.card.imageHeight,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null
    },
    modal: {
        width: Layout.window.width,
        height: Layout.window.height
    },
    modalBack: {
        backgroundColor: Colors.backColor,
        flex: 1,
        ...StyleSheet.absoluteFillObject
    }
});
