import React, {createContext, useReducer} from 'react'
import { CalculateNearServices } from '../hooks/CalculateNearServices'
import { Servicios } from '../interfaces/ServiciosInterface'
import { ServicioReducer } from './ServicioReducer'

/* export interface StateServi{
    servicios:Servicios[]
} */

//estado inicial
export const InitialState: Servicios[] = []

//auth context props
export interface AuthContextProps{
    servicioState:Servicios[],
    llenarServicios: (servicios: Servicios[])=>void
}

//contexto
export const ContextServicio = createContext({} as AuthContextProps)

export const ServiciosProvider = ({children}:any) => {
    const [servicioState, dispatch] = useReducer(ServicioReducer,InitialState)

    const llenarServicios = (servicios: Servicios[])=>
    {
        dispatch({type:'fillServices',payload: servicios!})   
    }


    return(
        <ContextServicio.Provider value={{
            servicioState,
            llenarServicios 
        }}>
            {children}
        </ContextServicio.Provider>
    )
}
