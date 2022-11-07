import React, {createContext, useReducer} from 'react'
import { CalculateNearServices } from '../hooks/CalculateNearServices'
import { Servicios } from '../interfaces/ServiciosInterface'
import { ServicioReducer } from './ServicioReducer'
import { UtilsReducer } from './UtilsReducer'

export interface MainUtils {
    isPinLoading:boolean
}

const InitialState2: MainUtils = {
    isPinLoading:false
}

//estado inicial
export const InitialState: Servicios[] = []

//auth context props
export interface AuthContextProps{
    servicioState:Servicios[],
    mainUtils: MainUtils,
    llenarServicios: (servicios: Servicios[])=>void,
    changeMainUtils: (isPinLoading:boolean)=>void
}

//contexto
export const ContextServicio = createContext({} as AuthContextProps)

export const ServiciosProvider = ({children}:any) => {
    const [servicioState, dispatch] = useReducer(ServicioReducer,InitialState)

    const [mainUtils, utilsDispatch] = useReducer(UtilsReducer,InitialState2)

    const llenarServicios = (servicios: Servicios[])=>
    {
        dispatch({type:'fillServices',payload: servicios!})   
    }

    const changeMainUtils = (isPinLoading:boolean) => {
        utilsDispatch({type:'changeMainUtils',payload:{isPinLoading:isPinLoading}})
    }


    return(
        <ContextServicio.Provider value={{
            servicioState,
            mainUtils,
            llenarServicios,
            changeMainUtils
        }}>
            {children}
        </ContextServicio.Provider>
    )
}
