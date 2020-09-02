import React from "react";
import {TabBarIcon} from "@common/components/ScreenIcon";

const MoreNavigationOptions = ({navigation}) => ({
    tabBarLabel: t("navigation.tab.More"),
    tabBarIcon: ({focused}) => (
        <TabBarIcon screenName="More" focused={focused}/>
    ),
    tabBarOnPress: () => navigation.openDrawer()
});

export default MoreNavigationOptions;
