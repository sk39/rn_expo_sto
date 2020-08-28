import React, {Component} from 'react';
import {RootStoreProps} from "@store/RootStoreProvider";
import BlockLoading from "@common/components/BlockLoading";
import {observable} from "mobx";
import NoAuthMessage from "./NoAuthMessage";

interface Props {
    setRefreshListener: Function;
}

export default class HomeChild extends Component<Props & NavigationProps & RootStoreProps> {

    @observable processing = false;

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        props.setRefreshListener(this.loadData);
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.loadData();
            }
        );
    }

    loadData() {
        throw Error("Please override");
    }

    renderLoading() {
        return [
            <NoAuthMessage key="noauth"/>,
            <BlockLoading key="loading"
                          loading={this.processing}
                          disablesLayerColor="rgba(247,246,255,0.66)"/>
        ]
    }
}
