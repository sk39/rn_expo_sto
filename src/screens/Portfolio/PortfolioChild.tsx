import React, {Component} from 'react';
import {RootStoreProps} from "@store/RootStoreProvider";
import {reaction} from "mobx";

interface Props {
    setRefreshListener: Function;
}

export default class PortfolioChild extends Component<Props & NavigationProps & RootStoreProps> {

    disposer;

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        props.setRefreshListener(this.loadData);
    }

    componentDidMount() {
        this.loadData();
        const {auth} = this.props.rootStore;
        this.disposer = reaction(
            () => auth.loggedIn,
            (loggedIn) => {
                if (loggedIn) {
                    this.loadData();
                } else {
                    this.clear();
                }
            }
        )
    }

    componentWillUnmount() {
        if (this.disposer)
            this.disposer();
    }

    loadData() {
        throw Error("Please override");
    }

    clear() {

    }
}
