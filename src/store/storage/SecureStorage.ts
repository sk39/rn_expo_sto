import * as SecureStore from 'expo-secure-store';

export default class SecureStorage {

    static async load(key: string) {
        try {
            const json = await SecureStore.getItemAsync(key)
            if (json != null) {
                return JSON.parse(json);
            }
        } catch (e) {
            console.error("Failed load from secure storage", key, e)
        }

        return null
    }

    static async save(key: string, val: any) {
        try {
            const json = JSON.stringify(val)
            await SecureStore.setItemAsync(key, json)
        } catch (e) {
            console.error("Failed save to secure storage", key, e)
        }
    }

    static async remove(key: string) {
        try {
            await SecureStore.deleteItemAsync(key)
        } catch (e) {
            console.error("Failed remove to secure storage", key, e)
        }
    }
}

