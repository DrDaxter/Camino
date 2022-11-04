import React, { useCallback, useContext, useEffect } from 'react'
import { StyleSheet, View,Dimensions } from 'react-native';
import { SimpleButtonIconText } from './SimpleButtonIconText';
import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { AnimationHook } from '../hooks/AnimationHook';
import { ContextServicio } from '../context/ServiciosContext';
import {firebase} from '../hooks/firebase/firebase'
import { CalculateNearServices } from '../hooks/CalculateNearServices';
import { useFocusEffect } from '@react-navigation/native';

interface Props{
  userLat:number,
  userLong:number
}

export const HomeButtonsContent = ({
  userLat,
  userLong
}:Props) => {
  const startingPosition = 10;
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const {llenarServicios} = useContext(ContextServicio)
  const {eventHandler,uas} = AnimationHook(screenHeight,startingPosition)
  const {servicios} = firebase()
  const {calculateNearSerices} = CalculateNearServices()

  const getServicios = () =>{
    const result = calculateNearSerices(servicios, userLat, userLong)
    if(result){
      llenarServicios(result)
    }
  }

  return (
    <GestureHandlerRootView style={{
      height:screenHeight / 5,
      width:screenWidth,
    }}>
      <PanGestureHandler onGestureEvent={eventHandler}>
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
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  topElementsContent:{
    alignItems:'center'
  },
  iconBottonSheet:{
    width:50,
    height:2,
    backgroundColor:'#000',
    opacity:0.6
  },
  helOptionsContent:{
    position:'absolute',
    bottom:0,
    height:170,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    justifyContent:'center'
  },
  buttonsContainer:{
      marginVertical:30,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
  },
})