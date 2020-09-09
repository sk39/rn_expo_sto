import React, {Component} from "react";
import IconButton from "@common/components/Button/IconButton";

interface Props {
    onPress: () => void;
}

export default class BackButton extends Component<Props> {

    render() {
        return (
            <IconButton name="arrow-left"
                        type="feather"
                        onPress={this.props.onPress}/>
        )
    }
}


