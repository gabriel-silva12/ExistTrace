module.exports = {
  expo: {
    name: "ExistTrace",
    slug: "ExistTrace",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "existtrace",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon"
    },
    android: {
      adaptiveIcon: {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/icon.png"
      },
      predictiveBackGestureEnabled: false,
      package: "com.ssmc.existtrace"
    },
    web: {
      output: "single",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76
        }
      ],
      "expo-build-properties",
      "expo-image",
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      // Dynamically injects your EAS ID if it exists locally, otherwise safely skips it
      ...(process.env.EXPO_PUBLIC_EAS_PROJECT_ID && {
        eas: {
          projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
        }
      })
    }
  }
};