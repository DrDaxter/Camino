import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';

export const firebase = () => {
    const [servicios, setServicios] = useState<any>()
  const getServicios = async()=>{
    const servicios = await firestore().collection('servicios').get()
    servicios.forEach(item => {
      console.log(item.data())
    }) 
  }

  useEffect(() => {
    getServicios()
  }, [])
  

 
}
