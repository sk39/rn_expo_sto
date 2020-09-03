import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import Avatar from "@common/components/Avatar";
import {RootStoreProps} from "@store/RootStoreProvider";

interface Props {
    size?: number,
}

@inject("rootStore")
@observer
export default class LoginUserAvatar extends Component<Props & RootStoreProps> {

    @observable notSet;

    static defaultProps = {
        size: 60,
    };

    render() {
        const {size, rootStore} = this.props;
        const {email, shortName} = rootStore.auth;
        return (
            <Avatar
                size={size}
                demo={true}
                email={email}
                title={shortName}/>

        )
    }
}
