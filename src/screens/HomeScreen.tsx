import Geolocation from '@react-native-community/geolocation'
import React, { useEffect, useState, useRef,useMemo,useCallback } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { ExampleLocations } from '../api/DataExample'
import { HomeButtonsContent } from '../components/HomeButtonsContent'
import { MapComponent } from '../components/MapComponent'
import { SimpleButtonIconText } from '../components/SimpleButtonIconText'
import { calculateDistance } from '../hooks/CalculateDistance'
import { firebase } from '../hooks/firebase/firebase'
import { Coords } from '../interfaces/LocationsInterface'
import { Colors } from '../theme/Colors'
import { constStyles } from '../theme/Const'


export const HomeScreen = () => {
  const [currentLc, setCurrentLc] = useState<Coords>()
  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(({coords})=> {
      setCurrentLc(coords)
    })
  }
  

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
            <View style={styles.contentButtomOption}>
              <HomeButtonsContent 
                userLat={currentLc.latitude}
                userLong={currentLc.longitude}
              />
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
  contentButtomOption:{
    position:'absolute',
    bottom:0,
  }
 
})