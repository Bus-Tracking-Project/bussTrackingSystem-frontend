import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function RegisterForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
    const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

    const handleSubmit = async () => {
        const { fullname, email, phone, password, confirmPassword } = form;

        // 1. Validate form fields
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Error 🚫', 'All fields are required');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email 📨', 'Enter a valid email');
            return;
        }

        if (!isValidPhone(phone)) {
            Alert.alert('Invalid Phone 📞', 'Phone number must be 10 digits');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch ❌', 'Passwords do not match');
            return;
        }

        try {
            // 2. Get location permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location access is required');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            };

            const payload = {
                fullname,
                email,
                phone,
                password,
                location: coords,
            };

            console.log('📤 Sending to backend:', payload);

            // 3. Send to backend
            // const res = await fetch('http://localhost:3000/user/register/send-otp', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(payload),
            // });

            // const responseData = await res.json();

            // if (res.ok && responseData.message === 'OTP Sent') {
            Alert.alert('OTP Sent ✅', 'Check your phone for the OTP');

            // Navigate to OTP screen and pass form data via params
            router.push({
                pathname: '/Register/OTP',
                params: {
                    phone: form.phone,
                    fullname: form.fullname,
                    email: form.email,
                    password: form.password,
                },
            });

            setForm({
                fullname: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
            });
            // } else {
            //   Alert.alert('Error', responseData.message || 'Something went wrong');
            // }
        } catch (err) {
            console.error(err);
            Alert.alert('Network Error 🌐', 'Failed to send OTP');
        }
    };

    return (
        <View className="my-auto">
            <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
                <Text className="text-3xl font-bold text-blue-600 mb-10 text-center">Register</Text>

                {/* Full Name */}
                <View className="flex-row items-center border border-blue-400 rounded-xl px-3 py-2 mb-4">
                    <Feather name="user" size={24} color="#3B82F6" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Full Name"
                        className="flex-1"
                        value={form.fullname}
                        onChangeText={(text) => handleChange('fullname', text)}
                    />
                </View>

                {/* Email */}
                <View className="flex-row items-center border border-blue-600 rounded-xl px-3 py-2 mb-4">
                    <MaterialIcons name="email" size={24} color="#3B82F6" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        className="flex-1"
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                </View>

                {/* Phone */}
                <View className="flex-row items-center border border-blue-600 rounded-xl px-3 py-2 mb-4">
                    <Feather name="phone" size={24} color="#3B82F6" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Phone"
                        keyboardType="numeric"
                        maxLength={10}
                        className="flex-1"
                        value={form.phone}
                        onChangeText={(text) => handleChange('phone', text)}
                    />
                </View>

                {/* Password */}
                <View className="flex-row items-center border border-blue-600 rounded-xl px-3 py-2 mb-4">
                    <Feather name="lock" size={24} color="#3B82F6" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        className="flex-1"
                        value={form.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                </View>

                {/* Confirm Password */}
                <View className="flex-row items-center border border-blue-600 rounded-xl px-3 py-2 mb-4">
                    <Feather name="lock" size={24} color="#3B82F6" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        className="flex-1"
                        value={form.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                    />
                </View>

                {/* Submit Button */}
                <Pressable onPress={handleSubmit} className="bg-blue-600 px-4 py-3 rounded-xl mt-2">
                    <Text className="text-white text-center font-semibold text-lg">Verify</Text>
                </Pressable>

                {/* Already have account */}
                <View className='text-sm mx-auto my-3'>
                    <Text className='text-sm'>
                        <Link href='./Login' className='text-blue-600 underline'> Already have account? Login</Link>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
