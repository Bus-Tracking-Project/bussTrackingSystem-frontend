import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger');

  const validateForm = () => {
    // const isEmail = Phone.includes('@') && Phone.endsWith('.com');
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPhone = /^[0-9]{10}$/.test(Phone);
    console.log(isPhone, 'from isPhone')
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
    // <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
    <LinearGradient
      colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
      start={{ x: 0.5, y: 0 }} // top center
      end={{ x: 0.5, y: 1 }}   // bottom center
      className="flex-1 justify-center items-center py-10 px-8"
    >
      <BlurView intensity={50} tint="light" className='px-6 flex-1 flex-col justify-between border border-gray-300 rounded-2xl overflow-hidden'>
        <View >
          <Text className="text-4xl font-bold text-[#1E40AF] my-10">Bus Yatra Q</Text>
          <Text className='text-2xl font-bold text-[#1E293B] my-2'>Sign Up Or Log in</Text>
          <Text className='text-md font-bold text-gray-500 my-2'>New account or Already have a Bus yatra account? start with your mobile number</Text>

          {/* Phone Input */}
          <Text className="text-[#1E40AF] font-bold my-2">Enter mobile number</Text>
          <View className="flex-row items-center px-3 py-2 border-b-2 border-gray-400 my-2">
            <Feather name="phone" size={20} color="#1E40AF" />
            <TextInput
              className="ml-3 flex-1 text-base text-[#1E40AF]"
              placeholder="Phone Number"
              value={Phone}
              onChangeText={(text) => {
                const cleaned = text.replace(/\D/g, "");
                // Regex: starts with 6–9, max 10 digits, and no digit repeated more than 5 times consecutively
                const isValid =
                  cleaned === "" ||
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
              placeholderTextColor="#1E40AF"
            />
          </View>
          {/* <Text className='text-gray-300 font-bold my-2'>Select Role</Text>
          <View className="flex-row items-center border-b-2 border-gray-600 my-2 px-3 py-2">
            <Feather name="user" size={20} color="#6644b5" />
            <Picker
              selectedValue={role}
              onValueChange={setRole}
              style={{ color: 'gray', backgroundColor: 'transparent', flex: 1 }} //using style becouse picker don't sapport classname
              dropdownIconColor="#6644b5"
            >
              <Picker.Item label="Passenger" value="passenger" />
              <Picker.Item label="Driver" value="driver" />
              <Picker.Item label="Conductor" value="conductor" />
            </Picker>
          </View> */}
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
          {/* <Text className="text-sm text-right text-[#6644b5] mb-6">Forgot Number?</Text> */}

        </View>
        <View>
          {/* Login Button */}
          <Pressable onPress={handleLogin} className="bg-[#1E40AF] py-3 rounded-3xl">
            <Text className="text-gray-300 text-center font-semibold text-lg">Verify</Text>
          </Pressable>

          <Pressable onPress={() => router.push('../HomeScreen')} className="my-3">
            <Link href='/HomeScreen' className="text-[#6644b5] text-center text-base underline">continue without account?</Link>
          </Pressable>
        </View>
      </BlurView>
    </LinearGradient>
    // </SafeAreaView>
  );
}
