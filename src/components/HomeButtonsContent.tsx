import React, { useCallback, useContext, useEffect } from 'react'
import { StyleSheet, View,Dimensions } from 'react-native';
import { SimpleButtonIconText } from './SimpleButtonIconText';
import {PanGestureHandler,GestureHandlerRootView, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { AnimationHook } from '../hooks/AnimationHook';
import { ContextServicio } from '../context/ServiciosContext';
import {firebase} from '../hooks/firebase/firebase'
import { CalculateNearServices } from '../hooks/CalculateNearServices';
import { useFocusEffect } from '@react-navigation/native';
import { Servicios } from '../interfaces/ServiciosInterface';

interface Props{
  userLat:number,
  userLong:number
}

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export const HomeButtonsContent = ({
  userLat,
  userLong
}:Props) => {
  const startingPosition = 10;
  const {llenarServicios} = useContext(ContextServicio)
  const {gesture,uas} = AnimationHook(screenHeight,startingPosition)
  const {getFireServicios} = firebase()
  const {calculateNearSerices} = CalculateNearServices()

  const getServicios = async () =>{
    const fireServi:Servicios[] = await getFireServicios()
    if(fireServi){
      const result = calculateNearSerices(fireServi, userLat, userLong)
      console.log(result)
      llenarServicios(result ? result : [])
    }
  }

  return (
    
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{...styles.helOptionsContent,width:screenWidth},uas]} >
          <View style={styles.topElementsContent}>
            <View style={styles.iconBottonSheet}></View>
          </View>
          <View style={styles.buttonsContainer}>
            <SimpleButtonIconText 
              text={"Servicio \nmecánico"}
              iconName="briefcase-outline"
              action={getServicios}
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
        </Animated.View>
      </GestureDetector>
   
  )
}

const styles = StyleSheet.create({
  topElementsContent:{
    marginVertical:10,
    alignItems:'center'
  },
  iconBottonSheet:{
    width:60,
    height:2,
    backgroundColor:'#000',
    opacity:0.6,
    borderRadius:10
  },
  helOptionsContent:{
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  buttonsContainer:{
      marginVertical:30,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
  },
})