import { AuthProvider } from "@/hooks/context/AuthContext"
import { QuizProvider } from "@/hooks/context/QuizContext"
import { Stack } from "expo-router"
const RootLayout = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Stack screenOptions={{
          headerShown: false
        }}></Stack>
      </QuizProvider>
    </AuthProvider>
  ) 
}

export default RootLayout