import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useCallback, useState,useEffect } from 'react'
import { Dimensions, Image, Text, View } from 'react-native';
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
  const {servicioState,mainUtils,changeMainUtils} = useContext(ContextServicio)
  const [tracksViewChanges, setTracksViewChanges] = useState(true)

  useEffect(()=>{
    console.log("CAMBIO servicioState")
    if(mainUtils.isPinLoading){
      changeMainUtils(false)
      console.log("SE CAMBIO EL LOADING DE PINS")
    }
  },[servicioState])
  
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
                  tracksViewChanges={tracksViewChanges}
                >
                  <Image
                    onLoad={()=> setTracksViewChanges(false)}
                    style={{ 
                      width: 50,
                      height: 50
                    }}
                    source={{
                      uri: item.imageUrl ?? '',
                    }}
                    fadeDuration={0}
                  />
                </Marker>
              ))
          }
      </MapView>
    </View>
  )
}
