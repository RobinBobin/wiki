import type { ExpoConfig } from 'expo/config'

import majorVersion from 'semver/functions/major'

import {
  name as packageJsonName,
  version as packageJsonVersion
} from './package.json'
import { RUNTIME_VERSION, SCHEME } from './src/constants/appConfig'

if (majorVersion(RUNTIME_VERSION) !== majorVersion(packageJsonVersion)) {
  throw new Error('Runtime version mismatch')
}

const config: ExpoConfig = {
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      backgroundImage: './assets/images/android-icon-background.png',
      foregroundImage: './assets/images/android-icon-foreground.png',
      monochromeImage: './assets/images/android-icon-monochrome.png'
    },
    edgeToEdgeEnabled: true,
    package: SCHEME,
    predictiveBackGestureEnabled: false
  },
  experiments: {
    reactCompiler: true,
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: '9de5a237-19a8-46f6-aaf2-cada941ab27e'
    }
  },
  githubUrl: 'https://github.com/RobinBobin/wiki',
  icon: './assets/images/icon.png',
  ios: {
    bundleIdentifier: SCHEME,
    supportsTablet: true
  },
  name: packageJsonName,
  newArchEnabled: true,
  platforms: ['android', 'ios', 'web'],
  plugins: [
    'expo-dev-client',
    'expo-font',
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#ffffff',
        dark: {
          backgroundColor: '#000000'
        },
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain'
      }
    ],
    'expo-system-ui',
    [
      'react-native-edge-to-edge',
      {
        android: {
          enforceNavigationBarContrast: false
        }
      }
    ]
  ],
  runtimeVersion: RUNTIME_VERSION,
  scheme: SCHEME,
  slug: packageJsonName,
  userInterfaceStyle: 'automatic',
  version: packageJsonVersion,
  web: {
    favicon: './assets/images/favicon.png',
    output: 'static'
  }
}

export default config
