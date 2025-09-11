const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('metro-config').ConfigT} */
const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    getTransformOptions: async () => ({
      transform: { experimentalImportSupport: false, inlineRequires: true }
    })
  }
};