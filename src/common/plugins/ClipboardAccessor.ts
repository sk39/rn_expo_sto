import ViewUtils from "@common/utils/ViewUtils";
import {Clipboard} from 'react-native';

export default class ClipboardAccessor {

    static async getString(delay = 500): Promise<string> {
        await ViewUtils.sleep(delay);
        const content: any = await Clipboard.getString();
        console.log(`Clipboard#getString data=${content}`)
        return content;
    }

    static async getNumber(delay = 500): Promise<string> {
        const content: any = await this.getString(delay);
        if (content && !isNaN(s.replaceAll(content, ","))) {
            return content;
        }

        return null;
    }
}
