import React,{useState,useRef,useEffect} from 'react'
import {StyleSheet,View,TextInput,Text,Animated, Easing, TouchableWithoutFeedback} from 'react-native'
import { Colors } from '../theme/Colors'

interface Props {
    label:string,
    value:string,
    onValueChange: (value: string) => void
    onBlurChange: (e: FocusEvent) => void
}

export const InputLable = ({
   label,
   value,
   onValueChange,
   onBlurChange
}:Props) => {

    const [isFocused, setIsFocused] = useState(false)
    const focusAnim = useRef(new Animated.Value(0)).current
    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
      Animated.timing(
        focusAnim,
        {
            toValue: isFocused || !!value ? 1 : 0,
            duration:150,
            useNativeDriver:true,
            easing: Easing.bezier(0.4,0,0.2,1)
        }
      ).start()
    }, [focusAnim,isFocused])
    
  return (
    <View>
        <TextInput 
        style={{
            ...styles.input,
            borderColor: isFocused ? Colors.black1 : Colors.gray2
        }}
        onChangeText={onValueChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
                onBlurChange?.(e)
                setIsFocused(false)
            }}
            value={value}
            ref={inputRef}
        />
        <Animated.View 
            style={{
            ...styles.labelContainer, 
            transform:[
                {
                    scale:focusAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[1,0.75]
                    })
                },
                {
                    translateY: focusAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[24,-12]
                    })
                },
                //se removio el translate X
            ]
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => inputRef.current?.focus()}
            >
                <Animated.Text style={{
                    ...styles.label, 
                    color: isFocused ? '#080F9C' : '#B9C4CA'
                    }}
                    
                    >
                    {label}
                </Animated.Text>
            </TouchableWithoutFeedback>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        left: 10,
        top: -4,
        paddingHorizontal: 8,
        backgroundColor: Colors.white2,
    },
    label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 12,
        color:Colors.black1
    },
    input: {
        paddingLeft:15,
        paddingRight:24,
        paddingTop:24,
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 2,
        fontFamily: 'Avenir-Medium',
        fontSize: 13,
        color:Colors.black1,
    }
  })