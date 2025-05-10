const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Bỏ qua các yêu cầu liên quan đến expo-router
config.resolver.blacklist = [
  /node_modules\/expo-router\/.*/,
];

// Đảm bảo Metro sử dụng đúng entry point
config.resolver.sourceExts.push('tsx', 'ts', 'jsx', 'js');
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;