import React, {Component} from "react";
import {StyleSheet} from "react-native"
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Colors from "@constants/Colors";
import Layout from "@constants/Layout";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import TokenState from "../../Token/TokenState";
import CarouselListItem from "../../Token/List/Carousel/ListItem";
import RootStore from "@store/RootStore";
import MobxHelper from "@common/utils/MobxHelper";
import SkeletonLoader from "@common/components/PageSupport/SkeletonLoader";

interface Props {
    rootStore: RootStore;
    navigation: Navigation
}

const AUTO_INTERVAL = 4000;

@observer
export default class TokensCarousel extends Component<Props> {

    tokenState: TokenState;
    // @ts-ignore
    carouselRef: React.RefObject<Carousel>;
    @observable activeSlide = 0;
    mobxHelper = new MobxHelper();
    checkAutoLoopTimer;

    constructor(props) {
        super(props);
        this.tokenState = new TokenState(props.navigation, props.rootStore)
        this.carouselRef = React.createRef();
    }

    componentDidMount(): void {
        this.mobxHelper.reaction(
            () => this.tokenState.selectedItem,
            item => {
                if (!item) {
                    this.startAutoplay();
                } else {
                    this.stopAutoplay();
                }
            }
        );
        this.mobxHelper.reaction(
            () => this.tokenState.stoStore.list,
            () => this.reset()
        );

        this.reset();
    }

    componentWillUnmount(): void {
        this.mobxHelper.onUnmount();
        this.stopAutoplay();
    }

    @computed
    get list() {
        const {list} = this.tokenState.stoStore;
        return list.slice(0, 4);
    }

    @action
    onSnapToItem = (index) => {
        this.activeSlide = index;
        clearTimeout(this.checkAutoLoopTimer)
        const len = this.list.length;
        if (index === len - 1) {
            // Carousel.loop=trueだと挙動が怪しくなるので、先頭には自力で戻る
            this.checkAutoLoopTimer = setTimeout(() => {
                this.carouselRef.current.snapToItem(0, true)
            }, AUTO_INTERVAL);
        }
    }

    startAutoplay() {
        clearTimeout(this.checkAutoLoopTimer)
        if (this.carouselRef.current)
            this.carouselRef.current.startAutoplay();
    }

    stopAutoplay() {
        clearTimeout(this.checkAutoLoopTimer)
        if (this.carouselRef.current)
            this.carouselRef.current.stopAutoplay();
    }

    @action
    reset() {
        this.startAutoplay();
        if (this.activeSlide !== 0 && this.carouselRef.current) {
            this.activeSlide = 0;
            this.carouselRef.current.snapToItem(0, false)
        }
    }

    @action
    resetAndStop() {
        this.stopAutoplay();

        // iOSでバグるので無効化
        // if (this.activeSlide !== 0 && this.carouselRef.current) {
        //     this.activeSlide = 0;
        //     this.carouselRef.current.snapToItem(0, false)
        // }
    }

    onListItemPressed = item => {
        const {tokenState} = this;
        tokenState.navigation.setParams({tabBarVisible: item == null})
        tokenState.selectItem(item);
    };

    renderItem = ({item}) => {
        const {tokenState} = this;
        return (
            <CarouselListItem
                item={item}
                tokenState={tokenState}
                onPress={this.onListItemPressed}
            />
        );
    };

    render() {
        return (
            <SkeletonLoader
                style={{width: Layout.window.width, height: 254}}
                loading={this.list.length === 0}>
                <Carousel
                    ref={this.carouselRef}
                    onSnapToItem={this.onSnapToItem}
                    data={this.list}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    autoplayInterval={AUTO_INTERVAL}
                    renderItem={this.renderItem}
                    sliderWidth={Layout.window.width}
                    itemWidth={Layout.window.width}
                />
                <Pagination
                    dotsLength={this.list.length}
                    activeDotIndex={this.activeSlide}
                    containerStyle={styles.pagination}
                />
            </SkeletonLoader>
        );
    }
}

const styles = StyleSheet.create({
    pagination: {
        paddingVertical: 8,
        marginTop: 0,
        backgroundColor:
        Colors.back3
    }
});
