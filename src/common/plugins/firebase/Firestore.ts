import * as firebase from 'firebase';

export default class Firestore {

    static enable: boolean = false;
    static _db;

    static db() {
        if (!this.enable) {
            return null;
        }

        if (!this._db) {
            this._db = firebase.firestore();
        }

        return this._db;
    }
}
