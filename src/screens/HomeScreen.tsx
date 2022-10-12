import Geolocation from '@react-native-community/geolocation'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { MapComponent } from '../components/MapComponent'
import { Coords } from '../interfaces/LocationsInterface'
import { Colors } from '../theme/Colors'

export const HomeScreen = () => {
  const [currentLc, setCurrentLc] = useState<Coords>()
  
  const getLocation = async () => {
    await Geolocation.getCurrentPosition(({coords})=> {
      setCurrentLc(coords)
    })
  }

useEffect(() => {
  getLocation()
}, [])

  

  return (
    <View style={styles.content}>
      {
        currentLc?.longitude
        ? (
          <MapComponent 
            lng={currentLc.longitude}
            lt={currentLc.latitude}
          />
        )
        :(
          <View style={styles.loaderContent}>
            <ActivityIndicator color={Colors.primary} size={100}/>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  content:{
    flex:1,
  },
  
  loaderContent:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})