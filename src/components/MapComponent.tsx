import React from 'react'
import { Dimensions } from 'react-native';
import MapView ,{ PROVIDER_GOOGLE } from "react-native-maps";

interface Props{
  lng:number
  lt:number
}
export const MapComponent = ({
  lng ,
  lt 
}:Props) => {
  console.log(lng,lt)
  return (
    <MapView
          provider={PROVIDER_GOOGLE}
          style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
          initialRegion={{
          latitude: lt,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
  )
}
