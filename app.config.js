export default {
  name: "Quem sou eu?",
  slug: "whoami",
  version: "1.0.5",
  orientation: "landscape",
  icon: "./assets/images/icon.png",
  scheme: "whoami",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  splash: {
    backgroundColor: "#FFFFFF",
    image: "./assets/images/splash.png",
    resizeMode: "contain",
  },
  ios: {
    requireFullScreen: true,
    supportsTablet: true,
    bundleIdentifier: "com.abelb13.whoami",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: true,
      UIViewControllerBasedStatusBarAppearance: "NO",
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
    "expo-web-browser",
    [
      "expo-asset",
      {
        assets: [
          "./assets/images/modules/animais.png",
          "./assets/images/modules/carros.png",
          "./assets/images/modules/disney.png",
          "./assets/images/modules/famosos_mundiais.png",
          "./assets/images/modules/filmes.png",
          "./assets/images/modules/flores.png",
          "./assets/images/modules/frutas.png",
          "./assets/images/modules/harry_potter.png",
          "./assets/images/modules/ai.png",
          "./assets/images/modules/livros.png",
          "./assets/images/modules/marcas.png",
          "./assets/images/modules/objetos.png",
          "./assets/images/modules/pokemons.png",
          "./assets/images/modules/pokemons2.png",
          "./assets/images/modules/pokemons3.png",
          "./assets/images/modules/pokemons4.png",
          "./assets/images/modules/pokemons5.png",
          "./assets/images/modules/pokemons6.png",
          "./assets/images/modules/pokemons7.png",
          "./assets/images/modules/pokemons8.png",
          "./assets/images/modules/pokemons9.png",
          "./assets/images/modules/profissoes.png",
        ],
      },
    ],
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
      "expo-splash-screen",
      {
        backgroundColor: "#FFFFFF",
        image: "./assets/images/splash.png",
        dark: {
          image: "./assets/images/splash.png",
          backgroundColor: "#000000",
        },
        imageWidth: 200,
      },
    ],
    [
      "react-native-edge-to-edge",
      {
        android: {
          parentTheme: "Default",
          enforceNavigationBarContrast: false,
        },
      },
    ],
    [
      "expo-screen-orientation",
      {
        initialOrientation: "LANDSCAPE_RIGHT",
      },
    ],
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
