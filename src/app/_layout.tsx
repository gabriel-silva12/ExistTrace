import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/hooks/context/AuthContext";
import { QuizProvider } from "@/hooks/context/QuizContext";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QuizProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </QuizProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;