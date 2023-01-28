import React,{useState,useRef,useEffect} from 'react'
import {StyleSheet,View,TextInput,Text,Animated, Easing} from 'react-native'
import { Colors } from '../theme/Colors'
import { formProps } from '../components/forms/LoginForm';

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
    const [text, setText] = useState("")
    const focusAnim = useRef(new Animated.Value(0)).current

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
        style={styles.input}
        onChangeText={onValueChange}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
                onBlurChange?.(e)
                setIsFocused(false)
            }}
            value={value}
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
                {
                    translateX:focusAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[16,0]
                    })
                }
            ]
            }}
        >
            <Animated.Text style={{
                ...styles.label, 
                color: isFocused ? '#080F9C' : '#B9C4CA'
                }}>
                {label}
            </Animated.Text>
        </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        left: 16,
        top: -6,
        paddingHorizontal: 8,
        backgroundColor: Colors.white2,
    },
    label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 12,
        color:Colors.black1
    },
    input: {
      padding: 24,
      borderColor: '#B9C4CA',
      borderWidth: 1,
      borderRadius: 2,
      fontFamily: 'Avenir-Medium',
      fontSize: 13,
      color:Colors.black1
    }
  })