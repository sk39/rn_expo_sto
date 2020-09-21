import React, {Component} from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet} from "react-native";
import RootStoreProvider from "@store/RootStoreProvider";
import SkeletonLoader from "@common/components/PageSupport/SkeletonLoader";

interface Props {
    source: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
}

interface State {
    localPath: string;
}

export default class CashImage extends Component<Props, State> {

    constructor(props) {
        super(props);
        const imageStore = RootStoreProvider.rootStore.image;
        const {source} = props;
        const uri = (source as any).uri;
        if (uri) {
            const localPath = imageStore.cacheSync(uri)
            this.state = {localPath}
            if (!localPath) {
                this.loadLocalPath(uri).then()
            }
        } else {
            this.state = {localPath: null}
        }
    }

    componentDidUpdate(prevProps) {
        const {source} = this.props;
        const uri = (source as any).uri;
        if (uri && uri !== prevProps.source.uri) {
            this.loadLocalPath(uri).then()
        }
    }

    async loadLocalPath(uri: string) {
        const imageStore = RootStoreProvider.rootStore.image;
        const localPath = await imageStore.cache(uri);
        this.setState({localPath})
    }

    render() {
        const {source, style} = this.props;
        if ((source as any).uri) {
            return (
                <SkeletonLoader
                    loading={s.isBlank(this.state.localPath)}>
                    <Image
                        source={{uri: this.state.localPath}}
                        style={[styles.image, style]}/>
                </SkeletonLoader>
            )
        }

        return (
            <Image source={source} style={[styles.image, style]}/>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    }
});
