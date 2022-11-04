import { CalculateNearServices } from "../hooks/CalculateNearServices";
import { Servicios } from "../interfaces/ServiciosInterface";
//import { StateServi } from "./ServiciosContext";

type Actions = 
| {type: 'fillServices', payload: Servicios[]}

export const ServicioReducer = (state:Servicios[], action:Actions): Servicios[] => {
    const {payload} = action
    
    switch (action.type) {
        case 'fillServices':
            return payload
            break;
    
        default:
            return state
            break;
    }
}