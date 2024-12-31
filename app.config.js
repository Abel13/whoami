const { GOOGLE_SERVICES_JSON, GOOGLE_SERVICES_PLIST } = process.env;

module.exports = () => {
  return {
    expo: {
      name: "whoami",
      slug: "whoami",
      version: "1.0.0",
      orientation: "landscape",
      icon: "./assets/images/icon.png",
      scheme: "whoami",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.abelb13.whoami",
        googleServicesFile: GOOGLE_SERVICES_PLIST,
        infoPlist: {
          UIBackgroundModes: ["audio"],
          NSMicrophoneUsageDescription:
            "Este aplicativo precisa acessar o microfone para reprodução de áudio.",
        },
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
          googleServicesFile: GOOGLE_SERVICES_JSON,
        },
        package: "com.abelb13.whoami",
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        ["@react-native-firebase/app", "@react-native-firebase/analytics"],
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
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
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
    },
  };
};
