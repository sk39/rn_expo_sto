import Constants from 'expo-constants';

const env = (Constants.manifest && Constants.manifest.extra)
    ? Constants.manifest.extra.env
    : {}
export default env;
