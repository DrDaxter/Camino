import { Servicios } from "../interfaces/ServiciosInterface";

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