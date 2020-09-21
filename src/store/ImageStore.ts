import {CacheManager} from "react-native-expo-image-cache";

export default class ImageStore {

    entry: {
        [name: string]: {
            listeners: ((uri: string) => void)[]
            localUri?: string;
        }
    } = {};

    private _downloaded(localUri: string, uri: string) {
        if (!this.entry[uri]) {
            return;
        }
        const _entry = this.entry[uri];
        _entry.localUri = localUri;
        _entry.listeners.forEach(listener => listener(localUri))
        _entry.listeners = [];
    }

    private _cache = (uri: string, lister) => {
        if (!this.entry[uri]) {
            this.entry[uri] = {
                listeners: [lister],
                localUri: null
            }
            // console.log("get", uri)
            CacheManager.get(uri, {}).getPath().then((localUri) => {
                this._downloaded(localUri, uri)
            })

        } else {
            const _entry = this.entry[uri];
            if (!_entry.localUri) {
                _entry.listeners.push(lister);
            } else {
                lister(_entry.localUri);
            }
        }
    }

    initialize() {

    }

    cache(uri: string): Promise<string> {
        return new Promise<string>((resolve => {
            this._cache(uri, ((uri: string) => resolve(uri)));
        }))
    }

    cacheSync(uri: string): string {
        const _entry = this.entry[uri];
        if (!_entry || !_entry.localUri) {
            return null;
        }

        return _entry.localUri;
    }

    async clear() {
        this.entry = {}
        await CacheManager.clearCache();
    }
}
