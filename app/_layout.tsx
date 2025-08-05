import BottomNavBar from "@/components/Navbar";
import { Stack, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import './globals.css';

export default function RootLayout() {
  const pathname = usePathname();

  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ["/", "/Login", "/Register/OTP"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {shouldShowNavbar && <BottomNavBar />}
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}