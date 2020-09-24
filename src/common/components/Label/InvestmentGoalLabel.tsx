import React, {FC} from "react"
import env from "@common/plugins/env"
import {StyleProp, TextStyle} from "react-native";
import NumberLabel from "@common/components/Label/NumberLabel";
import Format from "@constants/Format";

const isJa = env.LANG === "ja";

interface Props {
    value?: number | string,
    style?: StyleProp<TextStyle>;
    prefixStyle?: StyleProp<TextStyle>;
    suffixStyle?: StyleProp<TextStyle>;
}

const InvestmentGoalLabel: FC<Props> = (props) => {
    if (isJa) {
        const {value, style} = props;
        return (
            <NumberLabel value={Number(value) / 10000}
                         style={style}
                         suffix={"万円"}
            />
        )
    }
    return (
        <NumberLabel {...props}
                     prefix={Format.baseCcySymbol}
                     prefixStyle={{marginRight: 1}}
        />
    )
}

export default InvestmentGoalLabel;
