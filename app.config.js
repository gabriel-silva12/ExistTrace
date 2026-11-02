module.exports = {
  expo: {
    name: "ExistTrace",
    slug: "ExistTrace",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "existtrace",
    userInterfaceStyle: "automatic",
    android: {
      predictiveBackGestureEnabled: false,
      package: "com.ssmc.existtrace"
    },
    web: {
      output: "single"
    },
    plugins: [
      "expo-router",
      "expo-build-properties",
      "expo-image",
      "expo-web-browser",
      "expo-font",
      "expo-status-bar"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      ...(process.env.EXPO_PUBLIC_EAS_PROJECT_ID && {
        eas: {
          projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
        }
      })
    }
  }
};