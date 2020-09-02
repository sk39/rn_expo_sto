type Navigation = import('react-navigation').NavigationScreenProp;
type Lodash = import('@types/lodash');
type UnderscoreString = import('@types/underscore.string');
type TranslateOptions = import('@types/i18n-js').TranslateOptions;

declare module "*.svg" {
    import {SvgProps} from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}

interface NavigationProps {
    navigation?: Navigation
}

declare var t: (key: string, options?: TranslateOptions) => string;
declare var _: Lodash;
declare var s: UnderscoreString;
