import LoadingAnime from '@/components/LoadingAnime';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { setRole } = useAuth();
  const { phone } = useLocalSearchParams<{ phone: string }>(); // ✅ Phone from Login
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [roles, setRoles] = useState('passanger')
  const [Loading, setLoading] = useState(false)

  const inputs = useRef<Array<TextInput | null>>([]);
  // Countdown logic
  useEffect(() => {
    if (resendDisabled && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer, resendDisabled]);
 
  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-focus previous if deleted
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    setLoading(true);
    const otpValue = otp.join('');
    setTimeout(() => {
      setLoading(false);
      if (otpValue === '111111') {
        if (phone === '9090909090') {
          setRole("driver")
          router.replace('/DriverHomeScreen' as any); // Admin route
        } else if (phone === '8080808080') {
          setRole("conductor");
          router.replace('/Conductor' as any);
        } else {
          setRole("passenger")
          router.replace('/HomeScreen')
        }
      } else {
        alert('Invalid OTP');
      }
      // try {
      //   const res = await fetch('http://localhost:3000/user/register/verify', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload),
      //   });

      //   const data = await res.json();
      //   if (res.ok) {
      //     Alert.alert('Success 🎉', 'OTP Verified!');
      //     router.replace('/home');
      //   } else {
      //     Alert.alert('Error ❌', data.message || 'Invalid OTP');
      //   }
      // } catch (err) {
      //   Alert.alert('Network Error 🌐', 'Could not verify OTP');
      // }

      // Mock success:
      // router.navigate('../HomeScreen');
    }, 2000)
  }

  const handleResend = () => {
    if (resendDisabled) return;

    // Reset countdown
    setTimer(30);
    setResendDisabled(true);

    // try {
    //   await fetch('http://localhost:3000/user/register/send-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ phone }),
    //   });

    //   Alert.alert('OTP Resent 📩', 'Check your phone again');
    // } catch (err) {
    //   Alert.alert('Error ❌', 'Failed to resend OTP');
    // }

    // Mock resend:
    Alert.alert('Mock Resent ✅', `OTP resent to ${phone}`);
  };

  const getMaskedPhone = () => {
    const str = phone?.toString() || '';
    return '9*******' + str.slice(-3);
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
        <View className='flex-1 flex-col justify-center'>
          <ImageBackground
            source={require("../../assets/images/Banner.png")} // ✅ local image
            resizeMode="cover"
            className="flex-1 w-screen"
          >
          </ImageBackground>
          <View className="px-6 flex-1 flex-col justify-between overflow-hidden">
            <View>
              <Text className="text-3xl font-bold text-[#1E40AF] my-5">Verify OTP</Text>
              <Text className=" text-gray-600 mb-6">
                OTP sent to <Text className="font-semibold text-[#1E40AF]">{getMaskedPhone()}</Text>
              </Text>

              {/* OTP Inputs */}
              <View className="flex-row justify-between mx-3 mb-6">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => { inputs.current[index] = el; }}
                    className="w-12 h-12 text-xl text-black text-center border border-[#1E40AF] rounded-lg"
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                  />
                ))}
              </View>
            </View>
            <View>
              {/* Verify Button */}
              <Pressable onPress={verifyOtp} className="bg-[#1E40AF] py-3 rounded-3xl">
                <Text className="text-white text-center text-lg font-semibold">Verify</Text>
              </Pressable>
              {/* Resend OTP */}
              <View className="my-2.5 flex-row justify-center">
                {resendDisabled ? (
                  <Text className="text-gray-500">Resend OTP in {timer}s</Text>
                ) : (
                  <Pressable onPress={handleResend}>
                    <Text className="text-[#1E40AF] font-semibold underline">Resend OTP</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View >
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
