import React, { useEffect, useState } from 'react'
import { Servicios } from '../interfaces/ServiciosInterface'
import {calculateDistance} from './CalculateDistance'

interface Props{
    
}

export const CalculateNearServices = (
    
) => {
    const calculateNearSerices = (
        servicios:Servicios[],
        userLat:number,
        userLng:number
    )=>{
        let servicesArr: Servicios[] = [];
        servicios.forEach(items => {
            const meters = calculateDistance(
                userLat,
                userLng,
                items.latitude,
                items.longitude
            )
            if(Number(meters) <= 1){
                servicesArr.push(items)
            }
        })

        return servicesArr
    }

    /* useEffect(() => {
        calculateNearSerices()
    }, []) */
    
    return{
        calculateNearSerices
    }
}
