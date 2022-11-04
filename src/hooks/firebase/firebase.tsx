import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Servicios } from '../../interfaces/ServiciosInterface';

export const firebase = () => {
    const [servicios, setServicios] = useState<Servicios[]>([])

  const getServicios = async()=>{
    const fireServicios = await firestore().collection('servicios').get()
    fireServicios.forEach(item => {
      setServicios(current => [...current,item.data() as Servicios])
    }) 
  }

  useEffect(() => {
    getServicios()
  }, [])
  

 return{
  servicios
 }
}
