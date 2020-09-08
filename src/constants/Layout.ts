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
        imageHeight: 150,
        imageHeightLarge: (height > 890) ? 320 : 280
    },
    isSmallDevice: width < 375,
};
