import { MainUtils } from "./UtilsContext"

type Actions = 
| {type: 'changeMainUtils', payload: {isPinLoading:boolean}}

export const UtilsReducer = (state: MainUtils, actions: Actions): MainUtils => {
    const {payload} = actions
    switch (actions.type) {
        case 'changeMainUtils':
                return{
                    isPinLoading: payload.isPinLoading
                }
            break;
    
        default:
            return state
            break;
    }
}