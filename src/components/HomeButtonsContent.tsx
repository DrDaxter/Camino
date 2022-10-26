import React from 'react'
import { StyleSheet, View,Dimensions } from 'react-native';
import { SimpleButtonIconText } from './SimpleButtonIconText';
import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const HomeButtonsContent = () => {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const startingPosition = 10;
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
    },
    onActive: (event, ctx) => {
      if(event.translationY >= 0){
        y.value = event.translationY;
      }
      console.log(y.value)
    },
    onEnd: (event, ctx) => {
      if(y.value < (screenHeight/3) && y.value > 1){
        y.value = (screenWidth /3)
      }else if(y.value > 1 && y.value >= 0){
        y.value = withSpring(startingPosition)
      }
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor:'#fafafa',
      transform: [{ translateY: y.value }],
    };
  });

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