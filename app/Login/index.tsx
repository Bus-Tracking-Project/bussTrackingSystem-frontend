import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter(); // <--- and this
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    // const isEmail = Phone.includes('@') && Phone.endsWith('.com');
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPhone = /^[0-9]{10}$/.test(Phone);
console.log(isPhone,'from isPhone')
    if (!Phone) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      console.log('in loop false')
      return false;
    }

    // if (!isEmail && !isPhone) {
    //   Alert.alert('Invalid Input', 'Enter a valid email or 10-digit phone number.');
    //   return false;
    // }

    // if (password.length < 6 || !hasSpecialChar) {
    //   Alert.alert(
    //     'Weak Password',
    //     'Password must be at least 6 characters and include a special character.'
    //   );
    //   return false;
    // }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const payload = {
      username: Phone,
      password: password,
    };

    // API call is commented - Not ready yet

    // try {
    //   const res = await fetch('http://localhost:3000/user/register/verify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await res.json();

    //   if (res.ok) {
    //     Alert.alert('Success', 'Login successful!');
    //   } else {
    //     Alert.alert('Error', data.message || 'Something went wrong');
    //   }
    // } catch (error) {
    //   console.error('API Error:', error);
    //   Alert.alert('Error', 'Could not connect to server');
    // }


    // Clear form after submission and console data
    setPhone('');
    setPassword('');
    console.log(payload)
    router.navigate('../Register/OTP');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1a23', }}>
      <View className='bg-[#1d1a23] px-6 flex-1 flex-col justify-between'>
        <View >
          <Text className="text-4xl font-bold text-[#6644b5] my-10">Bus Yatra Q</Text>
          <Text className='text-2xl font-bold text-gray-300 my-2'>Log in</Text>
          <Text className='text-md font-bold text-gray-500 my-2'>Already have a Bus yatra account? start with your mobile number</Text>

          {/* Phone Input */}
          <Text className='text-gray-300 font-bold my-2'>Enter mobile number</Text>
          <View className="flex-row items-center px-3 py-2 border-b-2 border-gray-600 my-2">
            <Feather name="phone" size={20} color="#6644b5" />
            <TextInput
              className="ml-3 flex-1 text-base  text-gray-300"
              placeholder="Phone Number"
              value={Phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password Input 
          <View className="flex-row items-center border-b-2 border-gray-600  px-3 py-2 mb-2">
            <Ionicons name="lock-closed" size={20} color="#6644b5" />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-300"
              placeholderTextColor="#9CA3AF"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>*/}

          {/* Forgot Password */}
          <Text className="text-sm text-right text-[#6644b5] mb-6">Forgot Number?</Text>

        </View>
        <View>
          {/* Login Button */}
          <Pressable onPress={handleLogin} className="bg-[#6644b5] py-3 rounded-3xl">
            <Text className="text-gray-300 text-center font-semibold text-lg">Verify</Text>
          </Pressable>

          <Pressable onPress={() => router.push('../HomeScreen')} className="m-2">
            <Link href='/HomeScreen' className="text-[#6644b5] text-center text-base underline">continue without account?</Link>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
