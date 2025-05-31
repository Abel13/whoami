export default {
  name: "Quem sou eu?",
  slug: "whoami",
  version: "1.0.3",
  orientation: "landscape",
  icon: "./assets/images/icon.png",
  scheme: "whoami",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.abelb13.whoami",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      UIViewControllerBasedStatusBarAppearance: true,
      UIBackgroundModes: [],
      NSMicrophoneUsageDescription:
        "Este aplicativo precisa acessar o microfone para reprodução de áudio.",
    },
    entitlements: {
      "com.apple.developer.game-center": true,
    },
  },
  android: {
    edgeToEdgeEnabled: true,
    blockedPermissions: ["android.permission.ACTIVITY_RECOGNITION"],
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.abelb13.whoami",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "react-native-edge-to-edge",
      {
        android: {
          parentTheme: "Default",
          enforceNavigationBarContrast: false,
        },
      },
    ],
    "expo-router",
    [
      "expo-build-properties",
      {
        android: {
          enableProguardInReleaseBuilds: true,
        },
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "2943a4e9-0d4e-46bb-a90d-2dbaf1aba08c",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/2943a4e9-0d4e-46bb-a90d-2dbaf1aba08c",
  },
};
