import i18n from "./I18n"
import _ from "lodash";
import s from "underscore.string";

global.t = (key, op) => {
    return i18n.t(key, op)
}
global["_"] = _;
global.s = s;
