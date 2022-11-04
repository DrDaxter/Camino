import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const AnimationHook = (
    screenHeight:number,
    startingPosition:number
) => {
    const y = useSharedValue(startingPosition);

    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
        },
        onActive: (event, ctx) => {
          if(event.translationY >= 0){
            y.value = event.translationY;
          }
        },
        onEnd: (event, ctx) => {
          console.log(screenHeight/7)
          if(y.value < (screenHeight/7) && y.value > 1){
            y.value = (screenHeight /7)
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

    return{
        eventHandler,
        uas
    }
}
