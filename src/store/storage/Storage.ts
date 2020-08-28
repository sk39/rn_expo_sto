import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {

    static async load(key: string) {
        try {
            const json = await AsyncStorage.getItem(key)
            if (json != null) {
                return JSON.parse(json);
            }
        } catch (e) {
            console.error("Failed load from storage", key, e)
        }

        return null
    }

    static async save(key: string, val: any) {
        try {
            const json = JSON.stringify(val)
            await AsyncStorage.setItem(key, json)
        } catch (e) {
            console.error("Failed save to storage", key, e)
        }
    }

    static async remove(key: string) {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            console.error("Failed remove to secure storage", key, e)
        }
    }
}

