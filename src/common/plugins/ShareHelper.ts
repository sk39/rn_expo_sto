import {Share} from "react-native";

export default class ShareHelper {

    static async share(title: string, obj: any) {
        try {
            const result = await Share.share({
                title,
                message: `${title}\n\n${JSON.stringify(obj, null, "  ")}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
}
