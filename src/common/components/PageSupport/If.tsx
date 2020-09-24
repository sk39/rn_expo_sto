import React, {FC} from "react"


interface Props {
    test: boolean;
    children: any;
}

export const If: FC<Props> = ({test, children}) => {
    if (!test) {
        return null;
    }
    return children
}


export const IfElse: FC<Props> = ({test, children}) => {
    if (test) {
        return children[0];
    } else {
        return children[1];
    }
}
