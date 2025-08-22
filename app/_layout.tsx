import BottomNavBar from "@/components/Navbar";
import { Stack, usePathname } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { ToastProvider } from 'react-native-toast-notifications';
import { toastConfig } from "../components/CustomToastConfig";
import { AuthProvider } from "./context/AuthContext";
import './globals.css';

export default function RootLayout() {
  const pathname = usePathname();

  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ["/", "/Login", "/Register/OTP"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <AuthProvider>
      <ToastProvider
        placement="top"
        renderType={{
          success: (toast) => (
            <View
              style={{
                marginTop: 40,
                alignSelf: "flex-end",
                backgroundColor: "#5076f2",
                padding: 12,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>{toast.message}</Text>
            </View>
          ),
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          {shouldShowNavbar && <BottomNavBar />}
          <Stack screenOptions={{ headerShown: false }} />
          {/* <Toast />  */}
        </SafeAreaView>
      </ToastProvider>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
