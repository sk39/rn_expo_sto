import RootStore from "./RootStore";

export interface RootStoreProps {
    rootStore?: RootStore;
}

export default class RootStoreProvider {
    static rootStore = new RootStore();
}

