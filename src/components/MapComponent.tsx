import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useCallback, useState,useEffect } from 'react'
import { Dimensions, Text, View } from 'react-native';
import MapView ,{ PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { ContextServicio } from '../context/ServiciosContext';
//import { StateServi } from '../context/ServiciosContext';
import { Servicios } from '../interfaces/ServiciosInterface';

interface Props{
  lng:number
  lt:number
}
export const MapComponent = ({
  lng ,
  lt 
}:Props) => {
  const {servicioState} = useContext(ContextServicio)
  const [nearServices, setNearServices] = useState<Servicios[]>()

  
useFocusEffect(
  useCallback(() => {
    console.log(servicioState.length)
    /* const obj = servicioState.servicios as {}
    const newArr:Servicios[] = Object.values(obj)
    setNearServices(newArr) */
      
  }, [servicioState])
)
  
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
          {
              servicioState.map((item,index) => (
                <Marker
                  key={index}
                  coordinate={{latitude:item.latitude, longitude:item.longitude}}
                  title={item.nombre}
                  description={item.nombre}
                />
              ))
          }
      </MapView>
    </View>
  )
}
