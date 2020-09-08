import React, {PureComponent, RefObject} from "react";
import {Modalize} from "react-native-modalize";
import {Portal} from "react-native-portalize";

interface Props {
    height: number;
    onClose?: () => void;
    cancelable?: boolean;
}

export default class BottomModal extends PureComponent<Props> {

    static defaultProps = {
        cancelable: true
    };

    sheetRef: RefObject<Modalize>;

    constructor(props) {
        super(props);
        this.sheetRef = React.createRef();
    }

    open() {
        this.sheetRef.current.open();
    }

    close() {
        this.sheetRef.current.close();
    }

    onClose = () => {
        const {onClose} = this.props;
        if (onClose) onClose();
    }

    render() {
        const {cancelable, height} = this.props;
        return (
            <Portal>
                <Modalize ref={this.sheetRef}
                          closeOnOverlayTap={cancelable}
                          modalHeight={height}
                          onClosed={this.onClose}>
                    {this.props.children}
                </Modalize>
            </Portal>
        )
    }
}
