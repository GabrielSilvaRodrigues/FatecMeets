import 'dotenv/config';

// Declarar process para evitar erro de tipos no ambiente de build do Expo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env: any = typeof process !== 'undefined' ? (process as any).env : {};

export default {
  expo: {
    name: 'FatecMeets',
    slug: 'fatecmeets',
    scheme: 'fatecmeets',
    version: '0.1.0',
    orientation: 'portrait',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.gabrielsilvarodrigues2.fatecmeets'
    },
    android: {
      package: 'com.gabrielsilvarodrigues2.fatecmeets'
    },
    plugins: [],
    extra: {
      apiBaseUrl: env?.API_BASE_URL ?? 'http://localhost:3000',
      eas: {
        projectId: '3261f4e8-7344-4de8-a8b4-35a87573c987'
      }
    }
  }
};