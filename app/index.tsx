import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}>
      <View className="flex-1 justify-center items-center bg-[#060b22] px-4">
        <Text className="text-3xl font-bold text-gray-200 mb-2">
          YatraQ 🚍
        </Text>
        <Text className="text-base text-gray-400">
          Quick Track. Smart Travel.
        </Text>
      </View>
    </SafeAreaView>
  );
}
