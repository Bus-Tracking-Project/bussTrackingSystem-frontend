import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter(); // <--- and this
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    const isEmail = emailOrPhone.includes('@') && emailOrPhone.endsWith('.com');
    const isPhone = /^[0-9]{10}$/.test(emailOrPhone);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!emailOrPhone || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return false;
    }

    if (!isEmail && !isPhone) {
      Alert.alert('Invalid Input', 'Enter a valid email or 10-digit phone number.');
      return false;
    }

    if (password.length < 6 || !hasSpecialChar) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters and include a special character.'
      );
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const payload = {
      username: emailOrPhone,
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
    setEmailOrPhone('');
    setPassword('');
    console.log(payload)
    router.navigate('../HomeScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View className='flex-1 bg-white justify-center px-6'>
        <Text className="text-3xl font-bold text-blue-600 mb-10 text-center">Login</Text>

        {/* Email or Phone Input */}
        <View className="flex-row items-center border border-blue-400 rounded-xl px-3 py-2 mb-4">
          <MaterialIcons name="email" size={24} color="#3B82F6" />
          <TextInput
            className="ml-3 flex-1 text-base  text-gray-300"
            placeholder="Email or Phone Number"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center border border-blue-400 rounded-xl px-3 py-2 mb-2">
          <Ionicons name="lock-closed" size={24} color="#3B82F6" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-300"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Forgot Password */}
        <Text className="text-sm text-right text-blue-500 mb-6">Forgot Password?</Text>

        {/* Login Button */}
        <Pressable onPress={handleLogin} className="bg-blue-600 py-3 rounded-xl">
          <Text className="text-white text-center font-semibold text-lg">Login</Text>
        </Pressable>
        {/* Already have account? Button */}
        <Pressable
          onPress={() => router.back()}
          className="mt-4"
        >
          <Link href='/HomeScreen' className="text-blue-500 text-center text-base underline">continue without account?</Link>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
