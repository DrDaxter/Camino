import Geolocation from '@react-native-community/geolocation'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { ExampleLocations } from '../api/DataExample'
import { MapComponent } from '../components/MapComponent'
import { SimpleButtonIconText } from '../components/SimpleButtonIconText'
import { calculateDistance } from '../hooks/CalculateDistance'
import { Coords } from '../interfaces/LocationsInterface'
import { Colors } from '../theme/Colors'
import { constStyles } from '../theme/Const'

export const HomeScreen = () => {
  const screenWidth = Dimensions.get('screen').width
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
          <View style={styles.mapContent}>
            <MapComponent 
              lng={currentLc.longitude}
              lt={currentLc.latitude}
            />

            <View style={{...styles.helOptionsContent, width:screenWidth}}>
              <View style={styles.buttonsContainer}>
                <SimpleButtonIconText 
                  text={"Servicio \nmecánico"}
                  iconName="briefcase-outline"
                />
                <SimpleButtonIconText 
                  text={"Cambio de \nllantas"}
                  iconName="build-outline"
                />
                <SimpleButtonIconText 
                  text={"Servicio de \ngrua"}
                  iconName="car-outline"
                />
              </View>
            </View>
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
  helOptionsContent:{
    position:'absolute',
    backgroundColor:'#fafafa',
    bottom:0,
    height:170,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    justifyContent:'center'
  },
  buttonsContainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
 
})