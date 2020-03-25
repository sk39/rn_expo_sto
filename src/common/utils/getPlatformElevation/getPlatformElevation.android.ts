// Android doesn't support shadowColor.
const getPlatformElevation = (elevation: number) => ({
    elevation,
});

export default getPlatformElevation;
