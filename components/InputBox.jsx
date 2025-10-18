import { Text, View } from 'react-native'

const InputBox = () => {
    return (
        <TouchableOpacity
            className="border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4"
            onPress={() => router.push("../SearchByNumber")}
        >
            <View className="flex-1 items-center justify-center bg-white">
                <Image
                    source={require("../../assets/images/license_plate.png")}
                    className="w-20 h-20"
                />
                <Text className="text-1xl font-semibold text-center bg-white">Search By Number</Text>
            </View>
        </TouchableOpacity>
    )
}

export default InputBox
