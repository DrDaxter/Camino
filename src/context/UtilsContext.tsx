import { createContext, useReducer } from "react"
import { UtilsReducer } from "./UtilsReducer"

export interface MainUtils {
    isPinLoading:boolean
}

const InitialState: MainUtils = {
    isPinLoading:false
}

export interface UtilsContextProps{
    mainUtils: MainUtils,
    changeMainUtils: (isPinLoading:boolean)=>void
}

export const ContextUtils = createContext({} as UtilsContextProps)


export const [mainUtils, dispatch] = useReducer(UtilsReducer,InitialState)