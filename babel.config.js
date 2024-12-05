module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo', 'nativewind/babel'],
      plugins: [
        'react-native-reanimated/plugin', // Deve estar sempre como o último plugin
      ],
    };
  };
  