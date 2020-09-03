import {action, computed, observable, runInAction} from "mobx";
import SecureStorage from "@store/storage/SecureStorage";
import ViewUtils from "@common/utils/ViewUtils";

const STORAGE_KEY = "sto-demo-auth";

/**
 * Login User state.
 */
export default class AuthStore {

    @observable userId: string = null;
    @observable username: string = null;
    @observable password: string = null;
    @observable email: string = "";
    @observable shortName: string = "";
    @observable accessToken: string = null;
    @observable refreshToken: string = null;
    @observable otpauth: string = null;
    @observable setUpOtp: boolean = false;

    @computed get loggedIn(): boolean {
        return this.refreshToken != null
    }

    async saveStorage() {
        await SecureStorage.save(STORAGE_KEY, {
            userId: this.userId,
            password: this.password,
            refreshToken: this.refreshToken,
            setUpOtp: this.setUpOtp //TODO:for demo
        })
    }

    async loadStorage() {
        const data = await SecureStorage.load(STORAGE_KEY);
        if (data) {
            runInAction(() => {
                this.userId = data.userId;
                this.password = data.password;
                this.refreshToken = data.refreshToken;
                this.setUpOtp = data.setUpOtp;
            });
        }
    }

    async initialize() {
        await this.loadStorage();
        if (this.refreshToken) {
            await this.refresh()
        }
    }

    async clear() {
        runInAction(() => {
            this.userId = null
            this.password = null
            this.username = null
            this.email = null
            this.shortName = null
            this.accessToken = null
            this.refreshToken = null
            this.otpauth = null;
            this.setUpOtp = null;
        });
        await SecureStorage.remove(STORAGE_KEY);
    }

    signIn(userId: string, password: string) {
        // TODO: server login request
        return new Promise((resolve => {
            setTimeout(() => {
                runInAction(() => {
                    this.userId = userId
                    this.password = password
                    this.otpauth = `otpauth://totp/sto-demo:${userId}?secret=XXXXXXXXX&issuer=sto-demo&algorithm=SHA1&digits=6&period=30`
                });
                resolve();
            }, 500)
        }))
    }

    @action
    signOut() {
        this.username = null
        this.email = null
        this.shortName = null
        this.accessToken = null
        this.refreshToken = null
        this.saveStorage().then();
    }

    async refresh() {
        if (!this.refreshToken) {
            return;
        }

        // TODO: server login request
        return new Promise((resolve => {
            runInAction(() => {
                this.username = "Test User"
                this.email = s.include(this.userId, "@") ? this.userId : ""
                this.shortName = "TU"
                this.accessToken = "hoge"
            });
            resolve();
        }))
    }

    async verify2FA(code: string) {
        // TODO: server login request
        await ViewUtils.sleep(500);
        this.refreshToken = "hoge"
        this.setUpOtp = true;
        await this.refresh();
        await this.saveStorage();
        return "OK"
    }
}

