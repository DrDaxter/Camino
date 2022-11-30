import React, { useContext, useCallback, useState,useEffect, useReducer } from 'react'
import { Dimensions, Image, Text, View } from 'react-native';
import MapView ,{ PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import { ActionsD, DetailsReducer } from '../context/DetailsReducer';
import { ContextServicio } from '../context/ServiciosContext';
import { DetailInterface } from '../interfaces/ImportantInterface';
import { ServiceDetails } from './ServiceDetails';

interface Props{
  lng:number
  lt:number
}
export const DetailInitialState:DetailInterface = {
  showDetail:false,
  image:"",
  name:"",
  description:""
}

export const MapComponent = ({
  lng ,
  lt 
}:Props) => {
  const [details, setDetails] = useState<DetailInterface>(DetailInitialState)
  const [tracksViewChanges, setTracksViewChanges] = useState(true)
  

  const {servicioState,mainUtils,changeMainUtils} = useContext(ContextServicio)

  useEffect(()=>{
    if(mainUtils.isPinLoading){
      changeMainUtils(false)
    }
  },[servicioState])

  const fillDetailState = (showDetail:boolean, image:string, name:string, description:string) =>
  {
    setDetails({
      showDetail,
      image,
      name,
      description
    })
  }

  
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
                  onPress={()=>fillDetailState(
                    true,
                    item.imageUrl,
                    item.nombre,
                    "")
                  }
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
      {
        details.showDetail && (
          <ServiceDetails 
            image={details?.image!}
            name={details?.name!}
            description={details?.description!}
            closeDetail={fillDetailState}
          />
        )
      }
    </View>
  )
}
