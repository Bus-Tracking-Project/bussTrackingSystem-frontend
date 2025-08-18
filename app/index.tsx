import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  // const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false);
      router.replace('/Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}>
      <View className="flex-1 flex-col justify-center items-center">
        <View className="flex flex-row items-center">
          <Text className="text-3xl font-bold text-gray-100">Yatra</Text>
          <Image source={require('@/assets/images/btslogo.png')} className="w-10 h-10" />
        </View>
        <View>
          <Text className="text-base text-gray-400 text-center mb-5">Quick Track. Smart Travel.</Text>
        </View>
      </View>
      {/* ✅ Overlay Loader 
      {Loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnime />
        </View>
      )}*/}
    </SafeAreaView>
  );
}
