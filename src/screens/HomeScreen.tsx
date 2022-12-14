import Geolocation from '@react-native-community/geolocation'
import React, { useEffect, useState,useContext,useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import { HomeButtonsContent } from '../components/HomeButtonsContent'
import { MapComponent } from '../components/MapComponent'
import { SimpleAlert } from '../utils/SimpleAlert'
import { ContextServicio } from '../context/ServiciosContext'
import { Coords } from '../interfaces/LocationsInterface'
import { Colors } from '../theme/Colors'


export const HomeScreen = () => {
  const {mainUtils} = useContext(ContextServicio)
  const [currentLc, setCurrentLc] = useState<Coords>()
  const simpleAlert = SimpleAlert()

  useEffect(
    useCallback(()=>{
      getLocation()
    },[])
  )

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(
      ({coords})=> {
        setCurrentLc(coords)
      },
      (Error?) =>{
        simpleAlert("Error de carga",`Ha habido un problema al cargar tu dirección (${Error?.code})`)
      }
    )
  }
  

  const renderLoader = () => {
    return(
      <View style={styles.loaderContent}>
        <ActivityIndicator color={Colors.primary} size={100}/>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={styles.content}>
      {
        mainUtils.isPinLoading && (
          <ActivityIndicator
            style={{
              position:'absolute',
              zIndex:1,
              right:'40%'
            }} 
            color={Colors.primary} size={80}
          />
        )
      }
      {
        currentLc?.longitude
        ? (
          <View style={styles.mapContent}>
            <MapComponent 
              lng={currentLc.longitude}
              lt={currentLc.latitude}
            />
            {/* <EjemploButtomSheet /> */}
            <HomeButtonsContent 
                userLat={currentLc.latitude}
                userLong={currentLc.longitude}
              />
          </View>
        )
        :(
         renderLoader()
        )
      }
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  content:{
    flex:1
  },
  mapContent:{
    flex:1,
  },
  loaderContent:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  contentButtomOption:{
    position:'absolute',
    bottom:0,
  }
 
})