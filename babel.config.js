const path = require("path");
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["@babel/plugin-proposal-decorators", {
                "legacy": true
            }],
            ["module-resolver", {
                "root": ["./"],
                extensions: ['.ts', '.tsx', '.ios.ts', '.android.ts', '.ios.tsx', '.android.tsx', '.json'],
                "alias": {
                    "@assets": path.resolve("assets"),
                    "@common": path.resolve("src/common"),
                    "@constants": path.resolve("src/constants"),
                    "@store": path.resolve("src/store"),
                }
            }]
        ]
    };
};

