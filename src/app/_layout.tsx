import { AuthProvider } from "@/hooks/context/AuthContext"
import { Stack } from "expo-router"
const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{
        headerShown: false
      }}></Stack>
    </AuthProvider>
  ) 
}

export default RootLayout