import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { ServiciosProvider } from './src/context/ServiciosContext'
import { TabNavigation } from './src/navigation/TabNavigation'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const App = () => {
  GoogleSignin.configure({
    webClientId:'227363245977-4ro255dani9lq7rsca5mq84i3g9nc4n7.apps.googleusercontent.com'
  })
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