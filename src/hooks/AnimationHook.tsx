import React ,{useEffect,useCallback} from 'react'
import { Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const AnimationHook = (
    screenHeight:number,
    startingPosition:number
) => {
    const y = useSharedValue(0);
    const context = useSharedValue({y: y.value})
    const MAX_TOP_Y = -screenHeight + (screenHeight/1.3)

    const doScrollTo = useCallback((toValue:number)=>{
      'worklet'
      y.value = withSpring(toValue, {damping:50})
    },[]) 

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: y.value}
      })
      .onUpdate((event) => {
        y.value = event.translationY + context.value.y
        y.value = Math.max(y.value,MAX_TOP_Y)
        console.log(y.value)
      })
      .onEnd(() => {
        console.log("TO UP",-screenHeight / 7)
       
        if(y.value > -screenHeight/7){
          console.log("DOWN")
          doScrollTo(-screenHeight/10)
        }else if(y.value < -screenHeight/9){
          doScrollTo(MAX_TOP_Y)
        }
    });

    useEffect(() => {
      doScrollTo(-screenHeight / 4)
    }, [])
    

    const uas = useAnimatedStyle(() => {
        return {
          backgroundColor:'#fafafa',
          transform: [{ translateY: y.value }],
        };
    });

    return{
        gesture,
        uas
    }
}
