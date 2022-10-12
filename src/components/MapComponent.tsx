import React from 'react'
import { Dimensions, View } from 'react-native';
import MapView ,{ PROVIDER_GOOGLE, Marker } from "react-native-maps";

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
    <View style={{flex:1}}>
      <MapView
            provider={PROVIDER_GOOGLE}
            style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
            initialRegion={{
            latitude: lt,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker 
            coordinate={{latitude:lt, longitude:lng}}
          />
      </MapView>
    </View>
  )
}
