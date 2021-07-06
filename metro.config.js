const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
	const {
		resolver: { sourceExts, assetExts },
	} = await getDefaultConfig(__dirname);
	const ret = {
		transformer: {
			babelTransformerPath: require.resolve("react-native-svg-transformer"),
		},
		resolver: {
			assetExts: ["md", "svg", ...assetExts],
			sourceExts: [...sourceExts, "svg"],
		},
	};

	console.log(ret.resolver.assetExts);

	return ret;
})();
