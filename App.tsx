import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { TabNavigation } from './src/navigation/TabNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  )
}

export default App