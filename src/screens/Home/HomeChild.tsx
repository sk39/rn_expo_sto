import React, {Component} from 'react';
import {RootStoreProps} from "@store/RootStoreProvider";
import {reaction} from "mobx";

interface Props {
    setRefreshListener: Function;
}

export default class HomeChild extends Component<Props & NavigationProps & RootStoreProps> {

    disposer;

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        props.setRefreshListener(() => {
            const {auth} = this.props.rootStore;
            this.loadData(auth.loggedIn)
        });
    }

    componentDidMount() {
        const {auth} = this.props.rootStore;
        this.disposer = reaction(
            () => auth.loggedIn,
            (loggedIn) => this.loadData(loggedIn)
        )
        this.loadData(auth.loggedIn);
    }

    componentWillUnmount() {
        if (this.disposer)
            this.disposer();
    }

    loadData(loggedIn) {
        throw Error("Please override");
    }
}
