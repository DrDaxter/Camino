import Geolocation from '@react-native-community/geolocation'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { ExampleLocations } from '../api/DataExample'
import { MapComponent } from '../components/MapComponent'
import { calculateDistance } from '../hooks/CalculateDistance'
import { Coords } from '../interfaces/LocationsInterface'
import { Colors } from '../theme/Colors'

export const HomeScreen = () => {
  const [currentLc, setCurrentLc] = useState<Coords>()
  const exampleLocations = ExampleLocations()
  
  const getLocation = async () => {
    await Geolocation.getCurrentPosition(({coords})=> {
      setCurrentLc(coords)
    })
  }

  const getFinalTrial = () => {
    const meters = calculateDistance(
      currentLc?.latitude!,
      currentLc?.longitude!,
      exampleLocations[0].latitude,
      exampleLocations[0].longitude
    )

    console.log("METROS DE DISTANCIA",meters)
  }

  useEffect(() => {
    getLocation()
  }, [])

  const renderLoader = () => {
    return(
      <View style={styles.loaderContent}>
        <ActivityIndicator color={Colors.primary} size={100}/>
      </View>
    )
  }

  return (
    <View style={styles.content}>
      {
        currentLc?.longitude
        ? (
          <View>
            <MapComponent 
              lng={currentLc.longitude}
              lt={currentLc.latitude}
            />

            <TouchableOpacity style={{
                position:'absolute',
                backgroundColor:'yellow',
                width:100,
                height:100
              }}
              onPress={() => getFinalTrial()}
            >
              <Text>Calcular distancia</Text>
            </TouchableOpacity>
          </View>
        )
        :(
         renderLoader()
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