import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ServiciosProvider } from './src/context/ServiciosContext'
import { TabNavigation } from './src/navigation/TabNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <TabNavigation />
      </AppState>
    </NavigationContainer>
  )
}

const AppState = ({children}:any) =>{
  return (
    <ServiciosProvider>
      {children}
    </ServiciosProvider>
  )
}

export default App