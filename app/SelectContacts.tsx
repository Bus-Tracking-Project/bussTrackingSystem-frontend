// // SelectContacts.tsx
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Contacts from 'expo-contacts';
// import React, { useEffect, useState } from 'react';
// import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// const SelectContacts = ({ navigation }) => {
//   const [contacts, setContacts] = useState([]);
//   const [selected, setSelected] = useState([]);

//   // useEffect(() => {
//   //   (async () => {
//   //     const { status } = await Contacts.requestPermissionsAsync();
//   //     if (status !== 'granted') return;

//   //     const { data } = await Contacts.getContactsAsync({
//   //       fields: [Contacts.Fields.PhoneNumbers],
//   //     });

//   //     const filtered = data
//   //       .filter(c => c.phoneNumbers && c.phoneNumbers.length > 0)
//   //       .map(c => ({ name: c.name, number: c.phoneNumbers[0].number }));

//   //     setContacts(filtered);
//   //   })();
//   // }, []);

//   // const toggleSelect = (contact) => {
//   //   const already = selected.find(c => c.number === contact.number);
//   //   if (already) {
//   //     setSelected(selected.filter(c => c.number !== contact.number));
//   //   } else {
//   //     if (selected.length >= 3) {
//   //       Alert.alert("Limit reached", "You can select only 3 contacts");
//   //       return;
//   //     }
//   //     setSelected([...selected, contact]);
//   //   }
//   // };

//   const saveAndGo = async () => {
//     await AsyncStorage.setItem('emergencyContacts', JSON.stringify(selected));
//     navigation.goBack(); // back to SOS screen
//   };

//   return (
//     <View className="flex-1 bg-[#060b22] p-6">
//       <Text className="text-2xl font-bold text-white mb-4">Select up to 3 Contacts</Text>
//       <ScrollView>
//         {contacts.map((c, i) => (
//           <TouchableOpacity
//             key={i}
//             onPress={() => toggleSelect(c)}
//             className={`p-4 mb-2 rounded-xl ${selected.find(x => x.number === c.number) ? 'bg-green-600' : 'bg-gray-800'}`}
//           >
//             <Text className="text-white">{c.name} ({c.number})</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <TouchableOpacity onPress={saveAndGo} className="bg-blue-500 py-4 rounded-xl mt-4">
//         <Text className="text-white text-center font-bold">Save Contacts</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SelectContacts;
