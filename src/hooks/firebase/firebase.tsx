import React, { useContext } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Servicios } from '../../interfaces/ServiciosInterface';
import { ContextServicio } from '../../context/ServiciosContext';

export const firebase = () => {
  const {changeMainUtils} = useContext(ContextServicio)

  const getFireServicios = async()=>{
    changeMainUtils(true)
    let servicesArr:Servicios[] = []
    const fireServicios = await firestore().collection('servicios').get()
    fireServicios.forEach(item => {
      servicesArr.push({...item.data() as Servicios})
    })
    return servicesArr
  }

  const saveData = async (document:any) => {
    const response = await firestore().collection('user')
    .doc(document.uid)
    .set({...document})

    return response
  }
  

 return{
  getFireServicios,
  saveData
 }
}
