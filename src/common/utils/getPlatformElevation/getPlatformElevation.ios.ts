const getPlatformElevation = (elevation, color) => {
    if (elevation === 0) {
        return {
            shadowColor: 'transparent',
            zIndex: 0,
        };
    }

    let _elevation = elevation;
    if (elevation._value != null) {
        _elevation = elevation._value;
    }

    return {
        shadowColor: color || 'black',
        shadowOpacity: 0.3,
        shadowRadius: _elevation / 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        // we need to have zIndex on iOS, otherwise the shadow is under components that
        // are rendered later
        zIndex: 1,
    };
};

export default getPlatformElevation;
