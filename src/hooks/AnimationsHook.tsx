import { useEffect, useRef } from "react"
import { Animated } from "react-native"
import {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated'

export const AnimationsHook = () => {
   /*  const formContentResize = useRef(new Animated.Value(1)).current */
   const animation = useSharedValue({width:"100%",height:200})

   const animationStyle = useAnimatedStyle(() => {
        return{
            width: withTiming(animation.value.width,{
                duration:1000
            }),
            height: withTiming(animation.value.height,{
                duration:600
            })
        }
    })

   const formContentResizeAnimation = (height:number) => animation.value = {width:"100%",height:height}
   /*  const formContentResizeAnimation = () => {
        console.log("Hook activated")
        Animated.timing(
            formContentResize,
            {
                toValue:0,
                duration:1000,
                useNativeDriver:true
            }
        ).start()
    } */

  return {
    animationStyle,
    formContentResizeAnimation
  }
}
