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
        props.setRefreshListener(this.loadData);
    }

    componentDidMount() {
        // this.props.navigation.addListener(
        //     'didFocus',
        //     () => {
        //         this.loadData();
        //     }
        // );
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
        this.disposer();
    }

    loadData() {
        throw Error("Please override");
    }

    clear() {

    }
}
