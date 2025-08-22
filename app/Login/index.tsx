import LoadingAnime from '@/components/LoadingAnime';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import GoingBuss from '@/assets/animations/BusGoing.json'
import GoingBuss from '@/assets/animations/BusGoing.json';
import LottieView from 'lottie-react-native';
import Toast from "react-native-toast-message";

export default function LoginScreen() {

  const router = useRouter();
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger');
  const [Loading, setLoading] = useState(false);

  const validateForm = () => {
    const isPhone = /^[0-9]{10}$/.test(Phone);
    if (!Phone) {
      Toast.show({
        type: "error",  
        text1: "Invalid Number 🚫",
        visibilityTime: 2500,
        autoHide: true,
      });
      return false;
    }
    if (!isPhone) {
      Toast.show({
        type: "error",  
        text1: "Enter a valid 10-digit phone number 🚫",
        visibilityTime: 3000,
        autoHide: true,
      });
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    setLoading(true);
    if (!validateForm()) return setLoading(false);
    setTimeout(() => {
      router.push({
        pathname: '/Register/OTP',
        params: { phone: Phone },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      enableOnAndroid={true}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-5">
          <ImageBackground
            source={require("../../assets/images/Banner.png")} // ✅ local image
            resizeMode="cover"
            className="flex-1 justify-center items-center w-screen"
          >
          </ImageBackground>
          <View className="px-6 flex-1 flex-col justify-between overflow-hidden">
            <View>
              <View className="flex flex-row items-center my-2">
                <Text className="text-5xl font-bold text-gray-500">Yatra</Text>
                <Image source={require('@/assets/images/btslogo.png')} className="w-10 h-10" />
                <LottieView
                  source={GoingBuss}
                  autoPlay
                  loop
                  style={{ width: 100, height: 60 }}
                />
              </View>
              <Text className="text-3xl my-5 font-bold text-gray-600">Verify your phone number</Text>
              <Text className="text-md font-bold text-gray-500 my-2">
                New account or Already have a yatraQ account? start with your mobile number
              </Text>

              {/* Phone Input */}
              <Text className="text-[#1E40AF] font-bold mt-1">Enter mobile number</Text>
              <View className="flex-row items-center px-3 py-2 border-b-2 border-gray-300 rounded-3xl mt-2">
                <Feather name="phone" size={20} color="#1E40AF" />
                <TextInput
                  className="ml-3 flex-1 text-base text-[#1E40AF]"
                  placeholder="Phone Number"
                  value={Phone}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/\D/g, '');
                    const isValid =
                      cleaned === '' ||
                      (/^[6-9]/.test(cleaned) &&
                        !/(\d)\1{5,}/.test(cleaned) &&
                        cleaned.length <= 10);

                    if (isValid) {
                      setPhone(cleaned);
                    }
                  }}
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View>
              {/* Login Button */}
              <Pressable onPress={handleLogin} className="bg-[#1E40AF] py-3 rounded-3xl">
                <Text className="text-white text-center font-semibold text-lg">Verify</Text>
              </Pressable>

              <Pressable onPress={() => router.push('../HomeScreen')} className="my-3">
                <Link href="/HomeScreen" className="text-center text-base underline">
                  continue without account?
                </Link>
              </Pressable>
            </View>
          </View>
        </View>
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
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
