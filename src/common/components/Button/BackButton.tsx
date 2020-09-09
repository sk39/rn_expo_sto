import React, {Component} from "react";
import IconButton from "@common/components/Button/IconButton";

interface Props {
    color?: string;
    shadowColor?: string;
    onPress: () => void;
}

export default class BackButton extends Component<Props> {

    render() {
        return (
            <IconButton name="arrow-left"
                        type="feather"
                        {...this.props}/>
        )
    }
}


