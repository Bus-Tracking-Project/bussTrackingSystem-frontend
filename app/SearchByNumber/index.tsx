import FromToSearch from '@/components/FromTo'
import BottomNavBar from '@/components/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'


const index = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <BottomNavBar />
      <FromToSearch/>
    </SafeAreaView>
  )
}

export default index