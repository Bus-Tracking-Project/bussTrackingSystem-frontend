import LoadingAnime from '@/components/LoadingAnime';
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger');
  const [Loading, setLoading] = useState(false)

  const validateForm = async () => {
    const isPhone = /^[0-9]{10}$/.test(Phone);
    if (!Phone) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return false;
    }
    if (!isPhone) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
    setLoading(true);
    // Navigate to OTP screen and send phone as param
    setTimeout(() => {
      setLoading(false);

      // Navigate to OTP screen with phone param
      router.push({
        pathname: '/Register/OTP',
        params: { phone: Phone },
      });
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust as needed
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
                <Text className="text-5xl font-bold">Yatra</Text>
                <Image source={require('@/assets/images/btslogo.png')} className="w-10 h-10" />
              </View>
              <Text className="text-2xl font-bold text-[#1E293B]">Sign Up Or Log in</Text>
              <Text className="text-md font-bold text-gray-500 my-2">
                New account or Already have a yatraQ account? start with your mobile number
              </Text>

              {/* Phone Input */}
              <Text className="text-[#1E40AF] font-bold my-2">Enter mobile number</Text>
              <View className="flex-row items-center px-3 py-2 border-b-2 border-gray-400 my-2">
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
    </KeyboardAvoidingView>
  );
}
