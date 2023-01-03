import React from 'react'
import { ActivityIndicator,Text } from 'react-native'
import { Colors } from '../theme/Colors'

interface Props{
  visible:boolean,
  color:string
}

export const SimpleLoader = ({
  visible,
  color
}:Props) => {
  const renderElement = () => {
    if(visible){
      return (
        <ActivityIndicator
            style={{
              position:'absolute',
              zIndex:1,
              right:'40%'
            }}    
            color={Colors.primary} size={80}
          />
      )
    }else{
      return null
    }
  }

  return (
    renderElement()
  )
}
