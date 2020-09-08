import React, {Component} from "react";
import {StatusBar} from "react-native";
import Colors from "@constants/Colors";
import {observer} from "mobx-react";
import {observable} from "mobx";

interface Props {
    dark: boolean,
    transparent?: boolean;
    navigation?: Navigation
}

@observer
export default class MyStatusBar extends Component<Props> {

    static lastBackIsDark = null;

    @observable refreshNum = 0;

    ref;

    constructor(props) {
        super(props);
        this.ref = React.createRef<StatusBar>()
    }

    componentDidMount() {
        const {navigation} = this.props;
        if (navigation) {
            navigation.addListener('didFocus', () => {
                const {dark} = this.props;
                if (MyStatusBar.lastBackIsDark != null
                    && MyStatusBar.lastBackIsDark != dark) {
                    console.log("StatusBar.pushStackEntry")
                    StatusBar.pushStackEntry({
                        barStyle: dark ? "light-content" : "dark-content",
                        animated: true
                    })
                    MyStatusBar.lastBackIsDark = dark;
                }
            });
        }
    }

    render() {
        const {dark, transparent, navigation} = this.props;
        if (navigation) MyStatusBar.lastBackIsDark = dark;

        if (dark) {
            const backColor = transparent ? "transparent" : Colors.toolBarInverse
            return (
                <StatusBar ref={this.ref}
                           barStyle="light-content"
                           translucent={transparent}
                           backgroundColor={backColor}/>
            )
        } else {
            const backColor = transparent ? "transparent" : Colors.toolBar
            return (
                <StatusBar ref={this.ref}
                           barStyle="dark-content"
                           translucent={transparent}
                           backgroundColor={backColor}/>
            )
        }

    }
}
