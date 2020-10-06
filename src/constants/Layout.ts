import {Dimensions} from 'react-native';

const _window = Dimensions.get('window');
const width = _window.width;
const height = _window.height;

export default {
    window: {
        width,
        height,
    },
    input: {
        width: width - 90,
    },
    bottomBtn: {
        height: 48,
        heightIPhoneX: 66,
    },
    card: {
        imageHeight: (height > 800) ? 200 : (height > 700) ? 180 : 168,
        imageHeightLarge: (height > 700) ? 280 : 240,
        horizontalImageHeight: (height > 700) ? 130 : 120,
        carouselImageHeight: (height > 700) ? 230 : 204
    },
    isSmallDevice: width < 375,
};
