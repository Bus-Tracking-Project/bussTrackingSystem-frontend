import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

export default function VerifyOtpScreen() {
  const { phone } = useLocalSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

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

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      Alert.alert('Invalid OTP ❌', 'Please enter the complete OTP');
      return;
    }

    const payload = { phone, otp: otpCode };
    console.log('🚀 Verifying:', payload);

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
    Alert.alert('Mock Success ✅', `Verified OTP: ${otpCode}`);
    router.navigate('../HomeScreen');
  };

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
    <LinearGradient
      colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
      start={{ x: 0.5, y: 0 }} // top center
      end={{ x: 0.5, y: 1 }}   // bottom center
      className='px-6 flex-1 flex-col justify-between py-11'
    >
      <BlurView intensity={50} tint="light" className='px-6 flex-1 flex-col justify-between border border-gray-300 rounded-2xl overflow-hidden'>
        <View className='flex-1 justify-center'>
          <Text className="text-4xl font-bold text-[#1E40AF] mb-4 text-center">Verify OTP</Text>
          <Text className="text-center text-gray-600 mb-6">
            OTP sent to <Text className="font-semibold text-[#1E40AF]">{getMaskedPhone()}</Text>
          </Text>

          {/* OTP Inputs */}
          <View className="flex-row justify-between mb-6">
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
          <Pressable onPress={handleVerify} className="bg-[#1E40AF] py-3 rounded-3xl">
            <Text className="text-gray-300 text-center text-lg font-semibold">Verify</Text>
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
      </BlurView>
    </LinearGradient>
    // </SafeAreaView>
  );
}
