import BottomNavBar from "@/components/Navbar";
import { Stack, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import './globals.css';

export default function RootLayout() {
  const pathname = usePathname();

  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ["/", "/Login", "/Register/OTP"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        {shouldShowNavbar && <BottomNavBar />}
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </AuthProvider>
  );
}
